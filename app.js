/**
 * ANDREW PORTFOLIO - APPLICATION SCRIPT
 * Simplistic Animated Starry Night Background, Apple-Style Tab Navigation,
 * Dynamic Screenshot Mockup Generator & Modal Card Expansions
 */

(function () {
  'use strict';

  // State Management
  const state = {
    activeCategory: 'All',
    searchQuery: '',
    currentTheme: localStorage.getItem('protutech_theme') || 'dark',
    currentPalette: localStorage.getItem('protutech_palette') || 'protutech-obsidian',
    activeModalProject: null
  };

  // DOM Elements
  const elements = {
    canvas: document.getElementById('starry-canvas'),
    navTabs: document.getElementById('main-nav-tabs'),
    featuredContainer: document.getElementById('featured-cards-container'),
    projectsGrid: document.getElementById('projects-grid'),
    searchInput: document.getElementById('project-search'),
    categoryPills: document.getElementById('category-pills'),
    projectCountBadge: document.getElementById('project-count-badge'),
    paletteSelect: document.getElementById('palette-select'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    detailModal: document.getElementById('project-detail-modal'),
    modalBody: document.getElementById('modal-detail-body'),
    resumeModal: document.getElementById('resume-modal')
  };

  /* --------------------------------------------------------------------------
     SIMPLISTIC ANIMATED STARRY NIGHT ENGINE
     Twinkling micro-stars with gentle depth parallax and shooting meteors
     -------------------------------------------------------------------------- */
  class StarryNightEngine {
    constructor(canvas) {
      if (!canvas) return;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.stars = [];
      this.meteors = [];
      this.numStars = 140;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.lastMeteorTime = Date.now();
      this.meteorInterval = 4500; // Meteor every 4.5s
      this.scrollY = window.scrollY;

      this.resize = this.resize.bind(this);
      this.animate = this.animate.bind(this);

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', this.resize);
      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY;
      }, { passive: true });

      // Generate stars with coordinates and twinkle frequencies
      this.stars = [];
      for (let i = 0; i < this.numStars; i++) {
        this.stars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 1.3 + 0.4,
          baseAlpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          depth: Math.random() * 0.4 + 0.1, // Parallax depth layer
          color: Math.random() > 0.8 ? '#00f2fe' : (Math.random() > 0.6 ? '#c084fc' : '#ffffff')
        });
      }

      requestAnimationFrame(this.animate);
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    createMeteor() {
      // Create shooting star starting from top/right quadrant
      const startX = Math.random() * (this.width * 0.8) + (this.width * 0.1);
      const startY = Math.random() * (this.height * 0.35);
      const length = Math.random() * 100 + 80;
      const speed = Math.random() * 8 + 10;
      const angle = (215 + (Math.random() * 15 - 7.5)) * (Math.PI / 180); // ~215 degrees

      this.meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: -Math.sin(angle) * speed,
        length: length,
        alpha: 1.0,
        decay: Math.random() * 0.015 + 0.015
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Check if light mode is active to reduce star opacity
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const globalOpacityMultiplier = isLight ? 0.35 : 1.0;

      // 1. Draw & Twinkle Stars
      const time = Date.now();
      for (let i = 0; i < this.stars.length; i++) {
        const s = this.stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const alpha = Math.max(0.1, Math.min(1.0, s.baseAlpha + Math.sin(s.twinklePhase) * 0.3)) * globalOpacityMultiplier;

        // Subtle scroll parallax
        const displayY = (s.y - (this.scrollY * s.depth * 0.15)) % this.height;
        const normalizedY = displayY < 0 ? displayY + this.height : displayY;

        this.ctx.beginPath();
        this.ctx.arc(s.x, normalizedY, s.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = s.color;
        this.ctx.globalAlpha = alpha;
        this.ctx.fill();
      }

      // 2. Trigger Periodic Meteors
      if (!isLight && time - this.lastMeteorTime > this.meteorInterval) {
        this.createMeteor();
        this.lastMeteorTime = time + (Math.random() * 2000 - 1000); // jitter
      }

      // 3. Draw & Update Meteors
      for (let i = this.meteors.length - 1; i >= 0; i--) {
        const m = this.meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x < 0 || m.y > this.height) {
          this.meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - (m.dx / 12) * m.length;
        const tailY = m.y - (m.dy / 12) * m.length;

        const grad = this.ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha * 0.9})`);
        grad.addColorStop(0.3, `rgba(0, 242, 254, ${m.alpha * 0.6})`);
        grad.addColorStop(1, 'rgba(0, 242, 254, 0)');

        this.ctx.beginPath();
        this.ctx.moveTo(m.x, m.y);
        this.ctx.lineTo(tailX, tailY);
        this.ctx.strokeStyle = grad;
        this.ctx.lineWidth = 1.8;
        this.ctx.globalAlpha = m.alpha;
        this.ctx.stroke();
      }

      this.ctx.globalAlpha = 1.0;
      requestAnimationFrame(this.animate);
    }
  }

  /* --------------------------------------------------------------------------
     Mini Screenshot & Application Mockup Generator
     Generates crisp, realistic application UI mockups for each project type
     -------------------------------------------------------------------------- */
  function generateAppMockupHTML(project) {
    const type = project.mockupType || 'generic';
    const address = project.liveUrl ? project.liveUrl.replace('https://', '') : 'local://' + project.id;

    let contentHTML = '';

    switch (type) {
      case 'dash':
        contentHTML = `
          <div class="mock-periodic-grid">
            <div class="mock-element-cell highlight">
              <span class="element-symbol">Dc</span>
              <span class="element-name">Discord</span>
              <span class="element-status"></span>
            </div>
            <div class="mock-element-cell highlight">
              <span class="element-symbol">Px</span>
              <span class="element-name">Proxmox</span>
              <span class="element-status"></span>
            </div>
            <div class="mock-element-cell">
              <span class="element-symbol">Hb</span>
              <span class="element-name">Homebox</span>
              <span class="element-status"></span>
            </div>
            <div class="mock-element-cell">
              <span class="element-symbol">Pl</span>
              <span class="element-name">Pelican</span>
              <span class="element-status"></span>
            </div>
            <div class="mock-element-cell">
              <span class="element-symbol">Sf</span>
              <span class="element-name">Seafile</span>
              <span class="element-status"></span>
            </div>
            <div class="mock-element-cell">
              <span class="element-symbol">Vw</span>
              <span class="element-name">Vault</span>
              <span class="element-status"></span>
            </div>
            <div class="mock-element-cell">
              <span class="element-symbol">Nd</span>
              <span class="element-name">Nade</span>
              <span class="element-status"></span>
            </div>
            <div class="mock-element-cell">
              <span class="element-symbol">Sl</span>
              <span class="element-name">slskd</span>
              <span class="element-status"></span>
            </div>
          </div>
        `;
        break;

      case 'proxmox':
        contentHTML = `
          <div class="mock-proxmox-layout">
            <div class="mock-proxmox-tree">
              <div class="tree-node active">🖥️ pve</div>
              <div class="tree-sub">101 discopanel</div>
              <div class="tree-sub">103 navidrome</div>
              <div class="tree-sub">105 slskd</div>
              <div class="tree-sub">108 seafile</div>
              <div class="tree-sub">110 pelican</div>
            </div>
            <div class="mock-proxmox-telemetry">
              <div class="metric-bar-group">
                <div class="metric-bar-label"><span>CPU Usage</span><span>14.8% of 16 CPUs</span></div>
                <div class="metric-track"><div class="metric-fill fill-orange" style="width: 15%;"></div></div>
              </div>
              <div class="metric-bar-group">
                <div class="metric-bar-label"><span>RAM Usage</span><span>24.2 / 64.0 GB (37.8%)</span></div>
                <div class="metric-track"><div class="metric-fill fill-blue" style="width: 38%;"></div></div>
              </div>
              <div class="metric-bar-group">
                <div class="metric-bar-label"><span>ZFS Pool (NVMe)</span><span>1.8 / 4.0 TB (45.0%)</span></div>
                <div class="metric-track"><div class="metric-fill fill-emerald" style="width: 45%;"></div></div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'cs2':
        contentHTML = `
          <div class="mock-cs2-radar">
            <div class="radar-bombsite bombsite-a">A</div>
            <div class="radar-bombsite bombsite-b">B</div>
            <svg class="nade-arc-svg" viewBox="0 0 300 150">
              <path d="M 40,120 Q 140,20 220,50" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-dasharray="4,3" />
              <circle cx="220" cy="50" r="5" fill="#00f2fe" opacity="0.8" />
              <path d="M 60,110 Q 110,40 160,80" fill="none" stroke="#f59e0b" stroke-width="2" />
              <circle cx="160" cy="80" r="4" fill="#f59e0b" />
            </svg>
            <div style="position: absolute; bottom: 8px; right: 10px; font-size: 9px; font-family: var(--font-mono); color: #94a3b8; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px;">
              de_mirage • Window Smoke [Jumpthrow]
            </div>
          </div>
        `;
        break;

      case 'discord':
        contentHTML = `
          <div class="mock-discord-card">
            <div class="discord-user-row">
              <div class="discord-avatar-box">
                PT
                <span class="discord-online-dot"></span>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 11px;">Andrew</div>
                <div style="color: #94a3b8; font-size: 9px;">Proxmox RPC Host</div>
              </div>
            </div>
            <div class="discord-presence-box">
              <div class="presence-img">Px</div>
              <div style="line-height: 1.3;">
                <div style="font-weight: 700; color: #ffffff;">Playing Proxmox VE 9.2.11</div>
                <div style="color: #94a3b8;">Node: pve • Uptime: 99.98%</div>
                <div style="color: #00f2fe;">06:14:28 elapsed</div>
              </div>
            </div>
          </div>
        `;
        break;

      case 'dns':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div class="mock-stat-tiles">
              <div class="mock-tile">
                <div class="mock-tile-val">358,410</div>
                <div class="mock-tile-lbl">DNS Queries</div>
              </div>
              <div class="mock-tile">
                <div class="mock-tile-val" style="color: #10b981;">48.2%</div>
                <div class="mock-tile-lbl">Blocked Rate</div>
              </div>
              <div class="mock-tile">
                <div class="mock-tile-val">0.8 ms</div>
                <div class="mock-tile-lbl">Avg Response</div>
              </div>
            </div>
            <div class="mock-terminal-box">
              <div class="terminal-line"><span class="green">✓ CI/CD:</span><span>dns-compile.yml succeeded</span></div>
              <div class="terminal-line"><span class="dim">Ingest:</span><span>34 upstream feeds parsed</span></div>
              <div class="terminal-line"><span class="purple">Active:</span><span>AdGuard Home filters updated</span></div>
            </div>
          </div>
        `;
        break;

      case 'pelican':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; font-weight: 700;">
              <span>Wings Node [node-01.protutech]</span>
              <span style="color: #10b981;">● Online</span>
            </div>
            <div class="mock-stat-tiles">
              <div class="mock-tile">
                <div class="mock-tile-val" style="color: #e11d48;">CS2 128t</div>
                <div class="mock-tile-lbl">8/10 Players</div>
              </div>
              <div class="mock-tile">
                <div class="mock-tile-val" style="color: #38bdf8;">Minecraft</div>
                <div class="mock-tile-lbl">Fabric 1.21</div>
              </div>
              <div class="mock-tile">
                <div class="mock-tile-val">5.8 GB</div>
                <div class="mock-tile-lbl">RAM Usage</div>
              </div>
            </div>
            <div class="mock-terminal-box" style="font-size: 8px;">
              <div>[Server thread/INFO]: Game server tickrate steady at 128.00 tps</div>
              <div>[Wings]: Container resource reservation validated</div>
            </div>
          </div>
        `;
        break;

      case 'audio':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; gap: 10px; align-items: center;">
              <div style="width: 44px; height: 44px; border-radius: 6px; background: linear-gradient(135deg, #0ea5e9, #818cf8); display: flex; align-items: center; justify-content: center; font-size: 18px;">
                🎵
              </div>
              <div style="flex: 1; overflow: hidden;">
                <div style="font-weight: 700; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Lossless Audio Stream</div>
                <div style="font-size: 9px; color: #10b981; font-weight: 600;">FLAC 24-bit / 96 kHz • 2,480 kbps</div>
                <div style="font-size: 8px; color: #94a3b8;">Navidrome (CT 103) & slskd (CT 105)</div>
              </div>
            </div>
            <div style="height: 18px; display: flex; align-items: flex-end; gap: 3px; padding: 2px 0;">
              ${Array.from({ length: 24 }).map((_, i) => `<div style="flex:1; height:${Math.sin(i * 0.5) * 40 + 50}%; background:var(--accent-primary); border-radius:1px;"></div>`).join('')}
            </div>
          </div>
        `;
        break;

      case 'vault':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px;">
              <span style="font-weight: 700;">Zero-Knowledge Vault</span>
              <span style="color: #3b82f6; font-size: 9px;">AES-256-GCM</span>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 10px;">
                <div style="color: #94a3b8; font-size: 8px;">2FA Verification Code</div>
                <div style="font-size: 16px; font-weight: 800; font-family: var(--font-mono); color: #00f2fe; letter-spacing: 2px;">849 201</div>
              </div>
              <div style="width: 22px; height: 22px; border-radius: 50%; border: 2px solid #00f2fe; display: flex; align-items: center; justify-content: center; font-size: 9px;">
                24s
              </div>
            </div>
            <div style="font-size: 8px; color: #94a3b8; display: flex; justify-content: space-between;">
              <span>Ciphers: 184</span>
              <span>WebAuthn FIDO2: Enforced</span>
            </div>
          </div>
        `;
        break;

      case 'seafile':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px;">
              <span style="font-weight: 700;">Seafile Drive Cluster</span>
              <span style="color: #10b981; font-size: 9px;">● LAN Sync Active</span>
            </div>
            <div class="mock-stat-tiles">
              <div class="mock-tile"><div class="mock-tile-val">📁 84 GB</div><div class="mock-tile-lbl">Software</div></div>
              <div class="mock-tile"><div class="mock-tile-val">📁 420 GB</div><div class="mock-tile-lbl">Backups</div></div>
              <div class="mock-tile"><div class="mock-tile-val" style="color: #0284c7;">240 MB/s</div><div class="mock-tile-lbl">Throughput</div></div>
            </div>
            <div style="font-size: 8px; color: #94a3b8; background: rgba(0,0,0,0.25); padding: 4px 6px; border-radius: 4px;">
              Delta block sync active with seafile-applet.exe
            </div>
          </div>
        `;
        break;

      case 'ai':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8;">
              <span>Model: qwen2.5-coder:7b</span>
              <span style="color: #10b981;">Inference: 46.2 tok/s</span>
            </div>
            <div class="mock-terminal-box" style="flex: 1; font-size: 8.5px;">
              <div class="terminal-line"><span class="purple">&gt; Ollama:</span><span>Context loaded (32,768 tokens)</span></div>
              <div class="terminal-line"><span class="green">&gt; VRAM:</span><span>6.8 / 16.0 GB allocated</span></div>
              <div class="terminal-line"><span class="dim">&gt; Network:</span><span>Zero external telemetry</span></div>
            </div>
          </div>
        `;
        break;

      case 'homebox':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700;">
              <span>Homelab Asset Inventory</span>
              <span style="color: #10b981; font-size: 9px;">QR Verified</span>
            </div>
            <div style="font-size: 8.5px; display: flex; flex-direction: column; gap: 4px;">
              <div style="background: rgba(255,255,255,0.04); padding: 4px 6px; border-radius: 4px; display: flex; justify-content: space-between;">
                <span>AMD Ryzen 9 AM5 (Server Host)</span>
                <span style="color: #10b981;">Active</span>
              </div>
              <div style="background: rgba(255,255,255,0.04); padding: 4px 6px; border-radius: 4px; display: flex; justify-content: space-between;">
                <span>Kingston Fury 64GB DDR5 ECC</span>
                <span style="color: #10b981;">Active</span>
              </div>
              <div style="background: rgba(255,255,255,0.04); padding: 4px 6px; border-radius: 4px; display: flex; justify-content: space-between;">
                <span>Intel X520-DA2 10GbE SFP+</span>
                <span style="color: #10b981;">Active</span>
              </div>
            </div>
          </div>
        `;
        break;

      case 'windows':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700;">
              <span>Windows Keyboard Hook</span>
              <span style="color: #10b981; font-size: 9px;">Active</span>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center;">
              <div style="font-size: 12px; font-weight: 700; color: #ef4444; font-family: var(--font-mono);">[Ctrl + Win + D]</div>
              <div style="font-size: 9px; color: #94a3b8; margin-top: 2px;">Shortcut Intercepted & Blocked</div>
            </div>
            <div style="font-size: 8px; color: #94a3b8; display: flex; justify-content: space-between;">
              <span>Task Scheduler: Auto-start</span>
              <span>Memory: 1.2 MB</span>
            </div>
          </div>
        `;
        break;

      case 'voron':
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div style="display: flex; justify-content: space-between; font-size: 10px; font-weight: 700;">
              <span>Klipper Fluidd • Voron 2.4</span>
              <span style="color: #00f2fe; font-size: 9px;">300 mm/s</span>
            </div>
            <div class="mock-stat-tiles">
              <div class="mock-tile"><div class="mock-tile-val" style="color: #f43f5e;">250°C</div><div class="mock-tile-lbl">Hotend</div></div>
              <div class="mock-tile"><div class="mock-tile-val" style="color: #f59e0b;">105°C</div><div class="mock-tile-lbl">Heatbed</div></div>
              <div class="mock-tile"><div class="mock-tile-val" style="color: #10b981;">0.04mm</div><div class="mock-tile-lbl">Bed Mesh</div></div>
            </div>
            <div style="font-size: 8px; color: #94a3b8; background: rgba(0,0,0,0.25); padding: 4px; border-radius: 4px;">
              Input Shaping (mzv @ 54.2Hz) • CAN Bus Toolhead Active
            </div>
          </div>
        `;
        break;

      default:
        contentHTML = `
          <div class="mock-generic-dashboard">
            <div class="mock-stat-tiles">
              <div class="mock-tile"><div class="mock-tile-val">v1.0</div><div class="mock-tile-lbl">Release</div></div>
              <div class="mock-tile"><div class="mock-tile-val" style="color:#10b981;">100%</div><div class="mock-tile-lbl">Uptime</div></div>
              <div class="mock-tile"><div class="mock-tile-val">API</div><div class="mock-tile-lbl">Ready</div></div>
            </div>
            <div class="mock-terminal-box">
              <div class="terminal-line"><span class="green">&gt; Service:</span><span>${project.title}</span></div>
              <div class="terminal-line"><span class="dim">&gt; Category:</span><span>${project.category}</span></div>
              <div class="terminal-line"><span class="purple">&gt; Status:</span><span>Production deployed</span></div>
            </div>
          </div>
        `;
        break;
    }

    return `
      <div class="app-mockup-frame">
        <div class="mockup-titlebar">
          <div class="mockup-traffic-lights">
            <span class="traffic-light red"></span>
            <span class="traffic-light yellow"></span>
            <span class="traffic-light green"></span>
          </div>
          <div class="mockup-addressbar">${address}</div>
          <div class="mockup-status-dot">
            <span class="dot-pulse"></span>
            <span>Live</span>
          </div>
        </div>
        <div class="mockup-viewport">
          ${contentHTML}
        </div>
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     Render Featured Bento Cards (Apple Scroll-Expand Style)
     -------------------------------------------------------------------------- */
  function renderFeaturedCards() {
    const featuredProjects = window.PORTFOLIO_DATA.projects.filter(p => p.featured);
    if (!elements.featuredContainer) return;

    elements.featuredContainer.innerHTML = featuredProjects.map(project => `
      <article class="scroll-expand-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="View details for ${project.title}">
        <div class="card-content-left">
          <div class="card-badge-row">
            <span class="feature-pill">${project.badge}</span>
            <span class="ecosystem-pill">${project.ecosystem}</span>
          </div>
          <h3 class="card-title">${project.title}</h3>
          <div class="card-subtitle">${project.subtitle}</div>
          <p class="card-description">${project.shortDesc}</p>
          <div class="tech-tags">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="card-actions-row">
            <button class="btn-card-action primary" onclick="event.stopPropagation(); window.PortfolioApp.openProjectModal('${project.id}')">
              <span>View Specs & Architecture</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action secondary" onclick="event.stopPropagation()">
                <span>Launch App</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action secondary" onclick="event.stopPropagation()">
                <span>GitHub</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            ` : ''}
          </div>
        </div>
        <div class="card-content-right">
          ${generateAppMockupHTML(project)}
        </div>
      </article>
    `).join('');

    // Attach click events
    elements.featuredContainer.querySelectorAll('.scroll-expand-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        openProjectModal(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-project-id');
          openProjectModal(id);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Render All Projects Gallery Grid
     -------------------------------------------------------------------------- */
  function renderProjectsGallery() {
    if (!elements.projectsGrid) return;

    let filtered = window.PORTFOLIO_DATA.projects;

    // Filter by Category
    if (state.activeCategory !== 'All') {
      filtered = filtered.filter(p => {
        if (state.activeCategory === 'Proxmox & Homelab') return p.ecosystem === 'Proxmox' || p.category.includes('Infrastructure');
        if (state.activeCategory === 'Open Source & GitHub') return p.githubUrl && p.githubUrl.includes('IAndrexI');
        if (state.activeCategory === 'Automation & Python') return p.category.includes('Automation') || p.tech.includes('Python');
        if (state.activeCategory === 'Full Stack & Web') return p.category.includes('Web') || p.category.includes('Full Stack');
        if (state.activeCategory === 'Game Tech') return p.category.includes('Game');
        return p.category === state.activeCategory;
      });
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q))
      );
    }

    // Update Project Count
    if (elements.projectCountBadge) {
      elements.projectCountBadge.textContent = `${filtered.length} Projects Shown`;
    }

    if (filtered.length === 0) {
      elements.projectsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h4 style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 6px;">No projects match "${state.searchQuery}"</h4>
          <p style="font-size: 0.9rem;">Try searching by technology (e.g., Python, Proxmox, Vue) or select 'All'.</p>
        </div>
      `;
      return;
    }

    elements.projectsGrid.innerHTML = filtered.map(project => `
      <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="View project ${project.title}">
        <div class="project-card-header">
          <span class="feature-pill" style="font-size: 10px;">${project.badge || project.category}</span>
          <span class="ecosystem-pill" style="font-size: 10px;">${project.ecosystem}</span>
        </div>
        <div class="project-card-title-group">
          <h4 class="project-card-title">${project.title}</h4>
          <div class="project-card-subtitle">${project.subtitle}</div>
        </div>
        <div class="project-card-mockup-wrapper">
          ${generateAppMockupHTML(project)}
        </div>
        <div class="project-card-body">
          <p class="project-card-desc">${project.shortDesc}</p>
          <div class="tech-tags">
            ${project.tech.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}
            ${project.tech.length > 3 ? `<span class="tech-tag">+${project.tech.length - 3}</span>` : ''}
          </div>
        </div>
        <div class="project-card-footer">
          <span class="card-expand-hint">
            <span>Expand Details</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <div class="project-card-links">
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-icon-link" title="Open Live Site" onclick="event.stopPropagation()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-icon-link" title="View GitHub Code" onclick="event.stopPropagation()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `).join('');

    // Attach click events
    elements.projectsGrid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        openProjectModal(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-project-id');
          openProjectModal(id);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Apple-Style Interactive Modal / Full Card Expansion
     -------------------------------------------------------------------------- */
  function openProjectModal(projectId) {
    const project = window.PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project || !elements.detailModal || !elements.modalBody) return;

    state.activeModalProject = project;

    elements.modalBody.innerHTML = `
      <div class="modal-header-meta">
        <span class="feature-pill">${project.badge}</span>
        <span class="ecosystem-pill">${project.ecosystem}</span>
        <span style="font-size: 12px; color: var(--text-muted);">${project.date}</span>
      </div>
      <h2 class="modal-title">${project.title}</h2>
      <div class="modal-subtitle">${project.subtitle}</div>

      <div class="modal-mockup-container">
        ${generateAppMockupHTML(project)}
      </div>

      <h4 class="modal-section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>Project Overview & Architecture</span>
      </h4>
      <p class="modal-description">${project.longDesc}</p>

      <h4 class="modal-section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        <span>Engineering Impact & Resume Highlights</span>
      </h4>
      <ul class="resume-bullets-list">
        ${project.resumeBullets.map(bullet => `
          <li class="resume-bullet-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2.5" style="flex-shrink: 0; margin-top: 3px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${bullet}</span>
          </li>
        `).join('')}
      </ul>

      <h4 class="modal-section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><path d="M16 18l6-6-6-6"></path><path d="M8 6l-6 6 6 6"></path></svg>
        <span>Technology Stack</span>
      </h4>
      <div class="tech-tags" style="margin-bottom: 24px;">
        ${project.tech.map(t => `<span class="tech-tag" style="font-size: 13px; padding: 6px 12px;">${t}</span>`).join('')}
      </div>

      <div class="modal-cta-footer">
        ${project.liveUrl ? `
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action primary" style="padding: 10px 22px; font-size: 14px;">
            <span>Open Live Portal</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        ` : ''}
        ${project.githubUrl ? `
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action secondary" style="padding: 10px 20px; font-size: 14px;">
            <span>View Source Code</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        ` : ''}
      </div>
    `;

    elements.detailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (elements.detailModal) elements.detailModal.classList.remove('active');
    if (elements.resumeModal) elements.resumeModal.classList.remove('active');
    document.body.style.overflow = '';
    state.activeModalProject = null;
  }

  function openResumeModal() {
    if (!elements.resumeModal) return;
    elements.resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* --------------------------------------------------------------------------
     Theme Engine & Palette Switcher
     -------------------------------------------------------------------------- */
  function applyTheme(theme, palette) {
    state.currentTheme = theme;
    state.currentPalette = palette;

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-palette', palette);

    localStorage.setItem('protutech_theme', theme);
    localStorage.setItem('protutech_palette', palette);

    if (elements.paletteSelect) {
      elements.paletteSelect.value = palette;
    }

    if (elements.themeIcon) {
      if (theme === 'light') {
        elements.themeIcon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      } else {
        elements.themeIcon.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    }
  }

  function toggleLightDarkMode() {
    const nextTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, state.currentPalette);
  }

  /* --------------------------------------------------------------------------
     Tab Navigation Active Tracking
     -------------------------------------------------------------------------- */
  function initTabScrollTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('data-tab') === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  /* --------------------------------------------------------------------------
     Apple-Style Scroll Expansion Observer
     -------------------------------------------------------------------------- */
  function initScrollObservers() {
    const cards = document.querySelectorAll('.scroll-expand-card');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
      card.style.opacity = '0.92';
      card.style.transform = 'translateY(20px) scale(0.98)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(card);
    });
  }

  /* --------------------------------------------------------------------------
     Event Listeners & Setup
     -------------------------------------------------------------------------- */
  function init() {
    // 1. Initialize Starry Night Background
    new StarryNightEngine(elements.canvas);

    // 2. Apply initial theme & palette
    applyTheme(state.currentTheme, state.currentPalette);

    // 3. Initial renders
    renderFeaturedCards();
    renderProjectsGallery();
    initScrollObservers();
    initTabScrollTracking();

    // 4. Theme controls
    if (elements.paletteSelect) {
      elements.paletteSelect.addEventListener('change', (e) => {
        applyTheme(state.currentTheme, e.target.value);
      });
    }

    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', toggleLightDarkMode);
    }

    // 5. Category filter pills
    if (elements.categoryPills) {
      elements.categoryPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-pill');
        if (!btn) return;

        elements.categoryPills.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        state.activeCategory = btn.getAttribute('data-category');
        renderProjectsGallery();
      });
    }

    // 6. Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderProjectsGallery();
      });
    }

    // 7. Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== elements.searchInput) {
        e.preventDefault();
        if (elements.searchInput) {
          elements.searchInput.focus();
          elements.searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // 8. Close modal on backdrop click
    if (elements.detailModal) {
      elements.detailModal.addEventListener('click', (e) => {
        if (e.target === elements.detailModal) closeModal();
      });
    }

    if (elements.resumeModal) {
      elements.resumeModal.addEventListener('click', (e) => {
        if (e.target === elements.resumeModal) closeModal();
      });
    }

    // Close buttons inside modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
  }

  // Expose global methods
  window.PortfolioApp = {
    openProjectModal,
    openResumeModal,
    closeModal,
    applyTheme,
    toggleLightDarkMode
  };

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
