import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import storefront from "@/assets/storefront.png";
import interior from "@/assets/interior.png";
import businessCard from "@/assets/business-card.png";
import hairStyle from "@/assets/hair-style.png";
import { Phone, MapPin, Clock, Star, Scissors, Users, Heart, Quote, ArrowRight, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { reviews as allReviews, reviewStats } from "@/data/reviews";
import { BrandLogo } from "@/components/brand-logo";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dice Hair Cutters — Friendly Barbershop in Kitchener, ON" },
      { name: "description", content: "Walk-in haircuts, fades, kids cuts and styling in Kitchener. 4.5★ rated, women-owned, LGBTQ+ friendly. Call (519) 894-9360." },
      { property: "og:title", content: "Dice Hair Cutters — Kitchener Barbershop" },
      { property: "og:description", content: "Friendly, affordable haircuts at 1400 Weber St E, Kitchener." },
      { property: "og:image", content: storefront },
      { name: "twitter:image", content: storefront },
    ],
  }),
  component: Index,
});

// Curated: strongest, most specific, most credible testimonials.
const featuredReviewNames = [
  "Khushboo Kataria",
  "Cassandra",
  "Eldho Baby",
  "Mack Howie",
  "Christine Van",
  "Petra Mazouch",
  "Kevan Kansagra",
  "Tina Boakes",
];
const featuredReviews = featuredReviewNames
  .map((n) => allReviews.find((r) => r.name === n))
  .filter((r): r is (typeof allReviews)[number] => Boolean(r));

const services = [
  { title: "Classic Haircuts", desc: "Sharp, clean cuts tailored to your style — quick, affordable, and done right." },
  { title: "Fades & Tapers", desc: "Crisp fades and modern tapers with the precision today's looks demand." },
  { title: "Kids' Haircuts", desc: "Patient, friendly cuts for toddlers and kids — first haircuts welcome." },
  { title: "Styling & Trims", desc: "Beard trims, styling and finishing touches to leave you looking your best." },
];

