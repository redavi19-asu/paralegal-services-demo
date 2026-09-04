import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Container = ({ children, className = "" }) => <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
const Pill = ({ children }) => <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-background/80 backdrop-blur">{children}</span>;

const CalendarIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
    <path d="M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2" />
  </svg>
);

function CalendarWidget() {
  const today = new Date();
  const [viewDate, setViewDate] = React.useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = React.useState("");
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });
  const toKey = (day) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const isPast = (day) => {
    if (!day) return true;
    const d = new Date(year, month, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  const jumpToScheduler = () => document.getElementById("appointments")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="border-b bg-muted/20 py-8 md:py-12">
      <Container>
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 items-center">
          <div>
            <Pill>Schedule a Consultation</Pill>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">Pick a date right here.</h2>
            <p className="mt-4 text-muted-foreground max-w-xl">Choose an available day, then continue to the appointment form for time and meeting type.</p>
            <button onClick={jumpToScheduler} className="mt-6 inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold bg-foreground text-background"><CalendarIcon className="h-5 w-5" /> Book Now</button>
          </div>
          <div className="rounded-3xl border bg-card p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between gap-4 mb-5">
              <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="h-11 w-11 rounded-xl border grid place-items-center text-xl" aria-label="Previous month">‹</button>
              <div className="text-center"><div className="text-xl md:text-2xl font-semibold">{monthLabel}</div><div className="text-xs text-muted-foreground mt-1">Select a date</div></div>
              <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="h-11 w-11 rounded-xl border grid place-items-center text-xl" aria-label="Next month">›</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d} className="py-2 font-medium">{d}</div>)}</div>
            <div className="grid grid-cols-7 gap-2">{cells.map((day, i) => {
              if (!day) return <div key={i} className="aspect-square" />;
              const key = toKey(day);
              const past = isPast(day);
              const active = selected === key;
              return <button key={i} disabled={past} onClick={() => setSelected(key)} className={`aspect-square rounded-xl border text-sm md:text-base font-medium transition ${past ? "opacity-30 cursor-default" : "hover:bg-muted"} ${active ? "bg-foreground text-background border-foreground" : "bg-background"}`}>{day}</button>;
            })}</div>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border bg-muted/20 p-4">
              <div><div className="text-xs uppercase tracking-wide text-muted-foreground">Selected date</div><div className="font-semibold mt-1">{selected ? new Date(`${selected}T12:00:00`).toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" }) : "Choose a day above"}</div></div>
              <button onClick={jumpToScheduler} disabled={!selected} className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold bg-foreground text-background disabled:opacity-40 disabled:cursor-default"><CalendarIcon className="h-4 w-4" /> Continue</button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SceneScales() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pathProgress = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), { stiffness: 90, damping: 20 });
  const sublineProgress = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), { stiffness: 90, damping: 20 });
  const badgeOpacity = useSpring(useTransform(scrollYProgress, [0.05, 0.2], [0, 1]));
  const copyOpacity = useSpring(useTransform(scrollYProgress, [0.25, 0.5], [0, 1]));
  return (
    <section id="story-scales" className="relative"><div ref={ref} className="h-[220vh]"><div className="sticky top-16 h-[calc(100vh-4rem)] flex items-center"><Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"><div>
        <motion.div style={{ opacity: badgeOpacity }}><Pill>Paralegal Support • Civil • Family • Small Business</Pill></motion.div>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">Clear, organized legal help— <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400">without the overwhelm</span></h1>
        <motion.p style={{ opacity: copyOpacity }} className="mt-5 text-lg text-muted-foreground max-w-prose">Candice is a detail-driven paralegal who prepares filings, organizes discovery, and keeps cases moving—so you can focus on outcomes.</motion.p>
        <div className="mt-6 flex flex-wrap gap-3"><a href="#appointments" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold bg-foreground text-background hover:opacity-90"><CalendarIcon className="h-4 w-4" /> Book Now</a><a href="#services" className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-muted">See services</a></div>
      </div><div className="relative"><motion.svg viewBox="0 0 600 500" className="w-full h-[55vh]"><defs><linearGradient id="gradLaw" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs><motion.path d="M300 60 L300 130 M300 130 L160 180 M300 130 L440 180 M160 180 L120 300 M200 300 L160 180 M120 300 A50 20 0 1 0 200 300 M440 180 L400 300 M480 300 L440 180 M400 300 A50 20 0 1 0 480 300 M300 130 L300 420 M240 420 L360 420" fill="none" stroke="url(#gradLaw)" strokeWidth="8" strokeLinecap="round" style={{ pathLength: pathProgress }} /><motion.path d="M60 460 L540 460" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" style={{ pathLength: sublineProgress }} /></motion.svg><motion.div style={{ opacity: copyOpacity }} className="text-sm text-muted-foreground">Animated line art illustrates fairness and balance—your case, organized.</motion.div></div></div>
    </Container></div></div></section>
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
  const steps = [{ title: "Intake & Document Collection", animation: step1 },{ title: "Drafting & Review", animation: step2 },{ title: "Filing & Service", animation: step3 },{ title: "Ongoing Case Management", animation: step4 }];
  return <section id="story-phone" className="relative"><div ref={ref} className="h-[260vh]"><div className="sticky top-16 h-[calc(100vh-4rem)]"><Container className="h-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"><div className="relative py-8"><h2 className="text-3xl md:text-4xl font-semibold">A calm, guided process</h2><p className="mt-3 text-muted-foreground max-w-prose">From intake to filing, Candice keeps every document and deadline in check.</p><div className="mt-6 space-y-6">{steps.map((step) => <motion.div key={step.title} style={{ opacity: step.animation }} className="flex items-start gap-3"><div className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" /><div><div className="font-medium">{step.title}</div><div className="text-sm text-muted-foreground">Clear checklists, versioned docs, and reminders.</div></div></motion.div>)}</div></div><div className="flex items-center justify-center"><motion.div className="relative w-[270px] md:w-[320px] aspect-[9/19.5] rounded-[36px] border bg-card shadow-2xl overflow-hidden" style={{ opacity: phoneOpacity, scale: phoneScale }}><div className="absolute left-1/2 -translate-x-1/2 top-0 mt-2 h-6 w-40 rounded-full bg-background/60 border" /><motion.div className="absolute inset-0 p-4 space-y-3" style={{ y: cardY, opacity: cardOpacity }}><div className="h-10 rounded-xl bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 border flex items-center px-3 text-xs">Client Portal</div><div className="rounded-xl border bg-muted/40 p-3"><div className="text-xs text-muted-foreground">Upcoming Deadline</div><div className="text-sm font-medium">Smith v. Smith — Response due Oct 30</div></div><div className="grid grid-cols-2 gap-3"><div className="h-24 rounded-xl border bg-muted/40 p-3 text-xs">Intake Packet.pdf</div><div className="h-24 rounded-xl border bg-muted/40 p-3 text-xs">Draft Petition.docx</div></div><div className="h-12 rounded-xl border bg-muted/40 p-3 text-xs">Message Candice…</div></motion.div></motion.div></div></Container></div></div></section>;
}

function Services() {
  const items = [{ title: "Family Law Support", desc: "Petitions, responses, disclosures, and organized exhibits." },{ title: "Civil Litigation", desc: "Discovery management, deposition summaries, and trial binders." },{ title: "Small Business", desc: "Entity docs, contract formatting, and filing assistance." },{ title: "Research & Cite-checking", desc: "Bluebook formatting, Shepardizing, and memorandum prep." }];
  return <section id="services" className="py-16 lg:py-24"><Container><div className="text-center mb-10"><Pill>Services</Pill><h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Prepared right. Filed on time.</h2><p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Clear pricing, secure handling, and professional polish on every document.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{items.map((item) => <div key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm"><div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 mb-3" /><div className="font-medium">{item.title}</div><div className="mt-2 text-sm text-muted-foreground">{item.desc}</div></div>)}</div></Container></section>;
}

function SceneCourthouse() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const skyline = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]));
  const caption = useSpring(useTransform(scrollYProgress, [0.2, 0.5], [0, 1]));
  return <section id="story-courthouse" className="relative"><div ref={ref} className="h-[180vh]"><div className="sticky top-16 h-[calc(100vh-4rem)] grid place-items-center"><Container><div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"><div className="order-2 lg:order-1"><motion.svg viewBox="0 0 700 360" className="w-full h-[50vh]"><defs><linearGradient id="gradCt" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs><motion.path d="M80 300 L620 300 M110 300 L110 220 L200 220 L200 300 M250 300 L250 180 L350 120 L450 180 L450 300 M300 220 L400 220 M520 300 L520 210 L590 210 L590 300" fill="none" stroke="url(#gradCt)" strokeWidth="8" strokeLinecap="round" style={{ pathLength: skyline }} /></motion.svg></div><div className="order-1 lg:order-2"><Pill>Candice Paralegal</Pill><h3 className="mt-3 text-3xl font-semibold">Documents that stand up in court</h3><motion.p style={{ opacity: caption }} className="mt-3 text-muted-foreground max-w-prose">Clean structures, correct citations, and a diligent chain of revisions. Judges and clerks want clarity—Candice delivers it.</motion.p><div className="mt-6 flex gap-3"><a href="#appointments" className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background hover:opacity-90"><CalendarIcon className="h-4 w-4" /> Schedule consult</a><a href="#pricing" className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-muted">View pricing</a></div></div></div></Container></div></div></section>;
}

