"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await api.login({ email, password });
      login(data.access_token, data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="rounded-xl p-8"
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid #2a2a3a",
      }}
    >
      <div className="mb-8 text-center">
        <Link href="/" className="mb-4 inline-block text-2xl font-bold">
          <span
            style={{
              background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DevToolKit
          </span>
        </Link>
        <h1 className="text-xl font-semibold">Вход в аккаунт</h1>
        <p className="mt-1 text-sm text-text-muted">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-neon-cyan hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-neon-red/10 p-3 text-sm text-neon-red">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Email</label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-text-secondary">
            Пароль
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: "#2a2a3a" }} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-bg-secondary px-2 text-text-muted">
              или продолжить с
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="secondary" className="w-full">
            Google
          </Button>
          <Button variant="secondary" className="w-full">
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
