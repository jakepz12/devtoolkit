"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Project {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  technologies: string[];
}

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [imageUrl, setImageUrl] = useState(project?.image_url || "");
  const [linkUrl, setLinkUrl] = useState(project?.link_url || "");
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies || []
  );

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: project?.id,
      title,
      description,
      image_url: imageUrl,
      link_url: linkUrl,
      technologies,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Project Title *
        </label>
        <Input
          placeholder="My Awesome Project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Description
        </label>
        <textarea
          className="w-full rounded-lg border border-border-primary bg-bg-input px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-border-focus focus:outline-none"
          rows={3}
          placeholder="Describe your project..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Image URL
        </label>
        <Input
          placeholder="https://example.com/image.png"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Project URL
        </label>
        <Input
          placeholder="https://github.com/username/project"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Technologies
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="React, TypeScript..."
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechnology();
              }
            }}
          />
          <Button type="button" variant="secondary" onClick={addTechnology}>
            Add
          </Button>
        </div>
        {technologies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1 rounded-full bg-neon-cyan/20 px-3 py-1 text-xs text-neon-cyan"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="hover:text-neon-red"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Save Project
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
