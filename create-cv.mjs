#!/usr/bin/env node
/**
 * ◈ create-cv — Interactive CLI to generate your config.js
 * Usage: node create-cv.mjs
 * Requires Node.js 18+
 */

import { createInterface } from 'readline';
import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));
const line = () => console.log('\x1b[90m' + '─'.repeat(56) + '\x1b[0m');
const bold = (s) => '\x1b[1m' + s + '\x1b[0m';
const dim  = (s) => '\x1b[2m' + s + '\x1b[0m';
const green= (s) => '\x1b[32m' + s + '\x1b[0m';

console.log('\n' + bold('◈  create-cv') + '  —  Interactive CV config generator\n');
line();

async function collectExperience() {
  const entries = [];
  while (true) {
    const more = entries.length === 0
      ? 'y'
      : (await ask('\nAdd another experience? (y/N) ')).trim().toLowerCase();
    if (more !== 'y') break;
    console.log(bold('\nExperience #' + (entries.length + 1)));
    const e = {
      title:       (await ask('  Job title:            ')).trim(),
      type:        (await ask('  Type (Full-time/etc):  ')).trim() || 'Full-time',
      company:     (await ask('  Company name:          ')).trim(),
      location:    (await ask('  Location:              ')).trim(),
      period:      (await ask('  Start year:            ')).trim(),
      periodEnd:   (await ask('  End year (or Present): ')).trim() || 'Present',
      logo:        (await ask('  Logo path (optional):  ')).trim() || null,
      logoFallback:(await ask('  Logo fallback (2-3 chars): ')).trim() || '??',
      color:       '#0057ff',
      bullets: [], tags: [],
    };
    console.log(dim('  Enter bullet points (empty line to stop):'));
    while (true) {
      const b = (await ask('    — ')).trim();
      if (!b) break;
      e.bullets.push(b);
    }
    const tagStr = (await ask('  Tags (comma-separated): ')).trim();
    e.tags = tagStr ? tagStr.split(',').map(t => t.trim()).filter(Boolean) : [];
    entries.push(e);
  }
  return entries;
}

async function collectEducation() {
  const entries = [];
  while (true) {
    const more = entries.length === 0
      ? 'y'
      : (await ask('\nAdd another education entry? (y/N) ')).trim().toLowerCase();
    if (more !== 'y') break;
    console.log(bold('\nEducation #' + (entries.length + 1)));
    const e = {
      degree:      (await ask('  Degree / program name: ')).trim(),
      school:      (await ask('  School name:           ')).trim(),
      location:    (await ask('  Location:              ')).trim(),
      period:      (await ask('  Start year:            ')).trim(),
      periodEnd:   (await ask('  End year:              ')).trim(),
      logo:        (await ask('  Logo path (optional):  ')).trim() || null,
      logoFallback:(await ask('  Logo fallback (2-3 chars): ')).trim() || '??',
      color:       '#e63012',
      description: (await ask('  Short description:     ')).trim(),
      tags: [],
    };
    const tagStr = (await ask('  Tags (comma-separated): ')).trim();
    e.tags = tagStr ? tagStr.split(',').map(t => t.trim()).filter(Boolean) : [];
    entries.push(e);
  }
  return entries;
}

