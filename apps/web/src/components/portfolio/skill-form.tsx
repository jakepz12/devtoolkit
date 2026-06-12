"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Skill {
  id?: string;
  name: string;
  level: number;
  category: string;
}

interface SkillFormProps {
  skill?: Skill;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
}

const categories = [
  "Frontend",
  "Backend",
  "DevOps",
  "Design",
  "Database",
  "Mobile",
  "Other",
];

export function SkillForm({ skill, onSave, onCancel }: SkillFormProps) {
  const [name, setName] = useState(skill?.name || "");
  const [level, setLevel] = useState(skill?.level || 75);
  const [category, setCategory] = useState(skill?.category || "Frontend");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: skill?.id,
      name,
      level,
      category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Skill Name *
        </label>
        <Input
          placeholder="React, TypeScript, Python..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-border-primary bg-bg-input px-3 py-2 text-sm text-text-primary focus:border-border-focus focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Level: {level}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full accent-neon-cyan"
        />
        <div className="flex justify-between text-xs text-text-muted">
          <span>Beginner</span>
          <span>Intermediate</span>
          <span>Expert</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Save Skill
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
