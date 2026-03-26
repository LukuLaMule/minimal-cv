/**
 * ═══════════════════════════════════════════════════════════════
 *   CV CONFIG — Edit this file only. Everything else auto-renders.
 * ═══════════════════════════════════════════════════════════════
 */

const CV = {

  name: { first: "Alexandre", last: "Moreau" },

  // Photo: local path like "photo.jpg", a URL, or null to hide
  photo: null,
  role: "SAP Consultant · IT Infrastructure",
  availability: { open: true, label: "Open to opportunities" },

  // Theme: "mono" | "slate" | "sand" | "forest" | "midnight"
  theme: "mono",
  // Default mode: "light" | "dark"
  defaultMode: "light",

  // ── ANALYTICS ───────────────────────────────────────────────
  // Uses counter.dev — free, open-source, no cookies, GDPR-friendly.
  // 1. Go to https://counter.dev and register your site URL
  // 2. Paste your username below. Set to null to disable.
  analytics: {
    enabled: false,
    counterDevUser: null,       // e.g. "yourname"
    // OR use a custom pixel URL (any GET request works):
    customPixelUrl: null,       // e.g. "https://yoursite.com/pixel.gif"
  },

  // ── TYPEWRITER ──────────────────────────────────────────────
  // Animate the role subtitle. Set to false to disable.
  typewriter: true,

  contact: [
    { icon: "✉", label: "alexandre.moreau@email.com", href: "mailto:alexandre.moreau@email.com" },
    { icon: "⌖", label: "Paris, France",              href: null },
    { icon: "◈", label: "linkedin.com/in/alexandre",  href: "https://linkedin.com/in/alexandre" },
    { icon: "⌗", label: "github.com/alexandre",       href: "https://github.com/alexandre" },
  ],

  about: "Junior SAP Consultant with 3 years of hands-on experience in SAP Basis administration, cloud infrastructure, and IT security. Passionate about system architecture, automation, and making complex systems run elegantly.",

  experience: [
    {
      title: "SAP Consultant",
      type: "Full-time · CDI",
      company: "Oxya",
      location: "Paris, France",
      period: "2025", periodEnd: "Present",
      logo: "logos/oxya.png", logoFallback: "OX", color: "#0057ff",
      wikipediaQuery: "Oxya",
      bullets: [
        "SAP Basis administration across multi-client landscapes",
        "Performance tuning and monitoring of SAP HANA databases",
        "Level 2 & 3 incident management and resolution",
        "Coordination with functional teams on system upgrades",
      ],
      tags: ["SAP Basis", "SAP HANA", "SAP BTP", "Linux", "ITIL"],
    },
    {
      title: "SAP Consultant",
      type: "Apprenticeship",
      company: "Oxya",
      location: "Paris, France",
      period: "2022", periodEnd: "2025",
      logo: "logos/oxya.png", logoFallback: "OX", color: "#0057ff",
      wikipediaQuery: "Oxya",
      bullets: [
        "Technical support on SAP BTP cloud environments",
        "Participated in SAP landscape migration projects",
        "Incident handling and SLA monitoring",
        "Wrote internal documentation for runbooks and procedures",
      ],
      tags: ["SAP BTP", "Cloud", "Support", "Documentation"],
    },
  ],

  education: [
    {
      degree: "Engineering Degree — Computer Science & Networks",
      school: "IMT Mines Alès",
      location: "Alès, France",
      period: "2022", periodEnd: "2025",
      logo: "logos/imt.png", logoFallback: "IMT", color: "#e63012",
      wikipediaQuery: "IMT Mines Alès",
      description: "5-year engineering program specializing in information systems, networking, and cybersecurity. Graduated via apprenticeship track.",
      tags: ["Systems", "Networks", "Cybersecurity", "Databases"],
    },
  ],

  skills: [
    {
      category: "SAP",
      items: [
        { name: "SAP Basis",        logo: "logos/tech/sap.png", logoFallback: "SAP" },
        { name: "SAP HANA",         logo: "logos/tech/sap.png", logoFallback: "SAP" },
        { name: "SAP BTP",          logo: "logos/tech/sap.png", logoFallback: "SAP" },
        { name: "Solution Manager", logo: null,                 logoFallback: "SM"  },
      ],
    },
    {
      category: "Infrastructure",
      items: [
        { name: "Linux / Unix",     logo: "logos/tech/linux.png", logoFallback: "🐧" },
        { name: "SQL / HANA DB",    logo: null,                   logoFallback: "DB" },
        { name: "TCP/IP & Routing", logo: null,                   logoFallback: "🌐" },
        { name: "Virtualization",   logo: null,                   logoFallback: "VM" },
      ],
    },
    {
      category: "Security",
      items: [
        { name: "Stormshield",          logo: "logos/tech/stormshield.png", logoFallback: "🔒" },
        { name: "Firewall / VPN",       logo: null,                         logoFallback: "FW" },
        { name: "IAM & Authorizations", logo: null,                         logoFallback: "IAM"},
      ],
    },
    {
      category: "Dev & Tools",
      items: [
        { name: "Python", logo: "logos/tech/python.png", logoFallback: "🐍" },
        { name: "Git",    logo: "logos/tech/git.png",    logoFallback: "GIT"},
        { name: "Bash",   logo: null,                    logoFallback: "SH" },
        { name: "JIRA",   logo: null,                    logoFallback: "JR" },
      ],
    },
  ],

  certifications: [
    { name: "SAP BTP Associate",            issuer: "SAP",         year: "2024", logo: "logos/tech/sap.png",         logoFallback: "SAP", wikipediaQuery: "SAP SE" },
    { name: "Stormshield Network Security", issuer: "Stormshield", year: "2023", logo: "logos/tech/stormshield.png", logoFallback: "SNS", wikipediaQuery: "Stormshield" },
    { name: "CCNA 1 — Intro to Networks",   issuer: "Cisco",       year: "2022", logo: "logos/tech/cisco.png",       logoFallback: "CSC", wikipediaQuery: "Cisco" },
    { name: "SAP Basis Administration",     issuer: "SAP",         year: "2023", logo: "logos/tech/sap.png",         logoFallback: "SAP", wikipediaQuery: "SAP SE" },
  ],

  languages: [
    { name: "French",  level: "Native",       bar: 100 },
    { name: "English", level: "Professional", bar: 75  },
  ],

};

