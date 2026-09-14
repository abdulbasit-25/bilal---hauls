import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, ChevronDown, ChevronRight, CheckCircle2, Search,
  DollarSign, MessageSquare, Route, FileText, Headphones, ArrowRight,
  Star, Truck, Snowflake, Container, Layers, Package, Zap, Gauge,
  Shield, Users, MapPin, Clock, Mail, Facebook, Instagram, Linkedin,
  BadgeCheck, Globe, ClipboardCheck,
} from "lucide-react";

/* ============================================================
   CENTRAL CONFIG — swap in real business details here
   ============================================================ */
const CONFIG = {
  companyName: "Keep Hauling",
  phone: "(404) 470-3820",
  phoneRaw: "+14044703820",
  email: "dispatch@keephauling.com",
  address: "3500 Adams St, Apt 2S, Bellwood, IL 60104",
  dispatchPercentage: "6–8%",
  yearsExperience: "5+",
  loadsBooked: "500+",
  statesCovered: "48",
  supportHours: "24/7",
  social: { facebook: "#", instagram: "#", linkedin: "#" },
};

const COLORS = {
  navy: "#0B1F33",
  charcoal: "#111827",
  white: "#FFFFFF",
  gray: "#F3F4F6",
  red: "#E63946",
  redDark: "#C62B38",
};

/* Verified free-to-use (Unsplash License) stock photography */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1779583074717-e60fa13131ce?q=80&w=2400&auto=format&fit=crop",
  dryVan: "https://images.unsplash.com/photo-1778103617525-76877c583fa5?q=80&w=1600&auto=format&fit=crop",
  flatbed: "https://images.unsplash.com/photo-1564957341116-ab017c60daca?q=80&w=1600&auto=format&fit=crop",
  stepDeck: "https://images.unsplash.com/photo-1783247007596-cca4a61a16f5?q=80&w=1600&auto=format&fit=crop",
  boxTruck: "https://images.unsplash.com/photo-1727101981835-50bade3c4eaf?q=80&w=1600&auto=format&fit=crop",
  warehouse: "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?q=80&w=1600&auto=format&fit=crop",
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

/* ============================================================
   EQUIPMENT — each has its own image + own page
   ============================================================ */
const EQUIPMENT = [
  {
    key: "dry-van", name: "Dry Van", icon: Container, image: IMAGES.dryVan,
    tagline: "Steady freight, dialed-in lanes.",
    desc: "The most common trailer on the road — and the easiest to keep loaded consistently when someone is actively working your lanes.",
    benefits: [
      "Matched to your preferred lanes and home time",
      "Consistent freight between regional and OTR runs",
      "Rate negotiation on every load, not just the big ones",
      "Backhaul planning to cut empty miles",
    ],
    freight: ["Palletized goods", "Retail & distribution freight", "General manufactured goods", "Packaged consumer products"],
  },
  {
    key: "reefer", name: "Reefer", icon: Snowflake, image: IMAGES.hero,
    tagline: "Temperature-controlled freight, handled right.",
    desc: "Reefer freight leaves less room for error — tighter windows, stricter brokers, and freight that can't sit. Our dispatchers know the difference.",
    benefits: [
      "Freight matched to your reefer's temp range",
      "Appointment-sensitive scheduling handled for you",
      "Broker vetting for food-grade and perishable loads",
      "Rate negotiation that accounts for reefer premiums",
    ],
    freight: ["Produce & perishables", "Food-grade packaged goods", "Pharmaceuticals", "Frozen goods"],
  },
  {
    key: "flatbed", name: "Flatbed", icon: Layers, image: IMAGES.flatbed,
    tagline: "Open-deck freight, planned around securement.",
    desc: "Flatbed work rewards dispatchers who understand tarping, securement, and permit requirements — not just who can find a load board listing.",
    benefits: [
      "Loads matched to your tarps, chains, and straps",
      "Oversize/permit coordination where needed",
      "Steady construction and industrial freight",
      "Rate negotiation that reflects flatbed labor",
    ],
    freight: ["Steel & coils", "Lumber & building materials", "Machinery", "Pipe & roofing materials"],
  },
  {
    key: "step-deck", name: "Step Deck", icon: Gauge, image: IMAGES.stepDeck,
    tagline: "Taller loads, planned the right way.",
    desc: "Step deck freight often means oversized or height-restricted loads. We plan routes and permits around the load, not the other way around.",
    benefits: [
      "Freight matched to deck length and capacity",
      "Route planning around height and permit restrictions",
      "Access to specialized/oversized freight opportunities",
      "Rate negotiation reflecting specialized equipment",
    ],
    freight: ["Tall machinery & equipment", "Construction equipment", "Oversized industrial loads", "Agricultural equipment"],
  },
  {
    key: "box-truck", name: "Box Truck", icon: Package, image: IMAGES.boxTruck,
    tagline: "Regional and local freight, kept full.",
    desc: "Box truck operators need tighter, more local freight — we focus on regional lanes and quick-turn loads instead of forcing you into OTR runs.",
    benefits: [
      "Regional and local freight prioritized",
      "Faster load turnaround for smaller freight",
      "Home-time-friendly lane planning",
      "Rate negotiation sized to box truck freight",
    ],
    freight: ["Last-mile deliveries", "Regional distribution", "Smaller commercial loads", "Expedited local freight"],
  },
  {
    key: "power-only", name: "Power Only", icon: Zap, image: IMAGES.dryVan,
    tagline: "Your tractor, matched to trailers that pay.",
    desc: "Power-only freight moves fast and can leave you guessing on trailer pools and drop yards. We keep you matched to freight that actually works.",
    benefits: [
      "Drop-and-hook freight matched to your tractor",
      "Trailer pool and yard coordination",
      "Flexible capacity freight prioritized",
      "Rate negotiation on every power-only load",
    ],
    freight: ["Drop & hook trailers", "Yard/spotting moves", "Retail distribution trailers", "Flexible capacity freight"],
  },
  {
    key: "hotshot", name: "Hotshot", icon: Truck, image: IMAGES.flatbed,
    tagline: "Time-sensitive freight, moved fast.",
    desc: "Hotshot freight lives and dies on speed and communication. Our dispatchers prioritize fast-turn loads that fit your rig and timeline.",
    benefits: [
      "Time-sensitive loads matched to your rig",
      "Fast confirmations so you're not sitting idle",
      "Smaller, expedited freight prioritized",
      "Rate negotiation reflecting expedited service",
    ],
    freight: ["Expedited freight", "Construction equipment parts", "Smaller LTL-style loads", "Emergency/rush shipments"],
  },
];

