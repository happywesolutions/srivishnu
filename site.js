// === Sri Vishnu Safety Nets — Shared site code (header + floating buttons) ===

const NAV = [
  { label: "Home", href: "index.html" },
  {
    label: "Safety Nets", href: "services.html?cat=safety",
    sub: [
      { l: "Balcony Safety Nets", h: "services/balcony-safety-nets.html", i: "🏠" },
      { l: "Swimming Pool Safety Nets", h: "services/swimming-pool-safety-nets.html", i: "🏊" },
      { l: "Kids Safety Nets", h: "services/kids-safety-nets.html", i: "👶" },
      { l: "Staircase Safety Nets", h: "services/staircase-safety-nets.html", i: "🪜" },
      { l: "Terrace Safety Nets", h: "services/terrace-safety-nets.html", i: "🏢" },
      { l: "Duct Area Safety Nets", h: "services/duct-area-safety-nets.html", i: "🌬️" },
      { l: "Building Coverage Nets", h: "services/building-coverage-nets.html", i: "🏗️" },
      { l: "Window Safety Nets", h: "services/window-safety-nets.html", i: "🪟" },
      { l: "Sports Nets", h: "services/sports-nets.html", i: "🏏" },
      { l: "Property Safety Nets", h: "services/property-safety-nets.html", i: "🛡️" },
    ],
  },
  {
    label: "Bird Nets", href: "services.html?cat=bird",
    sub: [
      { l: "Bird Nets", h: "services/bird-nets.html", i: "🐦" },
      { l: "Pigeon Safety Nets", h: "services/pigeon-safety-nets.html", i: "🕊️" },
      { l: "Monkey Safety Nets", h: "services/monkey-safety-nets.html", i: "🐒" },
      { l: "Duct Area Nets", h: "services/duct-area-safety-nets.html", i: "🌬️" },
      { l: "Bird Spikes", h: "services/bird-spikes.html", i: "⚡" },
    ],
  },
  {
    label: "Other Services", href: "services.html?cat=other",
    sub: [
      { l: "Invisible Grills", h: "services/invisible-grills.html", i: "▦" },
      { l: "Cloth Hangers", h: "services/cloth-hangers.html", i: "👕" },
      { l: "Mosquito Nets", h: "services/mosquito-nets.html", i: "🦟" },
      { l: "Pets Safety Nets", h: "services/pets-safety-nets.html", i: "🐾" },
      { l: "Shade Nets", h: "services/shade-nets.html", i: "🌿" },
      { l: "Sports Nets", h: "services/sports-nets.html", i: "🏏" },
    ],
  },
  { label: "Projects", href: "projects.html" },
  { label: "Gallery", href: "gallery.html" },
  { label: "About", href: "about.html" },
  { label: "Contact", href: "contact.html" },
];

const PHONE = "9652518763";
const WA_LINK = `https://wa.me/91${PHONE}?text=${encodeURIComponent("Hi, I'm interested in safety nets installation.")}`;
const TEL_LINK = `tel:${PHONE}`;

