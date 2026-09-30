import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, Star, Quote, ArrowLeft } from "lucide-react";
import { reviews, reviewStats } from "@/data/reviews";
import { BrandLogo } from "@/components/brand-logo";
import storefront from "@/assets/storefront.png";

// Curated ordering: strongest, most specific testimonials first.
const featuredOrder = [
  "Khushboo Kataria",
  "Cassandra",
  "Eldho Baby",
  "Mack Howie",
  "Christine Van",
  "Petra Mazouch",
  "Kevan Kansagra",
  "Tina Boakes",
  "Don Mazerolle",
  "Caitlyn Charland",
];
const curated = [
  ...featuredOrder
    .map((n) => reviews.find((r) => r.name === n))
    .filter((r): r is (typeof reviews)[number] => Boolean(r)),
  ...reviews.filter((r) => !featuredOrder.includes(r.name)),
];
const spotlight = curated[0];
const rest = curated.slice(1);

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Dice Hair Cutters | 4.5★ on Google" },
      { name: "description", content: "Read 191+ Google reviews for Dice Hair Cutters in Kitchener, ON. Friendly service, expert haircuts and a welcoming neighbourhood salon." },
      { property: "og:title", content: "Reviews — Dice Hair Cutters" },
      { property: "og:description", content: "What clients in Kitchener are saying about Dice Hair Cutters." },
      { property: "og:image", content: storefront },
      { name: "twitter:image", content: storefront },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <BrandLogo variant="light" />
          <a
            href="tel:5198949360"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90 transition"
          >
            <Phone className="h-4 w-4" /> (519) 894-9360
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative pt-36 pb-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-7xl px-6 text-primary-foreground">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Customer love</p>
              <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.02]">
                Kind words from
                <span className="block italic font-normal" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  the neighbourhood.
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-primary-foreground/80 text-lg leading-relaxed">
                Real reviews from real clients across Kitchener — from first haircuts to
                fresh fades and full colour. Here's what people are saying.
              </p>
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-3 backdrop-blur">
                <div className="text-3xl font-display font-medium">{reviewStats.rating}</div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-xs text-primary-foreground/70 mt-0.5">{reviewStats.count} Google reviews</p>
                </div>
              </div>
            </div>

            {/* Spotlight testimonial */}
            {spotlight && (
              <article className="relative rounded-3xl bg-primary-foreground text-foreground p-8 sm:p-10 shadow-[var(--shadow-elegant)]">
                <Quote className="absolute -top-5 left-8 h-10 w-10 text-secondary fill-secondary" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="font-display text-xl sm:text-2xl leading-relaxed text-foreground/90 tracking-[-0.01em]">
                  "{spotlight.text}"
                </p>
                <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {spotlight.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{spotlight.name}</p>
                    <p className="text-xs text-muted-foreground">{spotlight.meta} · {spotlight.time}</p>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Every review</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium tracking-[-0.02em]">The full collection.</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Every testimonial below is from a verified Google review — nothing edited, nothing invented.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((r) => (
            <article
              key={r.name + r.time}
              className="group relative rounded-2xl bg-card border border-border p-7 shadow-[var(--shadow-card)] flex flex-col hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] transition-all"
            >
              <Quote className="absolute -top-3 left-6 h-7 w-7 text-secondary fill-secondary" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85 flex-1">"{r.text}"</p>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {r.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.meta} · {r.time}</p>
                  </div>
                </div>
                {r.ownerReply && (
                  <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary mb-1">Reply from the owner</p>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">{r.ownerReply}</p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative" style={{ background: "var(--gradient-accent)" }}>
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8 items-center text-secondary-foreground">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-[-0.02em]">Come see for yourself.</h2>
            <p className="mt-3 opacity-90">Walk-ins welcome, or give us a call to book a time.</p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href="tel:5198949360" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition">
              <Phone className="h-5 w-5" /> (519) 894-9360
            </a>
            <a href="https://maps.google.com/?q=1400+Weber+St+E+Kitchener" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-secondary-foreground/40 px-7 py-3.5 font-semibold hover:bg-secondary-foreground/10 transition">
              <MapPin className="h-5 w-5" /> Directions
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground/70 border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <BrandLogo variant="light" size="sm" />
          <p>1400 Weber St E, Kitchener, ON N2A 3Z8</p>
          <p>© {new Date().getFullYear()} Dice Hair Cutters</p>
        </div>
      </footer>
    </div>
  );
}