import Link from "next/link";

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

        {/* Animated orbs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full opacity-20 blur-3xl" style={{ background: "#00f0ff" }} />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full opacity-20 blur-3xl" style={{ background: "#ff00ff", animationDelay: "1s" }} />

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
            <Link
              href="/register"
              className="inline-flex h-12 items-center rounded-lg px-8 text-base font-medium text-black transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
                boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
              }}
            >
              Начать бесплатно
            </Link>
            <Link
              href="#features"
              className="inline-flex h-12 items-center rounded-lg border px-8 text-base font-medium text-neon-cyan transition-all hover:bg-neon-cyan/10"
              style={{ borderColor: "#00f0ff" }}
            >
              Узнать больше
            </Link>
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
              icon="🎨"
            />
            <ProductCard
              title="Retro Board"
              description="Анонимные ретроспективы в реальном времени. Шаблоны, голосование, PDF."
              href="/retro"
              icon="📋"
            />
            <ProductCard
              title="Article Reader"
              description="Читалка статей с прогрессом, тегами, папками и оффлайн-режимом."
              href="/reader"
              icon="📖"
            />
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            Как это работает
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="1"
              title="Зарегистрируйтесь"
              description="Создайте аккаунт за секунды через Google, GitHub или email."
            />
            <StepCard
              number="2"
              title="Заполните профиль"
              description="Добавьте информацию о себе, проекты, навыки и опыт."
            />
            <StepCard
              number="3"
              title="Опубликуйте"
              description="Получите публичную страницу с кастомным URL и SEO."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24" style={{ background: "#12121a" }}>
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

      {/* FAQ Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            Частые вопросы
          </h2>

          <div className="space-y-6">
            <FAQItem
              question="Бесплатно ли использовать?"
              answer="Да! Базовый функционал полностью бесплатный. Вы можете создать портфолио, провести ретроспективы и читать статьи без оплаты."
            />
            <FAQItem
              question="Можно ли кастомизировать портфолио?"
              answer="Да, у нас 4 темы оформления. Вы можете выбрать любую и настроить контент."
            />
            <FAQItem
              question="Как работает анонимность в ретро?"
              answer="Участники не регистрируются и не вводят имя. Все карточки анонимны, что обеспечивает честную обратную связь."
            />
            <FAQItem
              question="Работает ли оффлайн?"
              answer="Да, Article Reader поддерживает PWA и работает оффлайн после первой загрузки."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24" style={{ background: "#12121a" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Готовы начать?
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            Создайте портфолио за 10 минут. Бесплатно, без кредитной карты.
          </p>
          <Link
            href="/register"
            className="inline-flex h-12 items-center rounded-lg px-8 text-base font-medium text-black transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
              boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
            }}
          >
            Начать бесплатно
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-12" style={{ borderColor: "#2a2a3a" }}>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">
                <span
                  style={{
                    background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  DevToolKit
                </span>
              </h3>
              <p className="text-sm text-text-muted">
                Три инструмента для разработчиков в одном месте.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Продукты</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><Link href="/portfolio" className="hover:text-text-primary">Portfolio</Link></li>
                <li><Link href="/retro" className="hover:text-text-primary">Retro Board</Link></li>
                <li><Link href="/reader" className="hover:text-text-primary">Article Reader</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Компания</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><a href="#" className="hover:text-text-primary">О нас</a></li>
                <li><a href="#" className="hover:text-text-primary">Блог</a></li>
                <li><a href="#" className="hover:text-text-primary">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Юридическое</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><a href="#" className="hover:text-text-primary">Конфиденциальность</a></li>
                <li><a href="#" className="hover:text-text-primary">Условия</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-text-muted" style={{ borderColor: "#2a2a3a" }}>
            &copy; 2025 DevToolKit. Built with passion.
          </div>
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
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl p-8 transition-all hover:translate-y-[-4px]"
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid #2a2a3a",
      }}
    >
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-neon-cyan transition-colors group-hover:text-neon-magenta">
        {title}
      </h3>
      <p className="text-text-secondary">{description}</p>
    </Link>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-black"
        style={{
          background: "linear-gradient(135deg, #00f0ff, #ff00ff)",
          boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
        }}
      >
        {number}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
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

      <Link
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
      </Link>
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "rgba(18, 18, 26, 0.8)",
        border: "1px solid #2a2a3a",
      }}
    >
      <h3 className="mb-2 font-semibold">{question}</h3>
      <p className="text-text-secondary">{answer}</p>
    </div>
  );
}
