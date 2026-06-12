"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RetroBoard } from "@/components/retro/retro-board";

const templates = [
  {
    id: "start_stop_continue",
    name: "Start / Stop / Continue",
    description: "Classic retrospective format",
    columns: ["Start", "Stop", "Continue"],
  },
  {
    id: "4ls",
    name: "4Ls",
    description: "Liked, Learned, Lacked, Longed for",
    columns: ["Liked", "Learned", "Lacked", "Longed for"],
  },
  {
    id: "mad_sad_glad",
    name: "Mad / Sad / Glad",
    description: "Emotional retrospective",
    columns: ["Mad", "Sad", "Glad"],
  },
  {
    id: "sailboat",
    name: "Sailboat",
    description: "Wind, Island, Rocks, Anchor",
    columns: ["Wind", "Island", "Rocks", "Anchor"],
  },
];

export default function RetroPage() {
  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("start_stop_continue");
  const [step, setStep] = useState<"create" | "board">("create");
  const [shareCode, setShareCode] = useState("");

  const handleCreate = () => {
    // Generate random share code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setShareCode(code);
    setStep("board");
  };

  const handleExport = () => {
    // TODO: Implement PDF export
    alert("PDF export coming soon!");
  };

  if (step === "board") {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{title || "Retro Board"}</h1>
            <p className="text-sm text-text-muted">
              Share code: <span className="font-mono text-neon-cyan">{shareCode}</span>
            </p>
          </div>
        </div>

        <RetroBoard template={selectedTemplate} onExport={handleExport} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Retro Board</h1>
        <p className="mt-2 text-text-secondary">
          Create an anonymous retrospective for your team
        </p>
      </div>

      <div
        className="mx-auto max-w-2xl rounded-xl p-8"
        style={{
          background: "rgba(18, 18, 26, 0.8)",
          border: "1px solid #2a2a3a",
        }}
      >
        <h2 className="mb-6 text-lg font-semibold">Create New Retro</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">
              Session Title
            </label>
            <Input
              placeholder="Sprint 14 Retrospective"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-text-secondary">
              Template
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`rounded-lg p-4 text-left transition-all ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-neon-cyan"
                      : "hover:bg-bg-tertiary"
                  }`}
                  style={{
                    background:
                      selectedTemplate === template.id
                        ? "rgba(0, 240, 255, 0.05)"
                        : "rgba(26, 26, 37, 0.5)",
                    border: "1px solid #2a2a3a",
                  }}
                >
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="mt-1 text-xs text-text-muted">
                    {template.description}
                  </p>
                  <div className="mt-2 flex gap-1">
                    {template.columns.map((col) => (
                      <span
                        key={col}
                        className="rounded bg-bg-tertiary px-2 py-0.5 text-xs text-text-muted"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handleCreate}
            disabled={!title}
          >
            Create Retro Session
          </Button>
        </div>
      </div>
    </div>
  );
}
