export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DevToolKit
          </h1>

          <p className="mb-4 text-xl text-text-secondary md:text-2xl">
            Portfolio Constructor &middot; Retro Board &middot; Article Reader
          </p>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-text-muted">
            Три инструмента для разработчиков в одном месте. Создайте
            портфолио, проведите ретроспективу, читайте статьи &mdash;
            бесплатно.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/register"
              className="inline-flex h-12 items-center rounded-lg px-8 text-base font-medium text-black transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
              }}
            >
              Начать бесплатно
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center rounded-lg border px-8 text-base font-medium text-neon-cyan transition-all hover:bg-neon-cyan/10"
              style={{ borderColor: "#00f0ff" }}
            >
              Узнать больше
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            Всё что нужно
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon="⚡"
              title="Быстро"
              description="Создайте портфолио за 10 минут. Заполните форму, выберите тему — получите публичную страницу."
            />
            <FeatureCard
              icon="🎨"
              title="Красиво"
              description="Киберпанк дизайн с 4 темами. Неоновые акценты, glassmorphism, анимации."
            />
            <FeatureCard
              icon="🔍"
              title="SEO"
              description="SSR рендеринг для индексации поисковиками. Ваше портфолио найдут в Google."
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 py-24" style={{ background: "#12121a" }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            Три продукта
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <ProductCard
              title="Portfolio"
              description="Конструктор портфолио для разработчиков и дизайнеров. Без кода, с SEO."
              href="/portfolio"
            />
            <ProductCard
              title="Retro Board"
              description="Анонимные ретроспективы в реальном времени. Шаблоны, голосование, PDF."
              href="/retro"
            />
            <ProductCard
              title="Article Reader"
              description="Читалка статей с прогрессом, тегами, папками и оффлайн-режимом."
              href="/reader"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            Простое ценообразование
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <PricingCard
              name="Free"
              price="$0"
              period="/мес"
              features={[
                "1 портфолио",
                "3 ретро/мес",
                "20 статей",
                "Базовые темы",
              ]}
              cta="Начать"
              href="/register"
            />
            <PricingCard
              name="Pro"
              price="$19"
              period="/мес"
              features={[
                "Безлимитные портфолио",
                "Безлимитные ретро",
                "Безлимитные статьи",
                "Все темы",
                "PDF экспорт",
              ]}
              cta="Upgrade"
              href="/register"
              highlighted
            />
            <PricingCard
              name="Team"
              price="$49"
              period="/мес"
              features={[
                "Всё из Pro",
                "До 10 участников",
                "Командные ретро",
                "API доступ",
              ]}
              cta="Contact"
              href="/register"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-12" style={{ borderColor: "#2a2a3a" }}>
        <div className="mx-auto max-w-5xl text-center text-text-muted">
          <p>&copy; 2025 DevToolKit. Built with passion.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-xl p-8 transition-all hover:translate-y-[-4px]"
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid #2a2a3a",
      }}
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
}

function ProductCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group block rounded-xl p-8 transition-all hover:translate-y-[-4px]"
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid #2a2a3a",
      }}
    >
      <h3 className="mb-2 text-xl font-semibold text-neon-cyan transition-colors group-hover:text-neon-magenta">
        {title}
      </h3>
      <p className="text-text-secondary">{description}</p>
    </a>
  );
}

function PricingCard({
  name,
  price,
  period,
  features,
  cta,
  href,
  highlighted,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className="relative rounded-xl p-8 transition-all hover:translate-y-[-4px]"
      style={{
        background: highlighted
          ? "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 255, 0.1))"
          : "rgba(18, 18, 26, 0.8)",
        backdropFilter: "blur(10px)",
        border: highlighted ? "1px solid #00f0ff" : "1px solid #2a2a3a",
        boxShadow: highlighted ? "0 0 20px rgba(0, 240, 255, 0.3)" : "none",
      }}
    >
      {highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-medium text-black"
          style={{ background: "linear-gradient(135deg, #00f0ff, #ff00ff)" }}
        >
          Recommended
        </div>
      )}

      <h3 className="mb-2 text-xl font-semibold">{name}</h3>

      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-text-muted">{period}</span>
      </div>

      <ul className="mb-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-text-secondary">
            <span className="text-neon-green">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={href}
        className="block w-full rounded-lg py-3 text-center text-sm font-medium transition-all hover:scale-105"
        style={
          highlighted
            ? {
                background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
                color: "#000",
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
              }
            : {
                border: "1px solid #00f0ff",
                color: "#00f0ff",
              }
        }
      >
        {cta}
      </a>
    </div>
  );
}
