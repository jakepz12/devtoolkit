"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

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

export default function PortfolioEditorPage() {
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

  useEffect(() => {
    if (portfolioId) {
      api.getPortfolioBySlug(portfolioId).then((data) => {
        setTitle(data.title);
        setBio(data.bio || "");
        setSlug(data.slug);
        setSelectedTheme(data.theme);
      }).catch(() => {});
    }
  }, [portfolioId]);

  const handleSave = async () => {
    if (!title || !slug) return;
    setIsSaving(true);

    try {
      if (portfolioId) {
        await api.updatePortfolio(portfolioId, {
          title,
          bio,
          theme: selectedTheme,
        });
      } else {
        await api.createPortfolio({
          title,
          bio,
          slug,
          theme: selectedTheme,
          is_public: true,
        });
      }
      setIsPublished(true);
      setTimeout(() => setIsPublished(false), 2000);
    } catch (err) {
      console.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/portfolio"
            className="text-text-secondary hover:text-text-primary"
          >
            ← Back
          </Link>
          <h1 className="text-2xl font-bold">Portfolio Editor</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Preview
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !title || !slug}
          >
            {isSaving ? "Saving..." : isPublished ? "Saved!" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Sections */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          <h3 className="mb-4 text-sm font-semibold text-text-muted">
            SECTIONS
          </h3>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-neon-cyan/10 text-neon-cyan"
                      : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                  }`}
                >
                  <span>{section.icon}</span>
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-2">
          <div
            className="rounded-xl p-6"
            style={{
              background: "rgba(18, 18, 26, 0.8)",
              border: "1px solid #2a2a3a",
            }}
          >
            {activeSection === "profile" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Profile</h2>
                <div>
                  <label className="mb-1 block text-sm text-text-secondary">
                    Portfolio Title
                  </label>
                  <Input
                    placeholder="My Portfolio"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-text-secondary">
                    Bio
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-border-primary bg-bg-input px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-border-focus focus:outline-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-text-secondary">
                    URL Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-muted">
                      devtoolkit.app/
                    </span>
                    <Input
                      placeholder="your-name"
                      value={slug}
                      onChange={(e) =>
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "")
                        )
                      }
                      disabled={!!portfolioId}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "projects" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Projects</h2>
                <p className="text-sm text-text-muted">
                  Add your projects to showcase your work.
                </p>
                <Button variant="secondary" className="w-full">
                  + Add Project
                </Button>
              </div>
            )}

            {activeSection === "skills" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Skills</h2>
                <p className="text-sm text-text-muted">
                  Add your technical skills.
                </p>
                <Button variant="secondary" className="w-full">
                  + Add Skill
                </Button>
              </div>
            )}

            {activeSection === "experience" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Experience</h2>
                <p className="text-sm text-text-muted">
                  Add your work experience.
                </p>
                <Button variant="secondary" className="w-full">
                  + Add Experience
                </Button>
              </div>
            )}

            {activeSection === "contact" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Contact</h2>
                <p className="text-sm text-text-muted">
                  Add your contact information.
                </p>
                <div>
                  <label className="mb-1 block text-sm text-text-secondary">
                    Email
                  </label>
                  <Input placeholder="you@example.com" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-text-secondary">
                    GitHub
                  </label>
                  <Input placeholder="https://github.com/username" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-text-secondary">
                    LinkedIn
                  </label>
                  <Input placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Settings */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          <h3 className="mb-4 text-sm font-semibold text-text-muted">
            THEME
          </h3>
          <div className="space-y-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  selectedTheme === theme.id
                    ? "bg-neon-cyan/10 text-neon-cyan"
                    : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                }`}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ background: theme.color }}
                />
                {theme.name}
              </button>
            ))}
          </div>

          <h3 className="mb-4 mt-6 text-sm font-semibold text-text-muted">
            SETTINGS
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Public</span>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-neon-cyan"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
