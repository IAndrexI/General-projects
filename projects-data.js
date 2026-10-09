/**
 * Portfolio Project Catalog - Andrew (IAndrexI / Protutech)
 * Complete repository & Proxmox / Protutech Homelab Infrastructure Data
 * All private hostnames and URLs stripped per configuration
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Andrew",
    handle: "IAndrexI",
    role: "Software & Systems Engineer / Homelab Architect",
    location: "United States",
    status: "Available for Software Engineering & DevOps roles",
    github: "https://github.com/IAndrexI",
    resumeUrl: "#resume-modal",
    stats: [
      { label: "Homelab Services", value: "10+", icon: "server" },
      { label: "GitHub Repositories", value: "14+", icon: "git" },
      { label: "Uptime & Availability", value: "99.98%", icon: "activity" },
      { label: "Architecture", value: "100% Self-Hosted", icon: "shield" }
    ],
    skills: {
      "Virtualization & Homelab": ["Proxmox VE 9.2.11", "LXC Containers", "KVM Virtualization", "ZFS Storage", "Portainer", "Docker"],
      "Networking & Security": ["Cloudflare Argo Tunnels", "AdGuard Home DNS", "Vaultwarden (Bitwarden)", "Reverse Proxy", "SSL/TLS", "Tailscale / WireGuard"],
      "Software & Full-Stack": ["JavaScript (ESNext)", "TypeScript", "Python 3", "Vue.js", "Node.js", "HTML5 & Modern CSS3", "REST APIs", "WebSockets"],
      "Automation & OS": ["Background Daemons (RPC)", "PowerShell", "Bash / Shell", "Discord Bot SDK", "Soulseek Automation", "GitHub Actions CI/CD"],
      "Hardware & Embedded": ["Voron 2.4 CoreXY 3D Printer", "Klipper Firmware Tuning", "AM5 Platform Architecture", "Hall-Effect Hardware"]
    }
  },

  projects: [
    {
      id: "protutechdash",
      title: "Protutech Suite Dashboard & Launcher",
      subtitle: "Unified cross-platform launcher & periodic table app cockpit",
      category: "Full Stack & Web",
      ecosystem: "Protutech",
      featured: true,
      badge: "Flagship Project",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/protutechdash",
      tech: ["Vanilla JavaScript", "CSS Variables", "PWA / Service Worker", "Custom URI Protocol", "Node.js Bridge"],
      shortDesc: "Adobe Creative Cloud-style dashboard organizing all self-hosted apps with custom themes, periodic table layout, and local desktop protocol launcher.",
      longDesc: "ProtutechDash provides a single pane of glass for all Protutech homelab applications and developer tools. It features customizable themes (Obsidian Neon, Adobe Classic, Cyber Emerald, Sunset Ember), drag-and-drop reordering, admin filtering for allowed domains, an interactive Periodic Table view, and an optional local Node.js companion daemon that launches desktop executables via `protutech://` custom protocol handlers.",
      resumeBullets: [
        "Architected an Adobe Suite-inspired unified desktop & web dashboard for 12+ distributed homelab microservices.",
        "Engineered an interactive 'Periodic Table of Apps' view grouping services by domain, category, and protocol.",
        "Developed custom protocol dispatchers (`protutech://`) and a lightweight localhost Node.js daemon bridge for native executable launching.",
        "Implemented real-time CSS variable theme system with cross-tab persistence and PWA offline caching."
      ],
      mockupType: "dash"
    },
    {
      id: "proxmox-infra",
      title: "Protutech Proxmox VE Hypervisor",
      subtitle: "High-density bare-metal virtualization cluster & LXC container orchestration",
      category: "Infrastructure & Homelab",
      ecosystem: "Proxmox",
      featured: true,
      badge: "Core Infrastructure",
      date: "2025 - Present",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI",
      tech: ["Proxmox VE 9.2.11", "Debian Linux", "LXC Containers", "ZFS Storage", "Cloudflare Zero Trust", "GPU Passthrough"],
      shortDesc: "Bare-metal hypervisor node hosting all enterprise homelab microservices, LXC containers, automated ZFS snapshots, and secure remote ingress.",
      longDesc: "The core computational backbone for all Protutech services. Configured with hardened unprivileged LXC containers running individual isolated workloads (Navidrome, Seafile, Pelican, Vaultwarden, DiscoPanel). Utilizes Cloudflare Argo Tunnels for zero open inbound firewall ports, automated offsite snapshots, and hardware acceleration for media decoding and AI inference.",
      resumeBullets: [
        "Configured and hardened bare-metal Proxmox VE 9.2.11 environment orchestrating 10+ isolated LXC microservices with sub-1% idle overhead.",
        "Engineered zero-trust remote ingress using Cloudflare Tunnels and reverse proxy routing, eliminating exposed public ports.",
        "Configured ZFS pooled storage with automated atomic snapshot schedules and multi-container shared mountpoints (`mp0`).",
        "Achieved 99.98% cluster availability with automated systemd watchdog recovery and resource quotas."
      ],
      mockupType: "proxmox"
    },
    {
      id: "cs2nades",
      title: "CS2 Tactical Stratbook & Nade Lineups",
      subtitle: "Interactive real-time tactical whiteboard & grenade lineup library",
      category: "Game Tech & Tools",
      ecosystem: "Protutech",
      featured: true,
      badge: "Interactive App",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/CS2Nades",
      tech: ["Vue.js", "TypeScript", "Canvas API", "WebSockets", "Cloudflare Pages", "Proxmox LXC"],
      shortDesc: "Interactive CS2 tactical strategy board with synchronized active-duty maps, grenade trajectory overlays, and instant lineup capture.",
      longDesc: "A specialized tactical companion for competitive Counter-Strike 2. Features an interactive 2D map board where players can view smoke, flash, molotov, and HE grenade trajectory coordinates, view crosshair alignment references, and sync live tactic drawings with team members in real-time.",
      resumeBullets: [
        "Built responsive interactive tactical canvas with vector trajectory physics and callout tagging for all 7 active-duty CS2 maps.",
        "Integrated dual-screen mobile companion sync allowing live lineup selection during active competitive tournament matches.",
        "Deployed via container orchestration on Proxmox LXC under high-availability Cloudflare edge caching."
      ],
      mockupType: "cs2"
    },
    {
      id: "proxdiscord",
      title: "proxDiscord & DiscoPanel",
      subtitle: "Proxmox RPC daemon & custom Discord Rich Presence hub",
      category: "Automation & Daemons",
      ecosystem: "Protutech",
      featured: true,
      badge: "Real-time RPC",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/proxDiscord",
      tech: ["Python 3", "Proxmox API", "Discord IPC", "HTML5 Dashboard", "Cloudflare Workers", "Systemd / Batch"],
      shortDesc: "Background Python daemon bridging Proxmox cluster diagnostics directly into Discord Rich Presence with web control panel.",
      longDesc: "A multi-component background RPC daemon (`proxmox_rpc.py`) that polls Proxmox node metrics, active games, and homelab telemetry to publish dynamic custom Discord status updates. Bundles a live web dashboard (`dashboard.html`), free game giveaway notifications (`free_games_cache.json`), and Windows service auto-start automation.",
      resumeBullets: [
        "Created background Python IPC daemon querying Proxmox VE REST API to broadcast real-time server vitals to Discord Presence.",
        "Engineered edge webhook relay via Cloudflare Workers to sync discord status across disconnected networks.",
        "Built administrative web control panel (`dashboard.html`) for monitoring daemon health, node latency, and game presence states."
      ],
      mockupType: "discord"
    },
    {
      id: "dnsfilters",
      title: "DNSfilters - Automated Blocklists",
      subtitle: "Automated DNS blocklist compilation & AdGuard Home integration",
      category: "Network & Security",
      ecosystem: "Open Source",
      featured: false,
      badge: "Automated CI/CD",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/DNSfilters",
      tech: ["Python", "GitHub Actions", "AdGuard Home", "Regex / Parsing", "DNS Telemetry"],
      shortDesc: "Automated pipeline compiling, deduplicating, and validating thousands of DNS domain blocklists for AdGuard Home network filtering.",
      longDesc: "Maintains high-performance, false-positive-free DNS blocklists for network-wide telemetry blocking and privacy protection. Runs scheduled GitHub Actions workflows to ingest upstream security feeds, validate domain formatting, strip duplicates, and deploy optimized production blocklists.",
      resumeBullets: [
        "Automated continuous ingestion and deduplication of 350,000+ domain entries across global malware and telemetry trackers.",
        "Built automated GitHub Actions CI/CD validation pipeline running daily linting, syntax checking, and edge deployment.",
        "Enforced zero-latency DNS filtering protecting all homelab IoT devices, PCs, and Proxmox containers."
      ],
      mockupType: "dns"
    },
    {
      id: "pelican-panel",
      title: "Protutech Pelican Game Panel",
      subtitle: "Next-gen game server container management & node daemon",
      category: "Infrastructure & Homelab",
      ecosystem: "Protutech",
      featured: false,
      badge: "Game Ops",
      date: "2025 - 2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI",
      tech: ["Pelican Panel", "Docker Engine", "Wings Daemon", "Go", "Proxmox LXC", "SFTP"],
      shortDesc: "Dedicated game server management node providing sandboxed Docker runtimes for Minecraft, CS2, and Unturned dedicated servers.",
      longDesc: "Host infrastructure running Pelican Panel on Proxmox LXC. Manages server lifecycle, automated daily backups, resource limits (CPU/RAM core pinning), live console terminal streaming, and player whitelist enforcement.",
      resumeBullets: [
        "Deployed Pelican Panel and Wings daemon on Proxmox LXC to orchestrate containerized game instances with isolated CPU/RAM quotas.",
        "Engineered automated backup scripts to safeguard player data and world states with minimal server tick latency.",
        "Configured secure SFTP access and reverse proxy endpoints with custom domain routing."
      ],
      mockupType: "pelican"
    },
    {
      id: "soulseek-navidrome",
      title: "SoulSeek & Navidrome Audio Hub",
      subtitle: "Automated lossless FLAC acquisition & streaming ecosystem",
      category: "Automation & Daemons",
      ecosystem: "Protutech",
      featured: false,
      badge: "Media Pipeline",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/SoulSeek",
      tech: ["Python", "Navidrome", "slskd Daemon", "Proxmox Mount Points", "FLAC / Audio Metadata"],
      shortDesc: "Self-hosted high-resolution audio streaming pipeline with automated Soulseek download daemon and shared Proxmox storage.",
      longDesc: "A self-hosted Spotify replacement combining headless Soulseek (`slskd` on CT 105) and Navidrome (`CT 103`). Connected via shared host storage mountpoints (`/mnt/music -> /opt/navidrome/music`), allowing automatic acquisition, tag extraction, and high-fidelity 24-bit FLAC streaming across all devices.",
      resumeBullets: [
        "Configured automated FLAC media ingestion pipeline linking headless Soulseek daemon (`slskd`) to Navidrome streaming server.",
        "Engineered multi-container Proxmox mountpoint architecture (`mp0`) sharing unified storage without network overhead.",
        "Supported lossless multi-device streaming with offline caching, dynamic transcoding, and custom metadata tagging."
      ],
      mockupType: "audio"
    },
    {
      id: "vaultwarden",
      title: "Protutech Vaultwarden",
      subtitle: "Zero-knowledge end-to-end encrypted secrets vault",
      category: "Network & Security",
      ecosystem: "Protutech",
      featured: false,
      badge: "Security",
      date: "2025 - Present",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI",
      tech: ["Rust", "SQLite / ZFS", "Bitwarden Protocol", "Cloudflare Zero Trust", "WebAuthn / 2FA"],
      shortDesc: "Private, self-hosted Bitwarden-compatible password manager and API key credential safe with biometric authentication.",
      longDesc: "Self-hosted security infrastructure serving encrypted credential sync for all family and server systems. Features hardware security key support (YubiKey / WebAuthn), emergency access protocols, and automated encrypted database backups.",
      resumeBullets: [
        "Deployed zero-knowledge credential vault serving desktop, mobile, and browser extensions with continuous encryption.",
        "Enforced strict WebAuthn / FIDO2 multi-factor authentication policies and encrypted offsite ZFS snapshots.",
        "Guaranteed 100% data sovereignty and credential privacy eliminating third-party cloud credential dependency."
      ],
      mockupType: "vault"
    },
    {
      id: "seafile-drive",
      title: "Protutech Seafile Cloud Drive",
      subtitle: "High-speed encrypted private cloud drive & sync cluster",
      category: "Infrastructure & Homelab",
      ecosystem: "Protutech",
      featured: false,
      badge: "Private Cloud",
      date: "2025 - Present",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI",
      tech: ["Seafile Enterprise Core", "C / Python", "Block Storage", "LAN Sync", "Windows Sync Applet"],
      shortDesc: "High-throughput private cloud storage providing block-level differential syncing and cross-device folder synchronization.",
      longDesc: "Fast, reliable self-hosted file synchronization platform with block-level deduplication. Integrated with native Windows desktop clients (`seafile-applet.exe`) and mobile apps for seamless instant file transfer across Gigabit LAN.",
      resumeBullets: [
        "Implemented high-performance private cloud drive utilizing chunk-based block storage for instant delta file synchronization.",
        "Integrated native Windows client sync daemons with automatic LAN discovery for multi-gigabit file transfers.",
        "Maintained encrypted libraries for software releases, game builds, and media archives."
      ],
      mockupType: "seafile"
    },
    {
      id: "aivault",
      title: "aiVault - Local LLM Engine & Vault",
      subtitle: "Proxmox LLM model server & Ollama remote compute pipeline",
      category: "Automation & Daemons",
      ecosystem: "Open Source",
      featured: false,
      badge: "AI & ML",
      date: "2025 - 2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/aiVault",
      tech: ["Python", "Ollama", "OpenWebUI", "CUDA / LAN Binding", "Proxmox LXC"],
      shortDesc: "Hybrid local AI infrastructure connecting high-power workstation GPU compute with Proxmox containerized OpenWebUI.",
      longDesc: "Designed an efficient private LLM pipeline. OpenWebUI runs inside a lightweight Proxmox container, while heavy inference requests are routed securely across local 2.5GbE LAN to dedicated GPU hardware running Ollama.",
      resumeBullets: [
        "Architected distributed local LLM pipeline routing containerized OpenWebUI queries to remote GPU compute nodes via low-latency LAN.",
        "Configured custom model presets, system prompts, and quantization parameters for low-latency coding and documentation assistance.",
        "Maintained 100% private, zero-telemetry local inference for proprietary code and sensitive data analysis."
      ],
      mockupType: "ai"
    },
    {
      id: "homebox",
      title: "Protutech Homebox",
      subtitle: "Hardware asset inventory & homelab equipment database",
      category: "Infrastructure & Homelab",
      ecosystem: "Protutech",
      featured: false,
      badge: "Asset Management",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI",
      tech: ["Go", "SQLite", "QR Code Generation", "Homelab Hardware", "Proxmox LXC"],
      shortDesc: "Central inventory manager tracking server serials, RAM modules, cables, warranty timelines, and homelab asset locations.",
      longDesc: "Comprehensive asset management system cataloging all hardware components, PC parts, 3D printer spares, and network gear with printable QR code labels and warranty tracking.",
      resumeBullets: [
        "Cataloged entire homelab hardware stack including server blades, network switches, SSD health, and Voron 3D printer parts.",
        "Standardized QR-code label generation for physical server rack and component identification.",
        "Tracked component lifecycle, purchase histories, and replacement schedules."
      ],
      mockupType: "homebox"
    },
    {
      id: "windows-bind",
      title: "windowsDesktopDisableBind",
      subtitle: "Windows OS desktop automation & shortcut suppression",
      category: "Automation & Daemons",
      ecosystem: "Open Source",
      featured: false,
      badge: "Windows Utility",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/windowsDesktopDisableBind",
      tech: ["PowerShell", "AutoHotkey", "Windows API", "Batch", "MIT License"],
      shortDesc: "Lightweight system-level utility intercepting and suppressing accidental Ctrl+Win+D virtual desktop creation during intense gaming.",
      longDesc: "A frustration-solving utility for PC gamers and keyboard enthusiasts. Disables the intrusive default Windows keyboard shortcut that inadvertently opens new virtual desktops during key combos, packaged with silent installers and background tray execution.",
      resumeBullets: [
        "Developed low-level keyboard hook suppression utility preventing accidental OS desktop creation during fast keystroke sequences.",
        "Engineered automated silent installation and uninstallation scripts (`install.bat`, `uninstall.ps1`) targeting Windows Task Scheduler.",
        "Published open-source with MIT license and 100% clean antivirus reputation."
      ],
      mockupType: "windows"
    },
    {
      id: "voron",
      title: "Voron 2.4 CoreXY 3D Printer",
      subtitle: "Custom-built CoreXY high-speed 3D printer & Klipper firmware tuning",
      category: "Hardware & 3D Printing",
      ecosystem: "Open Source",
      featured: false,
      badge: "Hardware Build",
      date: "2024 - 2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/Voron2.4",
      tech: ["Klipper", "Python / G-code", "Input Shaping", "Pressure Advance", "CAN Bus", "Raspberry Pi"],
      shortDesc: "Fully customized Voron 2.4 CoreXY 3D printer running tuned Klipper firmware, resonance frequency compensation, and CAN bus toolhead.",
      longDesc: "Precision electro-mechanical build featuring 4-stepper flying gantry, StealthBurner toolhead, accelerometer-based input shaping to eliminate ringing at 300mm/s print speeds, and custom macro scripting for automated bed mesh and nozzle scrubbing.",
      resumeBullets: [
        "Assembled and calibrated high-precision Voron 2.4 CoreXY 3D printer with 350mm build envelope and multi-zone heating.",
        "Tuned Klipper motion firmware utilizing ADXL345 accelerometer data to eliminate physical resonance vibrations at high acceleration (7000 mm/s²).",
        "Configured custom Klipper macros (`printer.cfg`) for automated quad gantry leveling (QGL) and temperature-calibrated bed meshing."
      ],
      mockupType: "voron"
    },
    {
      id: "sc-server",
      title: "SC - Audio Streaming Server & Daemon",
      subtitle: "Multi-theme SoundCloud/streaming server and Linux daemon",
      category: "Full Stack & Web",
      ecosystem: "Open Source",
      featured: false,
      badge: "Audio & Web",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/SC",
      tech: ["JavaScript", "HTML5 Audio", "Node.js / Express", "CSS Design System", "Linux Service"],
      shortDesc: "Custom audio streaming platform featuring cross-app design tokens, multi-palette theme switcher, and automated audio playback.",
      longDesc: "Full-stack streaming application converted into a reliable Linux service. Includes synchronized theme engine compatible with Protutech Design System, audio waveform visualization, and background streaming capabilities.",
      resumeBullets: [
        "Built responsive audio streaming web interface with real-time waveform progress and queue management.",
        "Integrated Protutech Design System theme switcher with instant CSS custom property hot-swapping.",
        "Packaged server into automated systemd service for headless Proxmox deployment."
      ],
      mockupType: "sc"
    },
    {
      id: "dropsclaim",
      title: "dropsClaim - Stream Reward Bot",
      subtitle: "Headless Twitch & stream reward automation utility",
      category: "Automation & Daemons",
      ecosystem: "Open Source",
      featured: false,
      badge: "Automation",
      date: "2025",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/dropsClaim",
      tech: ["Python", "Selenium / Playwright", "Headless Browser", "Task Scheduler"],
      shortDesc: "Automated background utility claiming time-based game drops and stream rewards without user intervention.",
      longDesc: "Headless Python automation script that monitors active gaming campaigns, navigates authenticated stream channels, and automatically claims inventory drops.",
      resumeBullets: [
        "Engineered headless web automation utilizing browser drivers to detect and claim active gaming inventory drops.",
        "Implemented resilient session persistence and token caching to prevent repetitive re-authentications.",
        "Built lightweight logging and Discord webhook dispatch for successful drop notifications."
      ],
      mockupType: "drops"
    },
    {
      id: "discordapi",
      title: "discordapi - Custom Discord Web Widgets",
      subtitle: "Rich embed widgets & custom presence API endpoints",
      category: "Full Stack & Web",
      ecosystem: "Open Source",
      featured: false,
      badge: "Web Widgets",
      date: "2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/discordapi",
      tech: ["HTML5", "CSS3", "JavaScript", "Discord Lanyard API", "SVG Badges"],
      shortDesc: "Interactive web widget suite displaying live Discord user status, avatar frames, custom badges, and game presence.",
      longDesc: "Custom embeddable widget library providing animated status pills, current game activity, Spotify track synchronization, and custom styling matching user themes.",
      resumeBullets: [
        "Crafted interactive Discord status widget library featuring dynamic avatar frames, activity badges, and Spotify track progress.",
        "Integrated WebSocket connection to real-time presence APIs for zero-polling sub-second status updates.",
        "Engineered light/dark adaptive CSS variables matching modern portfolio designs."
      ],
      mockupType: "discordapi"
    },
    {
      id: "protutech-files",
      title: "Protutech Direct Files & Media Gateway",
      subtitle: "High-throughput direct file gateway & public media repo",
      category: "Infrastructure & Homelab",
      ecosystem: "Protutech",
      featured: false,
      badge: "File Gateway",
      date: "2025 - 2026",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI",
      tech: ["Nginx", "HTTP/2", "SSL Ciphers", "Proxmox LXC", "Cloudflare CDN"],
      shortDesc: "Direct file gateway providing instant public dropzones, media streaming, and multi-gigabit file distribution.",
      longDesc: "Optimized static asset and large file gateway hosted on isolated Proxmox container. Configured for maximum throughput with HTTP/2, brotli compression, and direct download links.",
      resumeBullets: [
        "Deployed high-concurrency static file distribution gateway on Proxmox LXC with Cloudflare edge caching.",
        "Configured optimized Nginx streaming headers for low-latency media playback and software downloads."
      ],
      mockupType: "files"
    },
    {
      id: "protutech-mail",
      title: "Protutech Mail Portal",
      subtitle: "Enterprise email gateway & domain notifications",
      category: "Infrastructure & Homelab",
      ecosystem: "Protutech",
      featured: false,
      badge: "Domain Services",
      date: "2025 - Present",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI",
      tech: ["DKIM / SPF / DMARC", "Brevo SMTP Relay", "DNS Security", "Webhook Alerts"],
      shortDesc: "Authenticated transactional email routing hub for domain notifications, alerts, and user verification.",
      longDesc: "Configured custom domain email infrastructure with strict SPF, DKIM, and DMARC cryptographic signatures, achieving 10/10 mail deliverability scores and automated server alert routing.",
      resumeBullets: [
        "Configured secure domain email infrastructure with 100% cryptographic SPF, DKIM, and DMARC compliance.",
        "Integrated server monitoring alerts routing critical Proxmox hardware notifications to secure mobile inboxes."
      ],
      mockupType: "mail"
    },
    {
      id: "habitica-custom",
      title: "Habitica RPG Extensions",
      subtitle: "Custom gamified productivity tools & habit RPG workflows",
      category: "Full Stack & Web",
      ecosystem: "Open Source",
      featured: false,
      badge: "Productivity",
      date: "2024",
      liveUrl: null,
      githubUrl: "https://github.com/IAndrexI/habitica",
      tech: ["JavaScript", "REST API", "Automation", "Gamification"],
      shortDesc: "Custom extensions and workflow integrations built on Habitica to gamify engineering milestones and habit adherence.",
      longDesc: "Productivity tool leveraging game mechanics to reward software engineering achievements, homelab maintenance routines, and daily technical learning.",
      resumeBullets: [
        "Extended Habitica open-source codebase to integrate personalized task automations and achievement webhooks.",
        "Linked daily engineering commits to in-game rewards and productivity tracking."
      ],
      mockupType: "habitica"
    },
    {
      id: "general-projects",
      title: "Web Engineering Foundations",
      subtitle: "First responsive web applications, layout prototypes & UI experiments",
      category: "Full Stack & Web",
      ecosystem: "Open Source",
      featured: false,
      badge: "Frontend Archive",
      date: "2023 - 2024",
      liveUrl: null,
      internalUrl: "/original/",
      githubUrl: "https://github.com/IAndrexI/General-projects",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox & Grid"],
      shortDesc: "Foundational web development archive showcasing early responsive design layouts, flexbox grids, and modal interactions preserved alongside current production systems.",
      longDesc: "The initial web development repository documenting early explorations into semantic HTML5, responsive CSS media queries, and interactive DOM manipulation (including the California/SJ travel layout prototype and modal handlers preserved in archive/practice-page/) that paved the way for current production systems.",
      resumeBullets: [
        "Crafted semantic, mobile-first responsive prototypes utilizing vanilla HTML5 and modern CSS3.",
        "Engineered flexbox/grid layout systems with breakpoint media queries and DOM modal controllers.",
        "Preserved original practice foundations alongside modern self-hosted web applications."
      ],
      mockupType: "general"
    }
  ]
};
