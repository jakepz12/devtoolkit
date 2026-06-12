import { notFound } from "next/navigation";
import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getPortfolio(username: string) {
  try {
    const res = await fetch(`${API_BASE}/api/v1/portfolio/slug/${username}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const portfolio = await getPortfolio(username);

  if (!portfolio) {
    return { title: "Portfolio Not Found" };
  }

  return {
    title: `${portfolio.title} | DevToolKit`,
    description: portfolio.bio || `${portfolio.title}'s portfolio`,
    openGraph: {
      title: portfolio.title,
      description: portfolio.bio,
      type: "website",
    },
  };
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const portfolio = await getPortfolio(username);

  if (!portfolio) {
    notFound();
  }

  const themeStyles: Record<string, { bg: string; text: string; accent: string }> = {
    "neon-dark": { bg: "#0a0a0f", text: "#ffffff", accent: "#00f0ff" },
    minimal: { bg: "#ffffff", text: "#1a1a1a", accent: "#3b82f6" },
    gradient: { bg: "#0f0f1a", text: "#ffffff", accent: "#a855f7" },
    monochrome: { bg: "#000000", text: "#ffffff", accent: "#ffffff" },
  };

  const theme = themeStyles[portfolio.theme] || themeStyles["neon-dark"];

  return (
    <main
      className="min-h-screen"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* Profile Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}88)`,
              boxShadow: `0 0 30px ${theme.accent}50`,
            }}
          >
            {portfolio.title?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-4xl font-bold">{portfolio.title}</h1>

          {portfolio.bio && (
            <p className="mt-4 text-lg opacity-80">{portfolio.bio}</p>
          )}
        </div>
      </section>

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="px-6 py-12" style={{ background: `${theme.bg}cc` }}>
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-8 text-2xl font-bold"
              style={{ color: theme.accent }}
            >
              Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.projects.map((project: any) => (
                <div
                  key={project.id}
                  className="rounded-xl p-6 transition-all hover:translate-y-[-2px]"
                  style={{
                    background: `${theme.bg}`,
                    border: `1px solid ${theme.accent}30`,
                  }}
                >
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.description && (
                    <p className="mt-2 text-sm opacity-80">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="rounded-full px-2 py-0.5 text-xs"
                          style={{
                            background: `${theme.accent}20`,
                            color: theme.accent,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.link_url && (
                    <a
                      href={project.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm"
                      style={{ color: theme.accent }}
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.sections?.some((s: any) => s.type === "skills") && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-8 text-2xl font-bold"
              style={{ color: theme.accent }}
            >
              Skills
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {portfolio.sections
                .filter((s: any) => s.type === "skills")
                .map((section: any) => (
                  <div key={section.id} className="space-y-2">
                    {section.content?.skills?.map((skill: any) => (
                      <div key={skill.name} className="flex items-center gap-3">
                        <span className="w-32 text-sm">{skill.name}</span>
                        <div
                          className="h-2 flex-1 rounded-full"
                          style={{ background: `${theme.accent}20` }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.level || 75}%`,
                              background: theme.accent,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 text-center opacity-50">
        <p className="text-sm">
          Built with DevToolKit · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