/* ============================================================
   OTHER STATIC DATA
   ============================================================ */
const TRUST_STATS = [
  { value: CONFIG.loadsBooked, label: "Loads Booked" },
  { value: CONFIG.statesCovered, label: "States Covered" },
  { value: CONFIG.supportHours, label: "Dispatch Support" },
  { value: CONFIG.yearsExperience, label: "Years in the Industry" },
];

const PROBLEMS = [
  { icon: Search, text: "Spending hours a day scrolling load boards" },
  { icon: DollarSign, text: "Getting handed low-ball rate offers" },
  { icon: Phone, text: "Chasing brokers down for confirmations" },
  { icon: Route, text: "Eating deadhead miles that kill your margin" },
  { icon: FileText, text: "Doing paperwork after a full day of driving" },
  { icon: Clock, text: "Freight that dries up between good lanes" },
];

const SERVICES = [
  { icon: Search, title: "Load Searching", desc: "We continuously search available freight matching your equipment, location, and preferred lanes." },
  { icon: DollarSign, title: "Rate Negotiation", desc: "We negotiate with brokers and shippers to help secure competitive rates on every load." },
  { icon: MessageSquare, title: "Broker Communication", desc: "We handle the calls, emails, and confirmations that come with every broker relationship." },
  { icon: Route, title: "Route & Lane Planning", desc: "We plan profitable routes, weighing deadhead, mileage, and the lanes you actually want to run." },
  { icon: FileText, title: "Documentation & Paperwork", desc: "Rate confirmations, carrier packets, setup documents, and dispatch paperwork — handled for you." },
  { icon: Headphones, title: "24/7 Dispatch Support", desc: "Our dispatch team stays available to help manage your loads and resolve issues on the road." },
];

const STEPS = [
  { n: "01", title: "Tell Us About Your Truck", desc: "Share your equipment type, home base, and the lanes you want to run." },
  { n: "02", title: "Get Connected With Your Dispatcher", desc: "You're matched with a dedicated dispatcher who learns how you operate." },
  { n: "03", title: "We Search & Negotiate Loads", desc: "We work the boards and broker relationships to find and negotiate freight." },
  { n: "04", title: "You Drive. We Handle the Rest.", desc: "Paperwork, confirmations, and support are covered while you're on the road." },
];

const WHY_US = [
  { icon: Users, text: "Experienced Dispatchers" },
  { icon: DollarSign, text: "Aggressive Rate Negotiation" },
  { icon: Shield, text: "Personalized Dispatching" },
  { icon: MapPin, text: "Nationwide Freight Coverage" },
  { icon: MessageSquare, text: "Transparent Communication" },
  { icon: Truck, text: "Carrier-Focused Service" },
];

const VALUES = [
  { icon: BadgeCheck, title: "Carrier-First", desc: "You're the client. Every decision starts with what's good for your truck and your bottom line." },
  { icon: Globe, title: "Always Working", desc: "Our dispatchers are searching and negotiating while you're driving, not waiting for you to call." },
  { icon: ClipboardCheck, title: "No Surprises", desc: "Transparent rates, transparent fees, and a dispatcher who tells you what's actually happening." },
];

const TESTIMONIALS = [
  { name: "Marcus R.", company: "Sample Owner-Operator", equipment: "Dry Van", rating: 5, quote: `Since switching to ${CONFIG.companyName}, I spend a lot less time searching for loads and more time driving.` },
  { name: "Denise T.", company: "Sample Carrier, 3 Trucks", equipment: "Reefer", rating: 5, quote: "My dispatcher actually calls me back. Rate confirmations show up before I've finished my coffee." },
  { name: "Isaiah W.", company: "Sample Owner-Operator", equipment: "Flatbed", rating: 4, quote: "Communication is the biggest difference. I always know what's coming next." },
  { name: "Priya K.", company: "Sample Fleet, 8 Trucks", equipment: "Step Deck", rating: 5, quote: "Onboarding a new truck used to be a headache. Now it's a phone call." },
];

const PRICING_FEATURES = ["Load Search", "Rate Negotiation", "Broker Communication", "Paperwork & Documentation", "Load Tracking", "Dispatch Support"];

const FAQS = [
  { q: "What does a truck dispatcher do?", a: "A dispatcher finds available freight matching your equipment and lanes, negotiates rates with brokers and shippers, handles confirmations and paperwork, and stays available to solve problems while you're on the road." },
  { q: "How much does dispatching cost?", a: `Our dispatch service runs ${CONFIG.dispatchPercentage} per load, depending on lane and equipment type.` },
  { q: "Do you work with owner-operators?", a: "Yes. Owner-operators are a core part of who we dispatch for, alongside small carriers and fleets." },
  { q: "Do you dispatch multiple trucks?", a: "Yes, we work with fleets of multiple trucks and can assign dedicated dispatchers as you scale." },
  { q: "What equipment do you dispatch?", a: "Dry van, reefer, flatbed, step deck, box truck, power only, and hotshot." },
  { q: "Do you negotiate rates?", a: "Yes — rate negotiation with brokers and shippers is a core part of the service." },
  { q: "Do you work nationwide?", a: `Yes, we cover freight across ${CONFIG.statesCovered} contiguous states.` },
  { q: "Do you provide 24/7 support?", a: "Our dispatch team is available around the clock to help manage loads and resolve issues." },
  { q: "Do I need my own MC authority?", a: "Yes, you'll need your own active MC authority — we dispatch under your operating authority, not ours." },
  { q: "How do I get started?", a: "Fill out the form on our Contact page or call our dispatch team directly." },
];

