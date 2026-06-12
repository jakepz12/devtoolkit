"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { api } from "@/lib/api";
import { ProjectForm } from "@/components/portfolio/project-form";
import { SkillForm } from "@/components/portfolio/skill-form";
import { ExperienceForm } from "@/components/portfolio/experience-form";

const themes = [
  { id: "neon-dark", name: "Neon Dark", color: "#00f0ff" },
  { id: "minimal", name: "Minimal", color: "#3b82f6" },
  { id: "gradient", name: "Gradient", color: "#a855f7" },
  { id: "monochrome", name: "Monochrome", color: "#ffffff" },
];

const sections = [
  { id: "profile", name: "Profile", icon: "👤" },
  { id: "projects", name: "Projects", icon: "💼" },
  { id: "skills", name: "Skills", icon: "🛠️" },
  { id: "experience", name: "Experience", icon: "📅" },
  { id: "contact", name: "Contact", icon: "📧" },
];

export function EditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const portfolioId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("neon-dark");
  const [activeSection, setActiveSection] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const [projects, setProjects] = useState<any[]>([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const [skills, setSkills] = useState<any[]>([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  const [experiences, setExperiences] = useState<any[]>([]);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  useEffect(() => {
    if (portfolioId) {
      api.getPortfolioBySlug(portfolioId).then((data) => {
        setTitle(data.title);
        setBio(data.bio || "");
        setSlug(data.slug);
        setSelectedTheme(data.theme);
        setProjects(data.projects || []);
        const skillsSection = data.sections?.find((s: any) => s.type === "skills");
        if (skillsSection?.content?.skills) setSkills(skillsSection.content.skills);
        const expSection = data.sections?.find((s: any) => s.type === "experience");
        if (expSection?.content?.experiences) setExperiences(expSection.content.experiences);
        const contactSection = data.sections?.find((s: any) => s.type === "contact");
        if (contactSection?.content) {
          setEmail(contactSection.content.email || "");
          setGithub(contactSection.content.github || "");
          setLinkedin(contactSection.content.linkedin || "");
          setTwitter(contactSection.content.twitter || "");
        }
      }).catch(() => {});
    }
  }, [portfolioId]);

  const handleSave = async () => {
    if (!title || !slug) return;
    setIsSaving(true);
    try {
      if (portfolioId) {
        await api.updatePortfolio(portfolioId, { title, bio, theme: selectedTheme });
      } else {
        await api.createPortfolio({ title, bio, slug, theme: selectedTheme, is_public: true });
      }
      setIsPublished(true);
      setTimeout(() => setIsPublished(false), 2000);
    } catch (err) {
      console.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProject = (project: any) => {
    if (editingProject?.id) {
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? { ...p, ...project } : p)));
    } else {
      setProjects((prev) => [...prev, { ...project, id: `temp-${Date.now()}` }]);
    }
    setShowProjectModal(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const handleSaveSkill = (skill: any) => {
    if (editingSkill?.id) {
      setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? { ...s, ...skill } : s)));
    } else {
      setSkills((prev) => [...prev, { ...skill, id: `temp-${Date.now()}` }]);
    }
    setShowSkillModal(false);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (id: string) => setSkills((prev) => prev.filter((s) => s.id !== id));

  const handleSaveExperience = (experience: any) => {
    if (editingExperience?.id) {
      setExperiences((prev) => prev.map((e) => (e.id === editingExperience.id ? { ...e, ...experience } : e)));
    } else {
      setExperiences((prev) => [...prev, { ...experience, id: `temp-${Date.now()}` }]);
    }
    setShowExperienceModal(false);
    setEditingExperience(null);
  };

  const handleDeleteExperience = (id: string) => setExperiences((prev) => prev.filter((e) => e.id !== id));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/portfolio" className="text-text-secondary hover:text-text-primary">← Back</Link>
          <h1 className="text-2xl font-bold">Portfolio Editor</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Preview</Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving || !title || !slug}>
            {isSaving ? "Saving..." : isPublished ? "Saved!" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-xl p-4" style={{ background: "rgba(18, 18, 26, 0.8)", border: "1px solid #2a2a3a" }}>
          <h3 className="mb-4 text-sm font-semibold text-text-muted">SECTIONS</h3>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button onClick={() => setActiveSection(section.id)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${activeSection === section.id ? "bg-neon-cyan/10 text-neon-cyan" : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"}`}>
                  <span>{section.icon}</span>{section.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl p-6" style={{ background: "rgba(18, 18, 26, 0.8)", border: "1px solid #2a2a3a" }}>
            {activeSection === "profile" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Profile</h2>
                <div><label className="mb-1 block text-sm text-text-secondary">Portfolio Title</label><Input placeholder="My Portfolio" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div><label className="mb-1 block text-sm text-text-secondary">Bio</label><textarea className="w-full rounded-lg border border-border-primary bg-bg-input px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-border-focus focus:outline-none" rows={3} placeholder="Tell us about yourself..." value={bio} onChange={(e) => setBio(e.target.value)} /></div>
                <div><label className="mb-1 block text-sm text-text-secondary">URL Slug</label><div className="flex items-center gap-2"><span className="text-sm text-text-muted">devtoolkit.app/</span><Input placeholder="your-name" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} disabled={!!portfolioId} /></div></div>
              </div>
            )}
            {activeSection === "projects" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Projects</h2><Button size="sm" onClick={() => { setEditingProject(null); setShowProjectModal(true); }}>+ Add Project</Button></div>
                {projects.length === 0 ? <p className="text-sm text-text-muted">No projects yet.</p> : (
                  <div className="space-y-3">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between rounded-lg p-3" style={{ background: "rgba(0, 240, 255, 0.05)" }}>
                        <div><h4 className="font-medium">{project.title}</h4><p className="text-xs text-text-muted">{project.technologies?.join(", ")}</p></div>
                        <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => { setEditingProject(project); setShowProjectModal(true); }}>Edit</Button><Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id)} className="text-neon-red">Delete</Button></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeSection === "skills" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Skills</h2><Button size="sm" onClick={() => { setEditingSkill(null); setShowSkillModal(true); }}>+ Add Skill</Button></div>
                {skills.length === 0 ? <p className="text-sm text-text-muted">No skills yet.</p> : (
                  <div className="space-y-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between rounded-lg p-3" style={{ background: "rgba(0, 240, 255, 0.05)" }}>
                        <div className="flex-1"><div className="flex items-center justify-between"><h4 className="font-medium">{skill.name}</h4><span className="text-xs text-text-muted">{skill.level}%</span></div><div className="mt-1 h-2 w-full rounded-full bg-bg-tertiary"><div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: "linear-gradient(90deg, #00f0ff, #ff00ff)" }} /></div></div>
                        <div className="ml-4 flex gap-2"><Button variant="ghost" size="sm" onClick={() => { setEditingSkill(skill); setShowSkillModal(true); }}>Edit</Button><Button variant="ghost" size="sm" onClick={() => handleDeleteSkill(skill.id)} className="text-neon-red">Delete</Button></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeSection === "experience" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Experience</h2><Button size="sm" onClick={() => { setEditingExperience(null); setShowExperienceModal(true); }}>+ Add Experience</Button></div>
                {experiences.length === 0 ? <p className="text-sm text-text-muted">No experience yet.</p> : (
                  <div className="space-y-3">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="flex items-center justify-between rounded-lg p-3" style={{ background: "rgba(0, 240, 255, 0.05)" }}>
                        <div><h4 className="font-medium">{exp.role}</h4><p className="text-sm text-text-muted">{exp.company}</p><p className="text-xs text-text-muted">{exp.start_date} - {exp.end_date || "Present"}</p></div>
                        <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => { setEditingExperience(exp); setShowExperienceModal(true); }}>Edit</Button><Button variant="ghost" size="sm" onClick={() => handleDeleteExperience(exp.id)} className="text-neon-red">Delete</Button></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeSection === "contact" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Contact</h2>
                <div><label className="mb-1 block text-sm text-text-secondary">Email</label><Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><label className="mb-1 block text-sm text-text-secondary">GitHub</label><Input placeholder="https://github.com/username" value={github} onChange={(e) => setGithub(e.target.value)} /></div>
                <div><label className="mb-1 block text-sm text-text-secondary">LinkedIn</label><Input placeholder="https://linkedin.com/in/username" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} /></div>
                <div><label className="mb-1 block text-sm text-text-secondary">Twitter</label><Input placeholder="https://twitter.com/username" value={twitter} onChange={(e) => setTwitter(e.target.value)} /></div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ background: "rgba(18, 18, 26, 0.8)", border: "1px solid #2a2a3a" }}>
          <h3 className="mb-4 text-sm font-semibold text-text-muted">THEME</h3>
          <div className="space-y-2">
            {themes.map((theme) => (
              <button key={theme.id} onClick={() => setSelectedTheme(theme.id)} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${selectedTheme === theme.id ? "bg-neon-cyan/10 text-neon-cyan" : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"}`}>
                <div className="h-4 w-4 rounded-full" style={{ background: theme.color }} />{theme.name}
              </button>
            ))}
          </div>
          <h3 className="mb-4 mt-6 text-sm font-semibold text-text-muted">SETTINGS</h3>
          <label className="flex items-center justify-between"><span className="text-sm text-text-secondary">Public</span><input type="checkbox" defaultChecked className="h-4 w-4 accent-neon-cyan" /></label>
          {slug && <div className="mt-6"><h3 className="mb-2 text-sm font-semibold text-text-muted">SHARE</h3><p className="text-xs text-text-muted break-all">devtoolkit.app/{slug}</p></div>}
        </div>
      </div>

      <Modal isOpen={showProjectModal} onClose={() => { setShowProjectModal(false); setEditingProject(null); }} title={editingProject ? "Edit Project" : "Add Project"}>
        <ProjectForm project={editingProject} onSave={handleSaveProject} onCancel={() => { setShowProjectModal(false); setEditingProject(null); }} />
      </Modal>
      <Modal isOpen={showSkillModal} onClose={() => { setShowSkillModal(false); setEditingSkill(null); }} title={editingSkill ? "Edit Skill" : "Add Skill"}>
        <SkillForm skill={editingSkill} onSave={handleSaveSkill} onCancel={() => { setShowSkillModal(false); setEditingSkill(null); }} />
      </Modal>
      <Modal isOpen={showExperienceModal} onClose={() => { setShowExperienceModal(false); setEditingExperience(null); }} title={editingExperience ? "Edit Experience" : "Add Experience"}>
        <ExperienceForm experience={editingExperience} onSave={handleSaveExperience} onCancel={() => { setShowExperienceModal(false); setEditingExperience(null); }} />
      </Modal>
    </div>
  );
}
