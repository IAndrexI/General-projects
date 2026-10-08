# Andrew — Apple-Style Engineering Portfolio & Resume Showcase

A high-performance, Apple-inspired portfolio website engineered to showcase **Andrew's (@IAndrexI)** full engineering spectrum: self-hosted **Proxmox VE** hypervisor infrastructure, **Protutech** homelab microservices, background automation daemons, and open-source **GitHub** projects.

Designed specifically for **resume presentation**, recruiter walkthroughs, and engineering interviews.

---

## 🌟 Key Features

1. **Apple Design Language & Scroll-Driven Expansion:**
   - Floating **Dynamic Island** glass navigation bar with blur effect (`backdrop-filter: blur(25px)`).
   - Keynote-style **scroll-expand bento cards** that smoothly scale and reveal system telemetry as you scroll.
   - Interactive **Apple App Store card expansion**: clicking any project opens an expanded sheet with deep architecture notes and resume highlights.
2. **Realistic Mini Application Screenshots:**
   - Every single project features a custom-rendered, high-fidelity mini application window preview with realistic window chrome (macOS traffic lights / Proxmox status bars), domain addressbars, and live interface mockups:
     - **ProtutechDash:** Interactive Periodic Table of apps mode.
     - **Proxmox VE:** Bare-metal node CPU/RAM telemetry and LXC container tree.
     - **CS2 Nades:** Tactical whiteboard with interactive trajectory curves and bombsite callouts.
     - **proxDiscord:** Discord Rich Presence card with active Proxmox cluster uptime.
     - **AdGuard / DNSfilters:** DNS query throughput and CI/CD validation status.
     - **Pelican Panel, Seafile, Vaultwarden, Navidrome / slskd, Voron 2.4, and more.**
3. **Synchronized Protutech Color Palette & Theme Engine:**
   - **Protutech Obsidian Neon** (Default): Deep space obsidian (`#080c16`), Electric Cyan (`#00f2fe`), and Neon Purple (`#7f00ff`).
   - **Adobe Classic:** Zinc (`#18181b`), Sky Blue (`#38bdf8`), and Indigo (`#818cf8`).
   - **Cyber Emerald:** Dark Pine (`#05100e`), Emerald (`#10b981`), and Cyan (`#06b6d4`).
   - **Sunset Ember:** Warm Midnight (`#120910`), Amber (`#f59e0b`), and Rose (`#f43f5e`).
   - Full **Light / Dark Mode** toggle with instant `localStorage` persistence.
4. **Complete Project Catalog (20 Projects):**
   - **Proxmox & Homelab (9 Services):** Proxmox VE 9.2.11, Pelican Panel, ProtutechDash, Seafile Cloud, Vaultwarden, Homebox, Direct Files, Mail Gateway, Navidrome & slskd.
   - **Open Source & GitHub (11 Projects):** proxDiscord, CS2Nades, DNSfilters, aiVault, windowsDesktopDisableBind, Voron2.4, dropsClaim, SC audio server, discordapi, habitica, General-projects.
5. **Resume Ready & Printable:**
   - Built-in **Resume View** with technical competency matrix, quantifiable impact metrics, and clean typography.
   - Includes **Print / Save as PDF** styling (`@media print`) that formats the entire resume into a clean paper document for recruiters.
6. **Real-time Filter & Search:**
   - Filter by ecosystem (Proxmox, GitHub, Full Stack, Automation, Game Tech).
   - Global search with keyboard shortcuts (`/` or `Ctrl+K`).

---

## 🚀 Running Locally

You can open `index.html` directly in any modern browser, or run a local lightweight web server:

### Option A: Python 3 (Recommended)
```bash
python -m http.server 3000
```
Then navigate to: `http://localhost:3000`

### Option B: Node.js (npx serve)
```bash
npx serve .
```

---

## 🌐 Deployment Options

### 1. GitHub Pages (e.g. `https://iandrexi.github.io/portfolio/`)
1. Create a repository on GitHub (e.g. `portfolio` or `iandrexi.github.io`).
2. Push this folder:
   ```bash
   git remote add origin https://github.com/IAndrexI/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub Settings -> Pages, select branch `main` and root `/`.

### 2. Proxmox VE LXC Container
Deploy into an unprivileged Nginx LXC container or Portainer static container:
```bash
cp -r . /var/www/portfolio/
```
Route via your Cloudflare Tunnel to your custom domain.

---

## 📁 File Structure

```
portfolio/
├── index.html           # Semantic Apple-style HTML structure & modals
├── styles.css           # Design tokens, palettes, glassmorphism & responsive bento layout
├── projects-data.js     # Structured dataset for all 20 projects & resume metrics
├── app.js               # Apple scroll observer, dynamic mockup renderer, search & theme engine
├── README.md            # Documentation & deployment guide
└── assets/              # Logos, SVG icons, and visual graphics
    ├── protutech-logo.svg
    ├── proxmox.png
    └── cloudflare.png
```