// ── THEMES ────────────────────────────────────────────────────
const THEMES = {
  mono: {
    label: "Mono",
    light: { "--bg": "#f7f6f3", "--fg": "#0a0a0a", "--gray": "#888", "--line": "#d6d4cf", "--accent": "#0a0a0a", "--card": "#ffffff", "--pill-bg": "#f0efec" },
    dark:  { "--bg": "#0e0e0e", "--fg": "#f0efe8", "--gray": "#555", "--line": "#2a2a2a", "--accent": "#f0efe8", "--card": "#181818", "--pill-bg": "#1e1e1e" },
  },
  slate: {
    label: "Slate",
    light: { "--bg": "#f0f2f5", "--fg": "#1a2332", "--gray": "#7a8a9a", "--line": "#cdd3da", "--accent": "#2563eb", "--card": "#ffffff", "--pill-bg": "#e8edf3" },
    dark:  { "--bg": "#0f1923", "--fg": "#e2e8f0", "--gray": "#64748b", "--line": "#1e2d3d", "--accent": "#60a5fa", "--card": "#162031", "--pill-bg": "#1a2840" },
  },
  sand: {
    label: "Sand",
    light: { "--bg": "#f5f0e8", "--fg": "#2c2416", "--gray": "#9a8a6a", "--line": "#ddd5c0", "--accent": "#b5541a", "--card": "#faf7f2", "--pill-bg": "#ede8dc" },
    dark:  { "--bg": "#1a1510", "--fg": "#f0e8d8", "--gray": "#8a7a5a", "--line": "#2e2416", "--accent": "#e07040", "--card": "#221c14", "--pill-bg": "#2a2010" },
  },
  forest: {
    label: "Forest",
    light: { "--bg": "#f2f5f0", "--fg": "#1a2e1a", "--gray": "#7a9a7a", "--line": "#c8d8c8", "--accent": "#2d6a2d", "--card": "#ffffff", "--pill-bg": "#e5ede5" },
    dark:  { "--bg": "#0d1a0d", "--fg": "#d8f0d8", "--gray": "#5a8a5a", "--line": "#1a2e1a", "--accent": "#4ade80", "--card": "#111f11", "--pill-bg": "#162416" },
  },
  midnight: {
    label: "Midnight",
    light: { "--bg": "#f0eef8", "--fg": "#1a1535", "--gray": "#8a80aa", "--line": "#cdc8e0", "--accent": "#5b21b6", "--card": "#ffffff", "--pill-bg": "#e8e5f5" },
    dark:  { "--bg": "#0a0814", "--fg": "#e8e0ff", "--gray": "#6b60a0", "--line": "#1e1830", "--accent": "#a78bfa", "--card": "#110f20", "--pill-bg": "#1a1530" },
  },
};
