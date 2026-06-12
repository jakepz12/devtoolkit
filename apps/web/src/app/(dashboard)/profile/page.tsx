"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-2 text-text-secondary">
          Manage your public profile
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <div
          className="rounded-xl p-6"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          {/* Avatar */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
              }}
            >
              J
            </div>
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-text-muted">@john-doe</p>
              <Button variant="ghost" size="sm" className="mt-2">
                Change Avatar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
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
                Location
              </label>
              <Input
                placeholder="San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-text-secondary">
                Website
              </label>
              <Input
                placeholder="https://yourwebsite.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  GitHub
                </label>
                <Input
                  placeholder="username"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  LinkedIn
                </label>
                <Input
                  placeholder="username"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-text-secondary">
                Twitter
              </label>
              <Input
                placeholder="@username"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