/* ============================================================
   ROUTER
   ============================================================ */
function useRoute() {
  const [path, setPath] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const onChange = () => setPath(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [path]);
  return path;
}
function navigate(path) {
  window.location.hash = path;
}

/* ============================================================
   SHARED UI PRIMITIVES
   ============================================================ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}
function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-bold tracking-wide mb-3"
      style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}>
      <span style={{ width: 28, height: 2, background: COLORS.red, display: "inline-block" }} />
      {children}
    </div>
  );
}
function Headline({ children, dark = false, className = "", size = "text-4xl md:text-5xl" }) {
  return (
    <h1 className={`${size} leading-[1.05] mb-4 ${className}`}
      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em", color: dark ? COLORS.white : COLORS.navy }}>
      {children}
    </h1>
  );
}
function PrimaryButton({ children, href = "#/contact", className = "", onClick, isRoute = true }) {
  const handle = (e) => {
    if (isRoute) { e.preventDefault(); navigate(href.replace(/^#/, "")); }
    if (onClick) onClick(e);
  };
  return (
    <a href={href} onClick={handle}
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm tracking-wide transition-all duration-200 ${className}`}
      style={{ fontFamily: "'Inter', sans-serif", background: COLORS.red, color: COLORS.white, clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.redDark)}
      onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.red)}>
      {children}
    </a>
  );
}
function SecondaryButton({ children, href, className = "", dark = false }) {
  return (
    <a href={href} className={`inline-flex items-center justify-center gap-2 px-7 py-4 font-bold text-sm tracking-wide border-2 transition-colors duration-200 ${className}`}
      style={{ fontFamily: "'Inter', sans-serif", borderColor: dark ? COLORS.white : COLORS.navy, color: dark ? COLORS.white : COLORS.navy }}>
      {children}
    </a>
  );
}
function RouteLink({ to, children, className = "", style = {}, onNavigate }) {
  return (
    <a href={`#${to}`} className={className} style={style}
      onClick={(e) => { e.preventDefault(); navigate(to); if (onNavigate) onNavigate(); }}>
      {children}
    </a>
  );
}
function PageHero({ eyebrow, title, subtitle, image }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20" style={{ background: COLORS.navy }}>
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(11,31,51,0.95) 30%, rgba(11,31,51,0.72) 100%)" }} />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Headline dark size="text-4xl md:text-6xl" className="max-w-3xl">{title}</Headline>
        {subtitle && <p className="text-base md:text-lg max-w-2xl" style={{ color: "#CBD5E0", fontFamily: "'Inter', sans-serif" }}>{subtitle}</p>}
      </div>
    </section>
  );
}
function Breadcrumb({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={12} style={{ color: "#8A94A0" }} />}
          {it.to ? (
            <RouteLink to={it.to} style={{ color: "#B8C1CC" }}>{it.label}</RouteLink>
          ) : (
            <span style={{ color: COLORS.navy, fontWeight: 700 }}>{it.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to) => route === to || (to !== "/" && route.startsWith(to));

  const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services", dropdown: EQUIPMENT },
    { label: "How It Works", to: "/how-it-works" },
    { label: "About", to: "/about" },
    { label: "Coverage", to: "/coverage" },
    { label: "FAQ", to: "/faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: scrolled ? COLORS.navy : "rgba(11,31,51,0.94)", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none", backdropFilter: "blur(6px)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          <RouteLink to="/" className="flex items-center gap-2">
            <div style={{ width: 10, height: 28, background: COLORS.red }} />
            <span className="text-xl md:text-2xl" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.white, letterSpacing: "0.03em" }}>
              {CONFIG.companyName}
            </span>
          </RouteLink>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <div key={l.to} className="relative"
                onMouseEnter={() => l.dropdown && setServicesOpen(true)}
                onMouseLeave={() => l.dropdown && setServicesOpen(false)}>
                <RouteLink to={l.to} className="flex items-center gap-1 text-sm font-semibold tracking-wide py-2"
                  style={{ color: isActive(l.to) ? COLORS.white : "#B8C1CC", fontFamily: "'Inter', sans-serif", borderBottom: isActive(l.to) ? `2px solid ${COLORS.red}` : "2px solid transparent" }}>
                  {l.label} {l.dropdown && <ChevronDown size={14} />}
                </RouteLink>
                {l.dropdown && servicesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-64">
                    <div className="bg-white shadow-xl py-2" style={{ borderTop: `3px solid ${COLORS.red}` }}>
                      {l.dropdown.map((eq) => (
                        <RouteLink key={eq.key} to={`/services/${eq.key}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50"
                          style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>
                          <eq.icon size={16} style={{ color: COLORS.red }} /> {eq.name}
                        </RouteLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${CONFIG.phoneRaw}`} className="flex items-center gap-2 text-sm font-bold" style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
              <Phone size={16} style={{ color: COLORS.red }} /> {CONFIG.phone}
            </a>
            <PrimaryButton href="/contact">GET STARTED</PrimaryButton>
          </div>

          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{ color: COLORS.white }}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden px-5 pb-6 pt-2 max-h-[80vh] overflow-y-auto" style={{ background: COLORS.navy }}>
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <div key={l.to} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center justify-between">
                    <RouteLink to={l.to} onNavigate={() => setOpen(false)} className="py-3 text-base font-semibold flex-1"
                      style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
                      {l.label}
                    </RouteLink>
                    {l.dropdown && (
                      <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} style={{ color: COLORS.white }} className="p-2">
                        <ChevronDown size={18} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "none" }} />
                      </button>
                    )}
                  </div>
                  {l.dropdown && mobileServicesOpen && (
                    <div className="pb-3 pl-3 flex flex-col gap-1">
                      {l.dropdown.map((eq) => (
                        <RouteLink key={eq.key} to={`/services/${eq.key}`} onNavigate={() => setOpen(false)}
                          className="py-2 text-sm font-semibold" style={{ color: "#B8C1CC", fontFamily: "'Inter', sans-serif" }}>
                          {eq.name}
                        </RouteLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="flex flex-col gap-3 mt-5">
              <a href={`tel:${CONFIG.phoneRaw}`} className="flex items-center justify-center gap-2 py-3 font-bold border-2" style={{ color: COLORS.white, borderColor: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
                <Phone size={16} /> {CONFIG.phone}
              </a>
              <PrimaryButton href="/contact" onClick={() => setOpen(false)}>GET STARTED</PrimaryButton>
            </div>
          </div>
        )}
      </header>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex" style={{ boxShadow: "0 -4px 16px rgba(0,0,0,0.15)" }}>
        <a href={`tel:${CONFIG.phoneRaw}`} className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-sm" style={{ background: COLORS.navy, color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
          <Phone size={16} /> CALL NOW
        </a>
        <PrimaryButton href="/contact" isRoute className="flex-1 !px-0" style={{ clipPath: "none" }}>GET STARTED</PrimaryButton>
      </div>
    </>
  );
}

/* ============================================================
   REUSABLE SECTIONS
   ============================================================ */