function Pricing() {
  const tiers = [{ name: "Starter", price: "$0 consult", bullets: ["15-min call", "Scope & timeline", "No obligation"] },{ name: "Essentials", price: "From $199", bullets: ["Simple filings", "Formatting & citations", "3 revisions"] },{ name: "Comprehensive", price: "From $599", bullets: ["Complex packages", "Discovery organization", "Priority turnaround"] }];
  return <section id="pricing" className="py-16 lg:py-24 border-t"><Container><div className="text-center mb-10"><Pill>Pricing</Pill><h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Clear, transparent rates</h2><p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Flat-fee packages for predictable costs. Custom quotes available.</p></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{tiers.map((tier) => <div key={tier.name} className="rounded-2xl border bg-card p-6"><div className="text-lg font-medium">{tier.name}</div><div className="mt-2 text-3xl font-bold">{tier.price}</div><ul className="mt-4 space-y-2 text-sm">{tier.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-foreground" /> {bullet}</li>)}</ul><a href="#appointments" className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background"><CalendarIcon className="h-4 w-4" /> Schedule now</a></div>)}</div></Container></section>;
}

function AppointmentScheduler() {
  const [showMap, setShowMap] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const dateRef = React.useRef(null);
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", date: "", time: "", type: "In-person", matter: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };
  const openCalendar = () => { if (dateRef.current?.showPicker) dateRef.current.showPicker(); else { dateRef.current?.focus(); dateRef.current?.click(); } };
  const today = new Date().toISOString().split("T")[0];
  return <section id="appointments" className="py-16 lg:py-24 border-t bg-muted/20"><Container><div className="text-center max-w-3xl mx-auto mb-10"><Pill>Appointments</Pill><h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Book your consultation</h2><p className="mt-3 text-muted-foreground">Choose your date, time, and meeting type. Tap the calendar button to pick a date.</p></div><div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-8 items-start"><div className="rounded-3xl border bg-card p-6 md:p-8 shadow-sm">{!submitted ? <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4"><input required name="name" value={form.name} onChange={update} className="rounded-xl border px-4 py-3 bg-background" placeholder="Full name" /><input required name="email" value={form.email} onChange={update} className="rounded-xl border px-4 py-3 bg-background" placeholder="Email" type="email" /><input name="phone" value={form.phone} onChange={update} className="rounded-xl border px-4 py-3 bg-background" placeholder="Phone" /><select name="type" value={form.type} onChange={update} className="rounded-xl border px-4 py-3 bg-background"><option>In-person</option><option>Phone consultation</option><option>Video consultation</option></select><div className="relative"><input ref={dateRef} required name="date" value={form.date} onChange={update} min={today} className="w-full rounded-xl border px-4 py-3 pr-12 bg-background" type="date" /><button type="button" onClick={openCalendar} aria-label="Open calendar" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg border bg-card grid place-items-center hover:bg-muted"><CalendarIcon className="h-5 w-5" /></button></div><select required name="time" value={form.time} onChange={update} className="rounded-xl border px-4 py-3 bg-background"><option value="">Select time</option><option>9:00 AM</option><option>10:30 AM</option><option>12:00 PM</option><option>2:00 PM</option><option>3:30 PM</option><option>5:00 PM</option></select><textarea name="matter" value={form.matter} onChange={update} className="md:col-span-2 rounded-xl border px-4 py-3 bg-background h-28" placeholder="Briefly describe what you need help with" /><button className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold bg-foreground text-background"><CalendarIcon className="h-4 w-4" /> Submit appointment request</button></form> : <div className="py-8 text-center"><div className="mx-auto h-14 w-14 rounded-full border grid place-items-center text-2xl">✓</div><h3 className="mt-4 text-2xl font-semibold">Appointment request submitted</h3><p className="mt-2 text-muted-foreground">Your {form.type.toLowerCase()} request for {form.date} at {form.time} has been recorded in this demo.</p><button onClick={() => setSubmitted(false)} className="mt-5 rounded-xl border px-5 py-3 text-sm font-medium">Schedule another</button></div>}</div><div className="rounded-3xl border bg-card p-6 md:p-8 shadow-sm"><Pill>Office & Meeting Options</Pill><h3 className="mt-4 text-2xl font-semibold">Meet in person or remotely</h3><p className="mt-3 text-muted-foreground">Choose an in-person consultation or request a phone/video appointment. Use the location preview to see where an office visit would take place.</p><div className="mt-6 space-y-3 text-sm"><div className="rounded-xl border p-4"><div className="font-medium">Office consultation</div><div className="text-muted-foreground mt-1">Washington, D.C. metro area • Demo location</div></div><div className="rounded-xl border p-4"><div className="font-medium">Remote consultation</div><div className="text-muted-foreground mt-1">Phone or secure video appointment</div></div></div><button onClick={() => setShowMap(true)} className="mt-6 w-full rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background">View location map</button></div></div></Container>{showMap && <div className="fixed inset-0 z-[100] bg-black/70 p-4 flex items-center justify-center" onClick={() => setShowMap(false)}><div className="w-full max-w-3xl rounded-3xl border bg-background p-4 md:p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between mb-4"><div><div className="font-semibold text-lg">Consultation location</div><div className="text-sm text-muted-foreground">Washington, D.C. metro area • Demo map</div></div><button onClick={() => setShowMap(false)} className="rounded-xl border px-4 py-2 text-sm">Close</button></div><div className="relative h-[420px] rounded-2xl overflow-hidden border bg-gradient-to-br from-slate-100 to-slate-200"><iframe title="Washington DC map" className="absolute inset-0 w-full h-full" src="https://www.openstreetmap.org/export/embed.html?bbox=-77.12%2C38.84%2C-76.90%2C39.00&layer=mapnik" /></div></div></div>}</section>;
}

function Contact() { return <section id="contact" className="py-16 lg:py-24"><Container><div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"><div><Pill>Contact</Pill><h3 className="mt-3 text-3xl font-semibold">Let’s talk about your matter</h3><p className="mt-3 text-muted-foreground max-w-prose">Describe your needs and timeline. Candice will reply with next steps and a simple checklist to get moving.</p><div className="mt-6 text-sm text-muted-foreground"><div>Email: <a className="underline" href="mailto:hello@candiceparalegal.example">hello@candiceparalegal.example</a></div><div>Phone: <a className="underline" href="tel:+12025550123">(202) 555-0123</a></div></div></div><form className="rounded-2xl border p-6 space-y-3 bg-card" onSubmit={(e) => e.preventDefault()}><input className="w-full rounded-xl border px-4 py-3 bg-background" placeholder="Your name" /><input className="w-full rounded-xl border px-4 py-3 bg-background" placeholder="Email" type="email" /><textarea className="w-full rounded-xl border px-4 py-3 bg-background h-32" placeholder="Briefly describe your matter" /><button className="w-full rounded-xl border px-5 py-3 text-sm font-medium bg-foreground text-background">Send</button></form></div></Container></section>; }

function BookingCTA() { return <section className="border-t py-12 bg-muted/20"><Container><div className="rounded-3xl border bg-card p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"><div><Pill>Ready when you are</Pill><h3 className="mt-3 text-2xl md:text-3xl font-semibold">Choose a date that works for you.</h3><p className="mt-2 text-muted-foreground">Open the scheduler, pick your day, then select a time and consultation type.</p></div><a href="#appointments" className="inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-semibold bg-foreground text-background whitespace-nowrap"><CalendarIcon /> Schedule Now</a></div></Container></section>; }

function CandiceParalegalLanding() {
  return <div className="min-h-screen bg-background text-foreground"><header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70"><Container><div className="flex h-16 items-center justify-between"><a href="#" className="flex items-center gap-2 font-semibold"><div className="h-6 w-6 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500" />Candice Paralegal</a><nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground"><a className="hover:text-foreground" href="#services">Services</a><a className="hover:text-foreground" href="#pricing">Pricing</a><a className="hover:text-foreground" href="#appointments">Appointments</a><a className="hover:text-foreground" href="#contact">Contact</a></nav><a href="#appointments" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold bg-foreground text-background"><CalendarIcon className="h-4 w-4" /> Book Now</a></div></Container></header><CalendarWidget /><SceneScales /><ScenePhone /><Services /><SceneCourthouse /><Pricing /><AppointmentScheduler /><Contact /><BookingCTA /><footer className="border-t"><Container><div className="py-8 text-sm flex items-center justify-between text-muted-foreground"><span>© {new Date().getFullYear()} Candice Paralegal</span><div className="flex gap-4"><a href="#">Privacy</a><a href="#">Terms</a></div></div></Container></footer></div>;
}

export default CandiceParalegalLanding;