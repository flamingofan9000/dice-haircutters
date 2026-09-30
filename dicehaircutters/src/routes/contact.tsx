import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, MapPin, Mail, Clock, ArrowLeft, Send } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dice Hair Cutters | Kitchener Barbershop" },
      { name: "description", content: "Book your cut at Dice Hair Cutters in Kitchener. Pick a time and service — we'll email you back. Call (519) 894-9360 or stop by 1400 Weber St E." },
      { property: "og:title", content: "Contact Dice Hair Cutters" },
      { property: "og:description", content: "Get in touch to book a haircut at Dice Hair Cutters in Kitchener, ON." },
    ],
  }),
  component: ContactPage,
});

const services = [
  "Classic Haircut",
  "Fade / Taper",
  "Kids' Haircut",
  "Beard Trim",
  "Styling / Trim",
  "Color / Highlights",
  "Other",
];

const times = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Late afternoon (4pm – 6pm)",
  "Evening (6pm – 8pm)",
];

const RECIPIENT = "diceh05@gmail.com";

function ContactPage() {
  const [name, setName] = useState("");
  const [service, setService] = useState(services[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(times[0]);
  const [notes, setNotes] = useState("");
  const [otherCut, setOtherCut] = useState("");
  const isOther = service === "Other";

  const mailto = useMemo(() => {
    const serviceLabel = isOther && otherCut ? `Other — ${otherCut}` : service;
    const subject = `Appointment request — ${serviceLabel}`;
    const body = [
      `Hi Dice Hair Cutters,`,
      ``,
      `I'd like to book an appointment.`,
      ``,
      `Name: ${name || "(your name)"}`,
      `Service: ${serviceLabel}`,
      ...(isOther ? [`Haircut details: ${otherCut || "(please describe)"}`] : []),
      ``,
      `Time: ${time}`,
      `Date: ${date || "(any)"}`,
      ``,
      `Notes: ${notes || "(none)"}`,
      ``,
      `Thanks!`,
    ].join("\n");
    return `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, service, date, time, notes, isOther, otherCut]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <BrandLogo variant="light" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/10 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Contact</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-5 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Walk-ins are always welcome. Prefer to plan ahead? Send us a quick email
            with your preferred service and time and we'll get back to you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-16 grid lg:grid-cols-5 gap-10">
        {/* Info */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Call</p>
                <a href="tel:5198949360" className="mt-1 block text-lg font-bold hover:text-secondary transition">
                  (519) 894-9360
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                <a href={`mailto:${RECIPIENT}`} className="mt-1 block text-lg font-bold hover:text-secondary transition break-all">
                  {RECIPIENT}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visit</p>
                <p className="mt-1 text-base font-semibold">1400 Weber St E</p>
                <p className="text-sm text-muted-foreground">Kitchener, ON N2A 3Z8</p>
                <a
                  href="https://maps.google.com/?q=1400+Weber+St+E+Kitchener"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-secondary hover:underline"
                >
                  Get directions →
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hours</p>
                <p className="mt-1 text-sm">Mon – Sat · 9:00 am – 7:00 pm</p>
                <p className="text-sm text-muted-foreground">Closed Sundays</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
            className="rounded-2xl border border-border bg-card p-7 sm:p-9 shadow-[var(--shadow-elegant)]"
          >
            <h2 className="text-2xl font-bold tracking-tight">Request an appointment</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill this out and we'll open your email app with a pre-filled message to send to us.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Your name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mike Angelo"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold mb-2">Service</label>
                <select
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {isOther && (
                <div>
                  <label htmlFor="otherCut" className="block text-sm font-semibold mb-2">
                    Haircut name / description
                  </label>
                  <input
                    id="otherCut"
                    type="text"
                    value={otherCut}
                    onChange={(e) => setOtherCut(e.target.value)}
                    placeholder="e.g. Mid-fade with textured top"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold mb-2">Preferred date</label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold mb-2">Preferred time</label>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    {times.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold mb-2">Notes (optional)</label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know — style references, allergies, etc."
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-3.5 font-semibold shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition"
              >
                <Send className="h-4 w-4" /> Send via email
              </button>
              <a
                href="tel:5198949360"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-muted transition"
              >
                <Phone className="h-4 w-4" /> Call instead
              </a>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              This opens your default email app with the details pre-filled. You can edit before sending.
            </p>
          </form>
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