function TrustBar() {
  return (
    <section className="py-10 md:py-14" style={{ background: COLORS.charcoal }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <p className="text-center text-sm font-bold tracking-widest mb-8" style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}>
          TRUSTED BY OWNER-OPERATORS &amp; CARRIERS ACROSS THE USA
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.red }}>{s.value}</div>
              <div className="text-xs md:text-sm font-semibold" style={{ color: "#B8C1CC", fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ServicesGrid({ limit }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((s, i) => (
        <Reveal key={s.title} delay={i * 60}>
          <div className="p-8 h-full" style={{ background: COLORS.navy }}>
            <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ background: COLORS.red }}>
              <s.icon size={22} color="#fff" />
            </div>
            <h3 className="text-xl mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.white, letterSpacing: "0.01em" }}>{s.title.toUpperCase()}</h3>
            <p className="text-sm" style={{ color: "#B8C1CC", fontFamily: "'Inter', sans-serif" }}>{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
function EquipmentGrid({ limit }) {
  const list = limit ? EQUIPMENT.slice(0, limit) : EQUIPMENT;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((e, i) => (
        <Reveal key={e.key} delay={i * 60}>
          <RouteLink to={`/services/${e.key}`} className="block bg-white h-full overflow-hidden group">
            <div className="relative h-44 overflow-hidden">
              <img src={e.image} alt={`${e.name} truck`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,31,51,0) 40%, rgba(11,31,51,0.55) 100%)" }} />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: COLORS.red }}>
                  <e.icon size={16} color="#fff" />
                </div>
                <span className="text-white text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>{e.name.toUpperCase()}</span>
              </div>
            </div>
            <div className="p-6 flex flex-col">
              <p className="text-sm mb-5" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>{e.tagline}</p>
              <span className="text-sm font-bold inline-flex items-center gap-1" style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}>
                View Details <ArrowRight size={14} />
              </span>
            </div>
          </RouteLink>
        </Reveal>
      ))}
    </div>
  );
}
function StepsRow() {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-6 left-0 right-0" style={{ height: 2, background: "#E5E7EB" }} />
      <div className="grid lg:grid-cols-4 gap-10 lg:gap-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 100}>
            <div className="relative flex lg:flex-col gap-5 lg:gap-0">
              <div className="relative z-10 w-12 h-12 flex items-center justify-center flex-shrink-0 text-sm font-bold lg:mb-6" style={{ background: COLORS.red, color: "#fff", fontFamily: "'Inter', sans-serif" }}>{s.n}</div>
              <div>
                <h3 className="text-xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy, letterSpacing: "0.01em" }}>{s.title.toUpperCase()}</h3>
                <p className="text-sm" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
function Testimonials() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={t.name} delay={i * 70}>
          <div className="p-6 h-full flex flex-col" style={{ background: COLORS.gray }}>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} size={14} fill={idx < t.rating ? COLORS.red : "none"} style={{ color: COLORS.red }} />
              ))}
            </div>
            <p className="text-sm mb-6 flex-1" style={{ color: "#374151", fontFamily: "'Inter', sans-serif" }}>"{t.quote}"</p>
            <div>
              <div className="text-sm font-bold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{t.name}</div>
              <div className="text-xs" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>{t.company} · {t.equipment}</div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col">
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 30}>
          <div style={{ borderBottom: "1px solid #E5E7EB" }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
              <span className="text-base font-bold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{f.q}</span>
              <ChevronDown size={20} style={{ color: COLORS.red, flexShrink: 0, transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
            </button>
            <div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
              <p className="text-sm pb-5 pr-8" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>{f.a}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
function TeamWarehouseSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img src={IMAGES.warehouse} alt="Warehouse team working" className="w-full h-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Eyebrow>Behind the Dispatch Desk</Eyebrow>
          <Headline size="text-3xl md:text-4xl">REAL DISPATCHERS. REAL COMMUNICATION.</Headline>
          <p className="text-sm md:text-base mb-6" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>
            Behind every load is a dispatcher working the phones, checking in with receivers, and keeping your paperwork straight — not an algorithm that disappears once you're loaded.
          </p>
          <div className="flex flex-col gap-3">
            {["A dedicated point of contact for your truck", "Direct communication, no call centers or scripts", "Paperwork tracked from pickup to POD"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <CheckCircle2 size={18} style={{ color: COLORS.red, flexShrink: 0 }} />
                <span className="text-sm font-semibold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{t}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32" style={{ background: COLORS.charcoal }}>
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="Semi-truck fleet at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(11,31,51,0.9)" }} />
      </div>
      <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.white, letterSpacing: "0.01em" }}>READY TO STOP CHASING LOADS?</h2>
          <p className="text-base md:text-lg mb-9" style={{ color: "#CBD5E0", fontFamily: "'Inter', sans-serif" }}>Let our dispatch team handle the freight while you focus on the road.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton href="/contact">GET STARTED</PrimaryButton>
            <SecondaryButton href={`tel:${CONFIG.phoneRaw}`} dark><Phone size={16} /> CALL NOW</SecondaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE: HOME
   ============================================================ */
function HomePage() {
  return (
    <>
      <section className="relative flex items-center" style={{ minHeight: "92vh", background: COLORS.navy }}>
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="Semi-truck driving on a highway at sunset" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(11,31,51,0.96) 20%, rgba(11,31,51,0.75) 55%, rgba(11,31,51,0.55) 100%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-16 md:py-32 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Nationwide Truck Dispatching</Eyebrow>
              <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[0.98] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.white, letterSpacing: "0.01em" }}>
                MORE LOADS.<br />BETTER RATES.<br /><span style={{ color: COLORS.red }}>LESS TIME ON THE PHONE.</span>
              </h1>
              <p className="text-lg mb-9" style={{ color: "#CBD5E0", fontFamily: "'Inter', sans-serif", maxWidth: "42ch" }}>
                We handle the load search, rate negotiations, broker communication, paperwork, and dispatch coordination — so you can focus on driving and growing your trucking business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <PrimaryButton href="/contact">GET A FREE DISPATCH CONSULTATION</PrimaryButton>
                <SecondaryButton href={`tel:${CONFIG.phoneRaw}`} dark><Phone size={16} /> CALL OUR DISPATCH TEAM</SecondaryButton>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {["Nationwide Dispatching", "Rate Negotiation", `${CONFIG.supportHours} Dispatch Support`, "No Long-Term Contracts"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={18} style={{ color: COLORS.red }} />
                    <span className="text-sm font-semibold" style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="py-20 md:py-28" style={{ background: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>The Problem</Eyebrow>
              <h2 className="text-4xl md:text-5xl leading-[1.05] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>STOP WASTING HOURS SEARCHING FOR LOADS.</h2>
              <p className="text-base" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>Running your own dispatch eats the hours you should be spending behind the wheel — or with your family.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.text} delay={i * 60}>
                <div className="flex items-start gap-4 p-6 bg-white h-full" style={{ borderLeft: `3px solid ${COLORS.red}` }}>
                  <p.icon size={22} style={{ color: COLORS.navy, flexShrink: 0, marginTop: 2 }} />
                  <p className="text-sm font-semibold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-2xl md:text-3xl text-center" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy, letterSpacing: "0.01em" }}>YOU DRIVE. WE HANDLE THE FREIGHT.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <Eyebrow>What We Do</Eyebrow>
                <h2 className="text-4xl md:text-5xl leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>FULL-SERVICE TRUCK DISPATCHING</h2>
              </div>
              <RouteLink to="/how-it-works" className="text-sm font-bold inline-flex items-center gap-1" style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}>See How It Works <ArrowRight size={14} /></RouteLink>
            </div>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div className="max-w-xl">
                <Eyebrow>Equipment We Dispatch</Eyebrow>
                <h2 className="text-4xl md:text-5xl leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>SIX TRAILER TYPES. ONE DISPATCH TEAM.</h2>
              </div>
              <RouteLink to="/services" className="text-sm font-bold inline-flex items-center gap-1" style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}>View All Services <ArrowRight size={14} /></RouteLink>
            </div>
          </Reveal>
          <EquipmentGrid limit={6} />
        </div>
      </section>

      <TeamWarehouseSection />

      <section className="py-20 md:py-28" style={{ background: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <Eyebrow>The Process</Eyebrow>
              <h2 className="text-4xl md:text-5xl leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>HOW IT WORKS</h2>
            </div>
          </Reveal>
          <StepsRow />
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>Why Choose Us</Eyebrow>
              <h2 className="text-4xl md:text-5xl leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>BUILT AROUND YOUR TRUCKING BUSINESS</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={w.text} delay={i * 60}>
                <div className="flex items-center gap-4 p-6" style={{ background: COLORS.gray }}>
                  <w.icon size={24} style={{ color: COLORS.red, flexShrink: 0 }} />
                  <span className="text-sm font-bold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{w.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" style={{ background: COLORS.navy }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl leading-[1.05] mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.white, letterSpacing: "0.01em" }}>
              YOUR TRUCK SHOULDN'T SIT.<br /><span style={{ color: COLORS.red }}>YOUR DISPATCHER SHOULDN'T EITHER.</span>
            </h2>
            <p className="text-base md:text-lg mb-10" style={{ color: "#B8C1CC", fontFamily: "'Inter', sans-serif" }}>
              Most dispatchers wait for freight to come to them. Our team actively works load boards and broker relationships all day, every day.
            </p>
            <PrimaryButton href="/contact">LET'S GET YOUR TRUCK MOVING</PrimaryButton>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>Sample Content</Eyebrow>
              <h2 className="text-4xl md:text-5xl leading-[1.05] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>WHAT CARRIERS SAY</h2>
              <p className="text-sm" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>Placeholder testimonials shown for layout — swap in real customer feedback before launch.</p>
            </div>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14 mx-auto text-center">
              <Eyebrow><span className="mx-auto">Pricing</span></Eyebrow>
              <h2 className="text-4xl md:text-5xl leading-[1.05]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>SIMPLE, TRANSPARENT DISPATCHING</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="max-w-md mx-auto bg-white p-10" style={{ borderTop: `4px solid ${COLORS.red}` }}>
              <div className="text-sm font-bold tracking-widest mb-2" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>DISPATCH SERVICE</div>
              <div className="text-6xl mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>
                {CONFIG.dispatchPercentage}<span className="text-lg ml-1" style={{ fontFamily: "'Inter', sans-serif", color: "#6B7280" }}>per load</span>
              </div>
              <div className="flex flex-col gap-3 mb-8">
                {PRICING_FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 size={18} style={{ color: COLORS.red, flexShrink: 0 }} />
                    <span className="text-sm font-semibold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{f}</span>
                  </div>
                ))}
              </div>
              <PrimaryButton href="/contact" className="w-full">GET STARTED</PrimaryButton>
              <p className="text-xs text-center mt-4" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>No hidden fees.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: SERVICES OVERVIEW
   ============================================================ */
function ServicesOverviewPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="FULL-SERVICE TRUCK DISPATCHING" subtitle="Everything between finding a load and getting paid for it — handled by a dispatcher who knows your equipment." image={IMAGES.hero} />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Services" }]} />
          <Headline size="text-3xl md:text-4xl">WHAT WE HANDLE, EVERY DAY</Headline>
          <div className="mb-16 mt-6"><ServicesGrid /></div>

          <Reveal>
            <div className="max-w-2xl mb-10">
              <Eyebrow>Equipment</Eyebrow>
              <Headline size="text-3xl md:text-4xl">DISPATCHED BY TRAILER TYPE</Headline>
              <p className="text-sm" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>Each equipment type has its own freight patterns, brokers, and rate expectations — pick yours below for details.</p>
            </div>
          </Reveal>
          <EquipmentGrid />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: SERVICE / EQUIPMENT DETAIL
   ============================================================ */
function ServiceDetailPage({ eqKey }) {
  const eq = EQUIPMENT.find((e) => e.key === eqKey) || EQUIPMENT[0];
  const others = EQUIPMENT.filter((e) => e.key !== eq.key).slice(0, 3);

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24" style={{ background: COLORS.navy }}>
        <div className="absolute inset-0">
          <img src={eq.image} alt={`${eq.name} truck`} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(11,31,51,0.94) 30%, rgba(11,31,51,0.68) 100%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: eq.name }]} />
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 flex items-center justify-center" style={{ background: COLORS.red }}>
              <eq.icon size={26} color="#fff" />
            </div>
            <Eyebrow>Dispatch Service</Eyebrow>
          </div>
          <Headline dark size="text-4xl md:text-6xl" className="max-w-3xl">{eq.name.toUpperCase()} DISPATCHING</Headline>
          <p className="text-base md:text-lg max-w-2xl mb-8" style={{ color: "#CBD5E0", fontFamily: "'Inter', sans-serif" }}>{eq.desc}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <PrimaryButton href="/contact">DISPATCH MY {eq.name.toUpperCase()}</PrimaryButton>
            <SecondaryButton href={`tel:${CONFIG.phoneRaw}`} dark><Phone size={16} /> CALL OUR TEAM</SecondaryButton>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14">
          <Reveal>
            <Eyebrow>What You Get</Eyebrow>
            <Headline size="text-3xl md:text-4xl">DISPATCHING BUILT FOR {eq.name.toUpperCase()}</Headline>
            <div className="flex flex-col gap-4 mt-6">
              {eq.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={19} style={{ color: COLORS.red, flexShrink: 0, marginTop: 1 }} />
                  <span className="text-sm font-semibold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden">
              <div className="h-56 overflow-hidden mb-1">
                <img src={eq.image} alt={`${eq.name} on the road`} className="w-full h-full object-cover" />
              </div>
              <div className="p-8" style={{ background: COLORS.gray }}>
                <Eyebrow>Typical Freight</Eyebrow>
                <h3 className="text-2xl mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>WHAT WE MOVE ON {eq.name.toUpperCase()}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {eq.freight.map((f) => (
                    <div key={f} className="bg-white px-4 py-3 text-sm font-semibold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{f}</div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal><Headline size="text-3xl md:text-4xl">HOW IT WORKS FOR {eq.name.toUpperCase()} OPERATORS</Headline></Reveal>
          <div className="mt-10"><StepsRow /></div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <Eyebrow>Other Equipment</Eyebrow>
              <Headline size="text-3xl md:text-4xl">WE ALSO DISPATCH</Headline>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {others.map((o, i) => (
              <Reveal key={o.key} delay={i * 70}>
                <RouteLink to={`/services/${o.key}`} className="block bg-white overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img src={o.image} alt={`${o.name} truck`} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5" style={{ borderLeft: `3px solid ${COLORS.red}` }}>
                    <div className="text-lg mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>{o.name.toUpperCase()}</div>
                    <div className="text-sm" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>{o.tagline}</div>
                  </div>
                </RouteLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: HOW IT WORKS
   ============================================================ */
function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="Process" title="FROM YOUR FIRST CALL TO YOUR NEXT LOAD" subtitle="A straightforward onboarding, then a dispatcher who works your lanes every single day." image={IMAGES.warehouse} />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "How It Works" }]} />
          <StepsRow />
        </div>
      </section>
      <section className="py-20 md:py-24" style={{ background: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>What We Do</Eyebrow>
              <Headline size="text-3xl md:text-4xl">EVERY DAY, ON EVERY LOAD</Headline>
            </div>
          </Reveal>
          <ServicesGrid />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: ABOUT
   ============================================================ */
function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="DISPATCHERS WHO ACTUALLY WORK YOUR FREIGHT" subtitle={`${CONFIG.companyName} was built around one idea: your truck makes money when it's loaded and moving, not when someone is waiting for freight to fall into their lap.`} image={IMAGES.warehouse} />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "About" }]} />
          <div className="grid lg:grid-cols-3 gap-6 mb-20">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="p-8 h-full" style={{ background: COLORS.gray }}>
                  <v.icon size={26} style={{ color: COLORS.red, marginBottom: 16 }} />
                  <h3 className="text-xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy, letterSpacing: "0.01em" }}>{v.title.toUpperCase()}</h3>
                  <p className="text-sm" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TeamWarehouseSection />

      <section className="py-20 md:py-24" style={{ background: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-10">
              <Eyebrow>Why Choose Us</Eyebrow>
              <Headline size="text-3xl md:text-4xl">BUILT AROUND YOUR TRUCKING BUSINESS</Headline>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <Reveal key={w.text} delay={i * 60}>
                <div className="flex items-center gap-4 p-6 bg-white">
                  <w.icon size={24} style={{ color: COLORS.red, flexShrink: 0 }} />
                  <span className="text-sm font-bold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{w.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <TrustBar />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <Eyebrow>Sample Content</Eyebrow>
              <Headline size="text-3xl md:text-4xl">WHAT CARRIERS SAY</Headline>
            </div>
          </Reveal>
          <Testimonials />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: COVERAGE
   ============================================================ */
function CoveragePage() {
  return (
    <>
      <PageHero eyebrow="Coverage" title="NATIONWIDE COVERAGE. FULL U.S. REACH." subtitle={`Freight coverage across all ${CONFIG.statesCovered} contiguous states, with dispatchers who know regional lane patterns as well as coast-to-coast runs.`} image={IMAGES.hero} />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Coverage" }]} />
          <Reveal>
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2 mb-16">
              {US_STATES.map((s) => (
                <div key={s} className="flex items-center justify-center py-3 text-xs font-bold"
                  style={{ background: COLORS.navy, color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
                  {s}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            <Reveal>
              <div className="p-6" style={{ background: COLORS.gray }}>
                <Globe size={24} style={{ color: COLORS.red, marginBottom: 12 }} />
                <h3 className="text-lg mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>NATIONWIDE LANES</h3>
                <p className="text-sm" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>Coast-to-coast and regional freight, matched to where you want to run.</p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="p-6" style={{ background: COLORS.gray }}>
                <MapPin size={24} style={{ color: COLORS.red, marginBottom: 12 }} />
                <h3 className="text-lg mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>REGIONAL EXPERTISE</h3>
                <p className="text-sm" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>Dispatchers who know seasonal freight patterns in your home region.</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="p-6" style={{ background: COLORS.gray }}>
                <Route size={24} style={{ color: COLORS.red, marginBottom: 12 }} />
                <h3 className="text-lg mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy }}>LANE PLANNING</h3>
                <p className="text-sm" style={{ color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>Routes planned around your preferred operating area and home time.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: FAQ
   ============================================================ */
function FAQPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="QUESTIONS, ANSWERED" subtitle="Everything carriers usually ask before getting started." />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
          <FAQAccordion items={FAQS} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

/* ============================================================
   PAGE: CONTACT
   ============================================================ */
function ContactPage() {
  const initial = { fullName: "", phone: "", email: "", companyName: "", truckType: "", numTrucks: "", location: "", operatingArea: "", yearsInBusiness: "", mcNumber: "", source: "" };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const required = ["fullName", "phone", "email", "truckType", "numTrucks", "mcNumber"];

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: null }));
  };
  const validate = () => {
    const errs = {};
    required.forEach((k) => { if (!form[k] || !form[k].trim()) errs[k] = "This field is required."; });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (form.phone && !/^[\d\s()+-]{7,}$/.test(form.phone)) errs.phone = "Enter a valid phone number.";
    return errs;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };
  const fieldClass = "w-full px-4 py-3 text-sm border bg-white outline-none transition-colors";
  const Field = ({ label, k, type = "text", placeholder, half }) => (
    <div className={half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label className="block text-xs font-bold mb-2" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>
        {label} {required.includes(k) && <span style={{ color: COLORS.red }}>*</span>}
      </label>
      <input type={type} value={form[k]} onChange={handleChange(k)} placeholder={placeholder} className={fieldClass}
        style={{ borderColor: errors[k] ? COLORS.red : "#D1D5DB", fontFamily: "'Inter', sans-serif", color: COLORS.navy }} />
      {errors[k] && <p className="text-xs mt-1 font-semibold" style={{ color: COLORS.red, fontFamily: "'Inter', sans-serif" }}>{errors[k]}</p>}
    </div>
  );

  return (
    <>
      <PageHero eyebrow="Get Started" title="LET'S GET YOUR TRUCK MOVING" subtitle="Tell us about your truck and lanes — a dispatcher will follow up the same business day." image={IMAGES.hero} />
      <section className="py-20 md:py-24" style={{ background: COLORS.white }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="p-5" style={{ background: COLORS.gray }}>
              <Phone size={18} style={{ color: COLORS.red, marginBottom: 8 }} />
              <div className="text-sm font-bold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{CONFIG.phone}</div>
            </div>
            <div className="p-5" style={{ background: COLORS.gray }}>
              <Mail size={18} style={{ color: COLORS.red, marginBottom: 8 }} />
              <div className="text-sm font-bold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{CONFIG.email}</div>
            </div>
            <div className="p-5" style={{ background: COLORS.gray }}>
              <MapPin size={18} style={{ color: COLORS.red, marginBottom: 8 }} />
              <div className="text-sm font-bold" style={{ color: COLORS.navy, fontFamily: "'Inter', sans-serif" }}>{CONFIG.address}</div>
            </div>
          </div>

          {submitted ? (
            <div className="p-12 text-center" style={{ background: COLORS.gray }}>
              <CheckCircle2 size={44} style={{ color: COLORS.red, margin: "0 auto 16px" }} />
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.navy, letterSpacing: "0.01em" }}>
                THANKS! OUR DISPATCH TEAM WILL CONTACT YOU SHORTLY.
              </h3>
              <p className="text-sm" style={{ color: "#6B7280", fontFamily: "'Inter', sans-serif" }}>In the meantime, feel free to call us directly at {CONFIG.phone}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-10 grid sm:grid-cols-2 gap-5" style={{ background: COLORS.gray }} noValidate>
              <Field label="Full Name" k="fullName" placeholder="John Smith" />
              <Field label="Phone Number" k="phone" type="tel" placeholder="(555) 123-4567" half />
              <Field label="Email" k="email" type="email" placeholder="john@example.com" half />
              <Field label="Company Name" k="companyName" placeholder="Smith Trucking LLC" half />
              <Field label="Truck Type" k="truckType" placeholder="Dry Van, Reefer, Flatbed..." half />
              <Field label="Number of Trucks" k="numTrucks" placeholder="1" half />
              <Field label="Current Location" k="location" placeholder="City, State" half />
              <Field label="Preferred Operating Area" k="operatingArea" placeholder="Southeast, Nationwide..." half />
              <Field label="Years in Business" k="yearsInBusiness" placeholder="2" half />
              <Field label="MC Number" k="mcNumber" placeholder="MC-123456" half />
              <Field label="How did you hear about us?" k="source" placeholder="Referral, Google, Facebook..." />
              <div className="sm:col-span-2 mt-2">
                <PrimaryButton href="#" onClick={handleSubmit} className="w-full">REQUEST FREE CONSULTATION</PrimaryButton>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{ background: COLORS.navy }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: 8, height: 22, background: COLORS.red }} />
            <span className="text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", color: COLORS.white, letterSpacing: "0.02em" }}>{CONFIG.companyName}</span>
          </div>
          <p className="text-sm mb-5" style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}>Professional Truck Dispatching &amp; Freight Management</p>
          <div className="flex gap-3">
            {[{ Icon: Facebook, href: CONFIG.social.facebook }, { Icon: Instagram, href: CONFIG.social.instagram }, { Icon: Linkedin, href: CONFIG.social.linkedin }].map(({ Icon, href }, i) => (
              <a key={i} href={href} className="w-9 h-9 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}><Icon size={16} color="#fff" /></a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 tracking-wide" style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>COMPANY</h4>
          <ul className="flex flex-col gap-2">
            {[["Home", "/"], ["How It Works", "/how-it-works"], ["About", "/about"], ["Coverage", "/coverage"], ["FAQ", "/faq"], ["Contact", "/contact"]].map(([label, to]) => (
              <li key={to}><RouteLink to={to} className="text-sm" style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}>{label}</RouteLink></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 tracking-wide" style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>SERVICES</h4>
          <ul className="flex flex-col gap-2">
            {EQUIPMENT.map((e) => (
              <li key={e.key}><RouteLink to={`/services/${e.key}`} className="text-sm" style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}>{e.name}</RouteLink></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold mb-4 tracking-wide" style={{ color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>CONTACT</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-sm" style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}><Phone size={15} className="mt-0.5 flex-shrink-0" /> {CONFIG.phone}</li>
            <li className="flex items-start gap-2 text-sm" style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}><Mail size={15} className="mt-0.5 flex-shrink-0" /> {CONFIG.email}</li>
            <li className="flex items-start gap-2 text-sm" style={{ color: "#9CA6B2", fontFamily: "'Inter', sans-serif" }}><MapPin size={15} className="mt-0.5 flex-shrink-0" /> {CONFIG.address}</li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs" style={{ color: "#7C8896", fontFamily: "'Inter', sans-serif" }}>© 2026 {CONFIG.companyName}. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs" style={{ color: "#7C8896", fontFamily: "'Inter', sans-serif" }}>Privacy Policy</a>
            <a href="#" className="text-xs" style={{ color: "#7C8896", fontFamily: "'Inter', sans-serif" }}>Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP / ROUTE SWITCH
   ============================================================ */
function PageSwitch({ route }) {
  const parts = route.split("/").filter(Boolean);
  if (parts.length === 0) return <HomePage />;
  if (parts[0] === "services" && parts.length === 1) return <ServicesOverviewPage />;
  if (parts[0] === "services" && parts.length === 2) return <ServiceDetailPage eqKey={parts[1]} />;
  if (parts[0] === "how-it-works") return <HowItWorksPage />;
  if (parts[0] === "about") return <AboutPage />;
  if (parts[0] === "coverage") return <CoveragePage />;
  if (parts[0] === "faq") return <FAQPage />;
  if (parts[0] === "contact") return <ContactPage />;
  return <HomePage />;
}

export default function App() {
  const route = useRoute();
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
        a, button { cursor: pointer; }
        input:focus { outline: 2px solid #E63946; outline-offset: 1px; }
      `}</style>
      <Navbar route={route} />
      <main>
        <PageSwitch route={route} />
      </main>
      <Footer />
      <div className="lg:hidden" style={{ height: 60 }} />
    </div>
  );
}
