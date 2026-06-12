"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Experience {
  id?: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface ExperienceFormProps {
  experience?: Experience;
  onSave: (experience: Experience) => void;
  onCancel: () => void;
}

export function ExperienceForm({
  experience,
  onSave,
  onCancel,
}: ExperienceFormProps) {
  const [company, setCompany] = useState(experience?.company || "");
  const [role, setRole] = useState(experience?.role || "");
  const [startDate, setStartDate] = useState(experience?.start_date || "");
  const [endDate, setEndDate] = useState(experience?.end_date || "");
  const [description, setDescription] = useState(
    experience?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: experience?.id,
      company,
      role,
      start_date: startDate,
      end_date: endDate,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Company *
        </label>
        <Input
          placeholder="Google, Microsoft, Startup..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Role *
        </label>
        <Input
          placeholder="Software Engineer, Designer..."
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-text-secondary">
            Start Date
          </label>
          <Input
            type="month"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">
            End Date
          </label>
          <Input
            type="month"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Present"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-text-secondary">
          Description
        </label>
        <textarea
          className="w-full rounded-lg border border-border-primary bg-bg-input px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-border-focus focus:outline-none"
          rows={3}
          placeholder="Describe your role and achievements..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          Save Experience
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