function renderHeader(activeLabel) {
  const html = `
    <div class="topbar">
      <div class="container">
        <span>Trusted Safety Net Installation • Residential & Commercial</span>
        <a href="${TEL_LINK}">📞 24/7: <strong>${PHONE}</strong></a>
      </div>
    </div>
    <header>
      <div class="container row">
        <a href="index.html" class="brand">
          <img src="images/logo.png" alt="Sri Vishnu Safety Nets logo" />
          <div class="name">SRI VISHNU<small>SAFETY NETS</small></div>
        </a>
        <nav class="main-nav" id="mainNav">
          <ul>
            ${NAV.map(item => {
              const active = item.label === activeLabel ? "active" : "";
              if (item.sub) {
                return `
                  <li class="has-sub">
                    <a href="${item.href}" class="nav-link ${active}">
                      ${item.label}
                      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </a>
                    <div class="dropdown">
                      <div class="dropdown-inner">
                        <div class="items">
                          ${item.sub.map(s => `
                            <a href="${s.h}"><span class="ic">${s.i}</span><span>${s.l}</span></a>
                          `).join("")}
                        </div>
                        <a href="${item.href}" class="view-all">View All →</a>
                      </div>
                    </div>
                  </li>`;
              }
              return `<li><a href="${item.href}" class="nav-link ${active}">${item.label}</a></li>`;
            }).join("")}
          </ul>
        </nav>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${TEL_LINK}" class="call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span class="num">${PHONE}</span>
          </a>
          <button class="menu-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>
  `;
  document.getElementById("site-header").innerHTML = html;

  // Mobile menu toggle
  document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("mainNav").classList.toggle("open");
  });

  // Mobile dropdown toggle (tap on parent link expands instead of navigating)
  document.querySelectorAll(".main-nav .has-sub > .nav-link").forEach(a => {
    a.addEventListener("click", e => {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        a.parentElement.classList.toggle("open");
      }
    });
  });
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="f-col">
          <div class="f-brand">
            <div class="f-logo"><img src="images/logo.png" alt="Sri Vishnu Safety Nets" /></div>
            <div>
              <div class="f-name">SRI VISHNU</div>
              <div class="f-sub">SAFETY NETS</div>
            </div>
          </div>
          <p class="f-about">Reliable and durable safety net solutions for homes and businesses across Hyderabad.</p>
        </div>
        <div class="f-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html?cat=safety">Safety Nets</a></li>
            <li><a href="services.html?cat=bird">Bird Nets</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="f-col">
          <h4>Top Services</h4>
          <ul>
            <li><a href="services/balcony-safety-nets.html">Balcony Safety Nets</a></li>
            <li><a href="services/pigeon-safety-nets.html">Pigeon Safety Nets</a></li>
            <li><a href="services/swimming-pool-safety-nets.html">Pool Safety Nets</a></li>
            <li><a href="services/invisible-grills.html">Invisible Grills</a></li>
            <li><a href="services/sports-nets.html">Sports Nets</a></li>
            <li><a href="services/bird-spikes.html">Bird Spikes</a></li>
          </ul>
        </div>
        <div class="f-col">
          <h4>Contact Us</h4>
          <ul class="f-contact">
            <li><span class="f-ic">📞</span><a href="${TEL_LINK}">${PHONE}</a></li>
            <li><span class="f-ic">✉️</span>info@srivishnusafetynets.com</li>
            <li><span class="f-ic">📍</span>Hyderabad, Telangana, India</li>
          </ul>
          <div class="f-social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◉</a>
          </div>
        </div>
      </div>
      <div class="container f-copy">© ${new Date().getFullYear()} Sri Vishnu Safety Nets. All rights reserved.</div>
    </footer>
  `;
}

function renderFloating() {
  document.getElementById("site-floating").innerHTML = `
    <div class="floating">
      <a class="float-btn wa" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="currentColor"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.516 2.42-1.39.07-.214.07-.428.07-.658 0-.272-1.16-.86-1.474-1.046zM16.226 6.687c-5.355 0-9.713 4.358-9.713 9.713 0 1.875.546 3.683 1.547 5.252l-1.13 4.038 4.166-1.103a9.65 9.65 0 0 0 5.13 1.475c5.355 0 9.713-4.358 9.713-9.713 0-2.595-1.01-5.032-2.85-6.872a9.696 9.696 0 0 0-6.863-2.79zm0 17.74a8.063 8.063 0 0 1-4.418-1.317l-.314-.187-3.123.83.83-3.052-.2-.328a8.024 8.024 0 0 1-1.246-4.31c0-4.41 3.602-8.013 8.013-8.013a8.04 8.04 0 0 1 5.66 2.347 8.034 8.034 0 0 1 2.348 5.668c0 4.41-3.595 8.012-8.013 8.012z"/></svg>
      </a>
      <a class="float-btn call" href="${TEL_LINK}" aria-label="Call now">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>
    </div>
  `;
}

window.SVSN = { NAV, PHONE, WA_LINK, TEL_LINK, renderHeader, renderFooter, renderFloating };