(async () => {
  try {
    // Identity
    line();
    console.log(bold('Identity'));
    const firstName = (await ask('  First name: ')).trim();
    const lastName  = (await ask('  Last name:  ')).trim();
    const role      = (await ask('  Role/title: ')).trim();

    // Availability
    const availStr  = (await ask('  Open to opportunities? (y/N) ')).trim().toLowerCase();
    const availOpen = availStr === 'y';

    // Theme
    line();
    console.log(bold('Appearance'));
    console.log(dim('  Themes: mono | slate | sand | forest | midnight'));
    const theme = (await ask('  Theme (default: mono): ')).trim() || 'mono';
    console.log(dim('  Mode: light | dark'));
    const defaultMode = (await ask('  Default mode (default: light): ')).trim() || 'light';

    // Contact
    line();
    console.log(bold('Contact'));
    const email    = (await ask('  Email:    ')).trim();
    const location = (await ask('  Location: ')).trim();
    const linkedin = (await ask('  LinkedIn URL (optional): ')).trim();
    const github   = (await ask('  GitHub URL (optional):   ')).trim();

    // About
    line();
    console.log(bold('About'));
    const about = (await ask('  Bio (one line): ')).trim();

    // Experience
    line();
    console.log(bold('Experience'));
    const experience = await collectExperience();

    // Education
    line();
    console.log(bold('Education'));
    const education = await collectEducation();

    // Languages
    line();
    console.log(bold('Languages'));
    const languages = [];
    while (true) {
      const name = (await ask('  Language name (empty to stop): ')).trim();
      if (!name) break;
      const level = (await ask('  Level (Native / B2 / etc): ')).trim();
      const bar   = parseInt((await ask('  Proficiency bar 0-100: ')).trim()) || 80;
      languages.push({ name, level, bar });
    }

    rl.close();

    // Build config
    const contact = [];
    if (email)    contact.push({ icon: '✉', label: email,    href: 'mailto:' + email });
    if (location) contact.push({ icon: '⌖', label: location, href: null });
    if (linkedin) contact.push({ icon: '◈', label: linkedin.replace('https://', ''), href: linkedin });
    if (github)   contact.push({ icon: '⌗', label: github.replace('https://', ''),   href: github });

    const config = `/**
 * ═══════════════════════════════════════════════════════════════
 *   CV CONFIG — Generated by create-cv.mjs
 *   Edit this file to update your CV.
 * ═══════════════════════════════════════════════════════════════
 */

const CV = {

  name: { first: ${JSON.stringify(firstName)}, last: ${JSON.stringify(lastName)} },
  role: ${JSON.stringify(role)},
  availability: { open: ${availOpen}, label: "Open to opportunities" },

  theme: ${JSON.stringify(theme)},
  defaultMode: ${JSON.stringify(defaultMode)},

  contact: ${JSON.stringify(contact, null, 4).replace(/^/gm, '  ').trim()},

  about: ${JSON.stringify(about)},

  experience: ${JSON.stringify(experience, null, 4).replace(/^/gm, '  ').trim()},

  education: ${JSON.stringify(education, null, 4).replace(/^/gm, '  ').trim()},

  // Add your skills below:
  skills: [
    {
      category: "Skills",
      items: [
        { name: "Your Skill", logo: null, logoFallback: "SK" },
      ],
    },
  ],

  certifications: [],

  languages: ${JSON.stringify(languages, null, 4).replace(/^/gm, '  ').trim()},

};

// ── THEMES ─────────────────────────────────────────────────────
const THEMES = {
  mono:     { label: "Mono",     light: { "--bg": "#f7f6f3", "--fg": "#0a0a0a", "--gray": "#888", "--line": "#d6d4cf", "--accent": "#0a0a0a", "--card": "#ffffff", "--pill-bg": "#f0efec" }, dark: { "--bg": "#0e0e0e", "--fg": "#f0efe8", "--gray": "#555", "--line": "#2a2a2a", "--accent": "#f0efe8", "--card": "#181818", "--pill-bg": "#1e1e1e" } },
  slate:    { label: "Slate",    light: { "--bg": "#f0f2f5", "--fg": "#1a2332", "--gray": "#7a8a9a", "--line": "#cdd3da", "--accent": "#2563eb", "--card": "#ffffff", "--pill-bg": "#e8edf3" }, dark: { "--bg": "#0f1923", "--fg": "#e2e8f0", "--gray": "#64748b", "--line": "#1e2d3d", "--accent": "#60a5fa", "--card": "#162031", "--pill-bg": "#1a2840" } },
  sand:     { label: "Sand",     light: { "--bg": "#f5f0e8", "--fg": "#2c2416", "--gray": "#9a8a6a", "--line": "#ddd5c0", "--accent": "#b5541a", "--card": "#faf7f2", "--pill-bg": "#ede8dc" }, dark: { "--bg": "#1a1510", "--fg": "#f0e8d8", "--gray": "#8a7a5a", "--line": "#2e2416", "--accent": "#e07040", "--card": "#221c14", "--pill-bg": "#2a2010" } },
  forest:   { label: "Forest",   light: { "--bg": "#f2f5f0", "--fg": "#1a2e1a", "--gray": "#7a9a7a", "--line": "#c8d8c8", "--accent": "#2d6a2d", "--card": "#ffffff", "--pill-bg": "#e5ede5" }, dark: { "--bg": "#0d1a0d", "--fg": "#d8f0d8", "--gray": "#5a8a5a", "--line": "#1a2e1a", "--accent": "#4ade80", "--card": "#111f11", "--pill-bg": "#162416" } },
  midnight: { label: "Midnight", light: { "--bg": "#f0eef8", "--fg": "#1a1535", "--gray": "#8a80aa", "--line": "#cdc8e0", "--accent": "#5b21b6", "--card": "#ffffff", "--pill-bg": "#e8e5f5" }, dark: { "--bg": "#0a0814", "--fg": "#e8e0ff", "--gray": "#6b60a0", "--line": "#1e1830", "--accent": "#a78bfa", "--card": "#110f20", "--pill-bg": "#1a1530" } },
};
`;

    const outPath = resolve(process.cwd(), 'config.js');
    const exists = existsSync(outPath);
    if (exists) {
      const overwrite = (await ask('\n  config.js already exists. Overwrite? (y/N) ')).trim().toLowerCase();
      if (overwrite !== 'y') { console.log('\n  Aborted. Your config.js is unchanged.\n'); process.exit(0); }
    }

    writeFileSync(outPath, config, 'utf8');
    console.log('\n' + green('✓ config.js written successfully!'));
    console.log(dim('  Open index.html in your browser to preview.\n'));
    process.exit(0);

  } catch (e) {
    rl.close();
    if (e.code === 'ERR_USE_AFTER_CLOSE') process.exit(0);
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
