"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [username, setUsername] = useState("john-doe");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-text-secondary">
          Manage your account settings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(18, 18, 26, 0.8)",
            border: "1px solid #2a2a3a",
          }}
        >
          <nav className="space-y-1">
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm bg-neon-cyan/10 text-neon-cyan">
              👤 Profile
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">
              🔒 Security
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">
              💳 Subscription
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">
              🔔 Notifications
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div
            className="rounded-xl p-6"
            style={{
              background: "rgba(18, 18, 26, 0.8)",
              border: "1px solid #2a2a3a",
            }}
          >
            <h2 className="mb-6 text-lg font-semibold">Profile Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Full Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-text-secondary">
                  Username
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">
                    devtoolkit.app/
                  </span>
                  <Input
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "")
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div
            className="mt-6 rounded-xl p-6"
            style={{
              background: "rgba(18, 18, 26, 0.8)",
              border: "1px solid #2a2a3a",
            }}
          >
            <h2 className="mb-4 text-lg font-semibold">Subscription</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-sm text-text-muted">
                  1 portfolio, 3 retros/month, 20 articles
                </p>
              </div>
              <Button variant="secondary">Upgrade to Pro</Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div
            className="mt-6 rounded-xl p-6"
            style={{
              background: "rgba(18, 18, 26, 0.8)",
              border: "1px solid #2a2a3a",
            }}
          >
            <h2 className="mb-4 text-lg font-semibold text-neon-red">
              Danger Zone
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-text-muted">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="danger">Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