function Index() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setReviewIndex((i) => (i + 1) % featuredReviews.length);
      }
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const prev = () => setReviewIndex((i) => (i - 1 + featuredReviews.length) % featuredReviews.length);
  const next = () => setReviewIndex((i) => (i + 1) % featuredReviews.length);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <BrandLogo variant="light" />
          <div className="flex items-center gap-3">
            <Link
              to="/reviews"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 transition"
            >
              <Star className="h-4 w-4 fill-secondary text-secondary" /> Reviews
            </Link>
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 transition"
            >
              <Mail className="h-4 w-4" /> Contact
            </Link>
            <a
              href="tel:5198949360"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90 transition"
            >
              <Phone className="h-4 w-4" /> (519) 894-9360
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url(${storefront})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 text-primary-foreground">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/20 backdrop-blur px-4 py-1.5 text-sm font-medium mb-6 border border-secondary/40 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span>{reviewStats.rating} ★ · {reviewStats.count} Google reviews</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-[-0.02em]">
              A friendly cut,
              <span className="block italic font-normal" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                done right.
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-foreground/85 max-w-xl">
              Welcome to Dice Hair Cutters — Kitchener's neighbourhood barbershop &
              salon. Walk-ins welcome, kids love it, and the conversation is always good.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:5198949360"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 font-semibold text-secondary-foreground shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition"
              >
                <Phone className="h-5 w-5" /> Book by phone
              </a>
              <a
                href="https://maps.google.com/?q=1400+Weber+St+E+Kitchener"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/5 backdrop-blur px-7 py-3.5 font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition"
              >
                <MapPin className="h-5 w-5" /> Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick info strip */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {([
            { icon: MapPin, title: "Visit", text: "1400 Weber St E\nKitchener, ON N2A 3Z8" },
            { icon: Phone, title: "Call", text: "(519) 894-9360\ndiceh05@gmail.com" },
            { icon: Clock, title: "Hours", text: "Opens Sat at 9 a.m.\nWalk-ins welcome" },
          ]).map((it, idx) => (
            <Reveal key={it.title} delay={idx * 100} className="flex gap-4">
              <div className="h-11 w-11 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{it.title}</p>
                <p className="mt-1 whitespace-pre-line text-sm font-medium text-foreground">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews — moved up, auto-sliding carousel */}
      <section
        id="reviews"
        className="bg-primary text-primary-foreground"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Reviews</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Loved by the neighbourhood.</h2>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 px-5 py-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="text-sm font-semibold">{reviewStats.rating} · {reviewStats.count} Google reviews</span>
            </div>
          </Reveal>

          <Reveal className="mt-14 relative" delay={150}>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
              >
                {featuredReviews.map((r) => (
                  <div key={r.name} className="min-w-full px-2 sm:px-8">
                    <article className="relative mx-auto max-w-3xl rounded-2xl bg-primary-foreground text-foreground p-8 sm:p-10 shadow-[var(--shadow-elegant)]">
                      <Quote className="absolute -top-4 left-6 h-8 w-8 text-secondary fill-secondary" />
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed text-foreground/85">"{r.text}"</p>
                      <div className="mt-6 pt-5 border-t border-border">
                        <p className="font-bold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.meta} · {r.time}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-8 flex justify-center gap-2">
              {featuredReviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => setReviewIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === reviewIndex ? "w-8 bg-secondary" : "w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50"}`}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12 text-center" delay={200}>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-3.5 font-semibold shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition"
            >
              Read more <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="relative">
          <img
            src={interior}
            alt="Inside Dice Hair Cutters salon with mirrors and plants"
            className="rounded-2xl shadow-[var(--shadow-elegant)] w-full object-cover aspect-[4/3]"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-secondary text-secondary-foreground rounded-xl px-6 py-4 shadow-[var(--shadow-card)]">
            <p className="text-3xl font-black">5+</p>
            <p className="text-xs uppercase tracking-wider">Years serving Kitchener</p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">About the shop</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-[-0.02em]">
            A neighbourhood salon that feels like home.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Run by Jamilah, Dice Hair Cutters has been a Kitchener staple for years —
            known for warm welcomes, expert haircuts, and prices that won't break the bank.
            Whether it's your toddler's first haircut or a sharp fade before a night out,
            you're in good hands.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Heart, label: "Women-owned" },
              { icon: Users, label: "LGBTQ+ friendly" },
              { icon: Scissors, label: "Same-day appts" },
              { icon: Star, label: "4.5★ on Google" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <b.icon className="h-5 w-5 text-secondary" />
                <span className="text-sm font-semibold">{b.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Services */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">What we do</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Services for the whole family.</h2>
            </div>
            <div className="flex gap-4">
              <div className="rounded-2xl bg-card border border-border px-6 py-4 shadow-[var(--shadow-card)] text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Adults</p>
                <p className="mt-1 text-3xl font-black text-primary">$27.99</p>
              </div>
              <div className="rounded-2xl bg-card border border-border px-6 py-4 shadow-[var(--shadow-card)] text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kids</p>
                <p className="mt-1 text-3xl font-black text-primary">$21.99</p>
              </div>
            </div>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 100}
                className="group rounded-2xl bg-card p-7 border border-border shadow-[var(--shadow-card)] hover:-translate-y-1 transition"
              >
                <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-5 group-hover:bg-secondary transition">
                  <Scissors className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Gallery</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Step inside.</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Reveal delay={0}><img src={storefront} alt="Dice Hair Cutters storefront" className="rounded-2xl object-cover aspect-[4/5] w-full shadow-[var(--shadow-card)]" /></Reveal>
          <Reveal delay={100}><img src={hairStyle} alt="Long, glossy black hairstyle done at Dice Hair Cutters" className="rounded-2xl object-cover aspect-[4/5] w-full shadow-[var(--shadow-card)]" /></Reveal>
          <Reveal delay={200}><img src={interior} alt="Salon interior with styling chairs" className="rounded-2xl object-cover aspect-[4/5] w-full shadow-[var(--shadow-card)]" /></Reveal>
          <Reveal delay={300}><img src={businessCard} alt="Dice Hair Cutters business card" className="rounded-2xl object-cover aspect-[4/5] w-full shadow-[var(--shadow-card)]" /></Reveal>
        </div>
      </section>

      {/* CTA / Footer */}
      <section
        className="relative"
        style={{ background: "var(--gradient-accent)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-10 items-center text-secondary-foreground">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-[-0.02em]">Ready for a fresh cut?</h2>
            <p className="mt-4 text-lg opacity-90 max-w-md">
              Give us a call or stop by — we'll take great care of you.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href="tel:5198949360" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition">
              <Phone className="h-5 w-5" /> (519) 894-9360
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition">
              <Mail className="h-5 w-5" /> Email us
            </Link>
            <a href="https://maps.google.com/?q=1400+Weber+St+E+Kitchener" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-secondary-foreground/40 px-7 py-3.5 font-semibold hover:bg-secondary-foreground/10 transition">
              <MapPin className="h-5 w-5" /> Directions
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground/70 border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <BrandLogo variant="light" size="sm" />
          <p>1400 Weber St E, Kitchener, ON N2A 3Z8 · diceh05@gmail.com</p>
          <p>© {new Date().getFullYear()} Dice Hair Cutters</p>
        </div>
      </footer>
    </div>
  );
}
