import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Container keeps layout width consistent across sections.
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-background/80 backdrop-blur">
    {children}
  </span>
);

function SceneScales() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const pathProgress = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), {
    stiffness: 90,
    damping: 20,
  });
  const sublineProgress = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), {
    stiffness: 90,
    damping: 20,
  });
  const badgeOpacity = useSpring(useTransform(scrollYProgress, [0.05, 0.2], [0, 1]));
  const copyOpacity = useSpring(useTransform(scrollYProgress, [0.25, 0.5], [0, 1]));

  return (
    <section id="story-scales" className="relative pt-20 lg:pt-16">
      <div ref={ref} className="h-[220vh]">
        <div className="sticky top-16 h-auto lg:h-[calc(100vh-4rem)] flex items-start lg:items-center py-12 lg:py-0">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start lg:items-center">
              <div>
                <motion.div style={{ opacity: badgeOpacity }}>
                  <Pill>Paralegal Support • Civil • Family • Small Business</Pill>
                </motion.div>
                <h1 className="mt-8 md:mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                  Clear, organized legal help—
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400"> without the overwhelm</span>
                </h1>
                <motion.p style={{ opacity: copyOpacity }} className="mt-7 md:mt-5 text-lg text-muted-foreground max-w-prose">
                  Paralegal Services Demo is a detail-driven paralegal service that prepares filings, organizes discovery, and keeps cases moving—so you can focus on outcomes.
                </motion.p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#contact" className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-muted">
                    Book a free consult
                  </a>
                  <a
                    href="#services"
                    className="rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background hover:opacity-90"
                  >
                    See services
                  </a>
                </div>
              </div>

              <div className="relative">
                <motion.svg viewBox="0 0 600 500" className="w-full h-[55vh]">
                  <defs>
                    <linearGradient id="gradLaw" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M300 60 L300 130 M300 130 L160 180 M300 130 L440 180 M160 180 L120 300 M200 300 L160 180 M120 300 A50 20 0 1 0 200 300 M440 180 L400 300 M480 300 L440 180 M400 300 A50 20 0 1 0 480 300 M300 130 L300 420 M240 420 L360 420"
                    fill="none"
                    stroke="url(#gradLaw)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{ pathLength: pathProgress }}
                  />
                  <motion.path
                    d="M60 460 L540 460"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{ pathLength: sublineProgress }}
                  />
                </motion.svg>
                <motion.div style={{ opacity: copyOpacity }} className="text-sm text-muted-foreground">
                  Animated line art illustrates fairness and balance—your case, organized.
                </motion.div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function ScenePhone() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const phoneOpacity = useSpring(useTransform(scrollYProgress, [0.05, 0.3], [0, 1]));
  const phoneScale = useSpring(useTransform(scrollYProgress, [0.05, 0.3], [0.9, 1]));
  const cardY = useSpring(useTransform(scrollYProgress, [0.25, 0.9], [40, -20]));
  const cardOpacity = useSpring(useTransform(scrollYProgress, [0.25, 0.9], [0, 1]));

  const step1 = useSpring(useTransform(scrollYProgress, [0.15, 0.35], [0, 1]));
  const step2 = useSpring(useTransform(scrollYProgress, [0.35, 0.55], [0, 1]));
  const step3 = useSpring(useTransform(scrollYProgress, [0.55, 0.75], [0, 1]));
  const step4 = useSpring(useTransform(scrollYProgress, [0.75, 0.95], [0, 1]));

  const steps = [
    { title: "Intake & Document Collection", animation: step1 },
    { title: "Drafting & Review", animation: step2 },
    { title: "Filing & Service", animation: step3 },
    { title: "Ongoing Case Management", animation: step4 },
  ];

  return (
    <section id="story-phone" className="relative">
      <div ref={ref} className="h-[260vh]">
        <div className="sticky top-16 h-auto lg:h-[calc(100vh-4rem)]">
          <Container className="h-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start lg:items-center">
            <div className="relative py-8">
              <h2 className="text-3xl md:text-4xl font-semibold">A calm, guided process</h2>
              <p className="mt-3 text-muted-foreground max-w-prose">
                From intake to filing, Paralegal Services Demo keeps every document and deadline in check.
              </p>
              <div className="mt-6 space-y-6">
                {steps.map((step) => (
                  <motion.div key={step.title} style={{ opacity: step.animation }} className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-muted-foreground">Clear checklists, versioned docs, and reminders.</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <motion.div
                className="relative w-[220px] sm:w-[270px] md:w-[320px] aspect-[9/19.5] rounded-[36px] border bg-card shadow-2xl overflow-hidden mt-6 lg:mt-0"
                style={{ opacity: phoneOpacity, scale: phoneScale }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-0 mt-2 h-6 w-40 rounded-full bg-background/60 border" />
                <motion.div className="absolute inset-0 p-4 space-y-3" style={{ y: cardY, opacity: cardOpacity }}>
                  <div className="h-10 rounded-xl bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 border flex items-center px-3 text-xs">
                    Client Portal
                  </div>
                  <div className="rounded-xl border bg-muted/40 p-3">
                    <div className="text-xs text-muted-foreground">Upcoming Deadline</div>
                    <div className="text-sm font-medium">Smith v. Smith — Response due Oct 30</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-24 rounded-xl border bg-muted/40 p-3 text-xs">Intake Packet.pdf</div>
                    <div className="h-24 rounded-xl border bg-muted/40 p-3 text-xs">Draft Petition.docx</div>
                  </div>
                  <div className="h-12 rounded-xl border bg-muted/40 p-3 text-xs">Message us…</div>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { title: "Family Law Support", desc: "Petitions, responses, disclosures, and organized exhibits." },
    { title: "Civil Litigation", desc: "Discovery management, deposition summaries, and trial binders." },
    { title: "Small Business", desc: "Entity docs, contract formatting, and filing assistance." },
    { title: "Research & Cite-checking", desc: "Bluebook formatting, Shepardizing, and memorandum prep." },
  ];

  return (
    <section id="services" className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-10">
          <Pill>Services</Pill>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Prepared right. Filed on time.</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Clear pricing, secure handling, and professional polish on every document.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 mb-3" />
              <div className="font-medium">{item.title}</div>
              <div className="mt-2 text-sm text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SceneCourthouse() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const skyline = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]));
  const caption = useSpring(useTransform(scrollYProgress, [0.2, 0.5], [0, 1]));

  return (
    <section id="story-courthouse" className="relative">
      <div ref={ref} className="h-[180vh]">
        <div className="sticky top-16 h-[calc(100vh-4rem)] grid place-items-center">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <motion.svg viewBox="0 0 700 360" className="w-full h-[50vh]">
                  <defs>
                    <linearGradient id="gradCt" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M80 300 L620 300 M110 300 L110 220 L200 220 L200 300 M250 300 L250 180 L350 120 L450 180 L450 300 M300 220 L400 220 M520 300 L520 210 L590 210 L590 300"
                    fill="none"
                    stroke="url(#gradCt)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{ pathLength: skyline }}
                  />
                </motion.svg>
              </div>
              <div className="order-1 lg:order-2">
                <Pill>Paralegal Services Demo</Pill>
                <h3 className="mt-3 text-3xl font-semibold">Documents that stand up in court</h3>
                <motion.p style={{ opacity: caption }} className="mt-3 text-muted-foreground max-w-prose">
                  Clean structures, correct citations, and a diligent chain of revisions. Judges and clerks want clarity—Paralegal Services Demo delivers it.
                </motion.p>
                <div className="mt-6 flex gap-3">
                  <a
                    href="#contact"
                    className="rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background hover:opacity-90"
                  >
                    Request a quote
                  </a>
                  <a href="#pricing" className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-muted">
                    View pricing
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Starter", price: "$0 consult", bullets: ["15-min call", "Scope & timeline", "No obligation"] },
    { name: "Essentials", price: "From $199", bullets: ["Simple filings", "Formatting & citations", "3 revisions"] },
    {
      name: "Comprehensive",
      price: "From $599",
      bullets: ["Complex packages", "Discovery organization", "Priority turnaround"],
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 border-t">
      <Container>
        <div className="text-center mb-10">
          <Pill>Pricing</Pill>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Clear, transparent rates</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Flat-fee packages for predictable costs. Custom quotes available.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-2xl border bg-card p-6">
              <div className="text-lg font-medium">{tier.name}</div>
              <div className="mt-2 text-3xl font-bold">{tier.price}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {tier.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> {bullet}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-6 inline-block w-full rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background text-center"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <Pill>Contact</Pill>
            <h3 className="mt-3 text-3xl font-semibold">Let’s talk about your matter</h3>
            <p className="mt-3 text-muted-foreground max-w-prose">
              Describe your needs and timeline. Paralegal Services Demo will reply with next steps and a simple checklist to get moving.
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <div>
                Email: <a className="underline" href="mailto:hello@paralegalservicesdemo.example">hello@paralegalservicesdemo.example</a>
              </div>
              <div>
                Phone: <a className="underline" href="tel:+12025550123">(202) 555-0123</a>
              </div>
            </div>
          </div>
          <form className="rounded-2xl border p-6 space-y-3 bg-card">
            <input className="w-full rounded-xl border px-4 py-3 bg-background" placeholder="Your name" />
            <input className="w-full rounded-xl border px-4 py-3 bg-background" placeholder="Email" type="email" />
            <textarea
              className="w-full rounded-xl border px-4 py-3 bg-background h-32"
              placeholder="Briefly describe your matter"
            />
            <button className="w-full rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background">
              Send
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function CandiceParalegalLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500" />
              Paralegal Services Demo
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a className="hover:text-foreground" href="#services">
                Services
              </a>
              <a className="hover:text-foreground" href="#pricing">
                Pricing
              </a>
              <a className="hover:text-foreground" href="#contact">
                Contact
              </a>
            </nav>
            <a href="#contact" className="rounded-xl border px-4 py-2 text-sm font-medium bg-foreground text-background">
              Free consult
            </a>
          </div>
        </Container>
      </header>

      <SceneScales />
      <ScenePhone />
      <Services />
      <SceneCourthouse />
      <Pricing />
      <Contact />

      <footer className="border-t">
        <Container>
          <div className="py-8 text-sm flex items-center justify-between text-muted-foreground">
            <span>© {new Date().getFullYear()} Paralegal Services Demo</span>
            <div className="flex gap-4">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default CandiceParalegalLanding;
