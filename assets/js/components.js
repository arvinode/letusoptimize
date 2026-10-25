/**
 * Shared visual components.
 * Keep header/footer markup here instead of duplicating it
 * across every page.
 */
(() => {
  const config = window.LUO_CONFIG;

  if (!config) {
    console.error("LUO_CONFIG is missing.");
    return;
  }

  function applyGlobalContactLinks() {
    const phone = config.contact.phone || "";
    const whatsappNumber = (config.contact.whatsapp || "").replace(/\D/g, "");
    const email = config.contact.email || "";

    document.querySelectorAll("[data-luo-whatsapp]").forEach((link) => {
      if (whatsappNumber) {
        link.href = `https://wa.me/${whatsappNumber}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });

    document.querySelectorAll("[data-luo-phone]").forEach((link) => {
      if (phone) link.href = `tel:${phone.replace(/[^+\d]/g, "")}`;
    });

    document.querySelectorAll("[data-luo-email]").forEach((link) => {
      if (email) link.href = `mailto:${email}`;
    });

    document.querySelectorAll("[data-luo-email-text]").forEach((element) => {
      if (email) element.textContent = email;
    });
  }

  const arrowIcon = `
    <svg class="button__icon"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 12 12"
         fill="currentColor"
         aria-hidden="true">
      <path d="M12 1C12 1.3 11.9 1.5 11.7 1.7l-10 10a.99.99 0 0 1-1.4-1.4l10-10a.99.99 0 0 1 1.7.7Z"/>
      <path d="M12 1v9c0 .6-.4 1-1 1s-1-.4-1-1V3H2c-.6 0-1-.4-1-1s.4-1 1-1h9c.6 0 1 .4 1 1Z"/>
    </svg>`;


  function applyGlobalBusinessDetails() {
    document.querySelectorAll("[data-luo-social]").forEach((link) => {
      const url = config.social[link.dataset.luoSocial];
      if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; }
    });
    document.querySelectorAll("[data-luo-location]").forEach((element) => {
      element.textContent = config.contact.location || "";
    });
    document.querySelectorAll("[data-luo-brand-link]").forEach((link) => {
      link.textContent = config.brand.name;
      link.href = "/";
    });
    document.querySelectorAll("[data-luo-logo]").forEach((img) => {
      img.src = config.assets.logo;
      img.alt = config.brand.name;
    });
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  const footerTemplate = `<footer class="site-footer" id="site-footer">

  <div class="site-footer__shell">

    <!-- TOP ROW -->
    <div class="site-footer__top">

      <a class="site-footer__brand" href="/" data-scroll-top
         aria-label="Let Us Optimize — Home">
        <img
          src="assets/images/logo.svg" data-luo-logo
          alt="Let Us Optimize"
          width="180"
          height="48"
          loading="lazy"
        />
      </a>

      <div class="site-footer__social">
        <span class="site-footer__social-label">Follow us</span>

        <a href="#" data-luo-social="instagram"
           target="_blank" rel="noopener noreferrer"
           aria-label="Let Us Optimize on Instagram">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5"
              stroke="currentColor" stroke-width="1.8"/>
            <circle cx="12" cy="12" r="4"
              stroke="currentColor" stroke-width="1.8"/>
            <circle cx="17.5" cy="6.5" r="1"
              fill="currentColor"/>
          </svg>
          <span>Instagram</span>
        </a>

        <a href="#" data-luo-social="facebook"
           target="_blank" rel="noopener noreferrer"
           aria-label="Let Us Optimize on Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.1H7v3.2h2.7V21h3.7Z"/>
          </svg>
          <span>Facebook</span>
        </a>

        <a href="#" data-luo-social="linkedin"
           target="_blank" rel="noopener noreferrer"
           aria-label="Let Us Optimize on LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9.5H7V21H3.4V9.5Zm5.8 0h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.7 0 4.4 2.4 4.4 5.5V21h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9.2V9.5Z"/>
          </svg>
          <span>LinkedIn</span>
        </a>

        <a href="#" data-luo-social="x"
           target="_blank" rel="noopener noreferrer"
           aria-label="Let Us Optimize on X">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.1L5.7 22H2.5l7.3-8.4L1.8 2h6.5l4.5 6.6L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z"/>
          </svg>
          <span>X</span>
        </a>
      </div>

    </div>

    <div class="site-footer__divider"></div>

    <!-- MAIN FOOTER CONTENT -->
    <div class="site-footer__main">

      <div class="site-footer__intro">
        <p class="site-footer__eyebrow">Technology, made simpler.</p>

        <h2>
          Your friendly digital partner.
        </h2>

        <p class="site-footer__description">
          We help micro and small businesses navigate the digital
          world with practical websites, reliable technical support
          and honest advice. Just what your business needs.
        </p>

        <div class="site-footer__contact-links">
          <a href="#" data-luo-email
             data-luo-email>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2"
                stroke="currentColor" stroke-width="1.7"/>
              <path d="m4 7 8 6 8-6"
                stroke="currentColor" stroke-width="1.7"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span data-luo-email-text></span>
          </a>

          <a href="#" data-luo-whatsapp
             data-luo-whatsapp
             target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.3A8.5 8.5 0 1 1 21 11.5Z"
                stroke="currentColor" stroke-width="1.7"
                stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.5 8.3c.4 2.1 2.1 3.8 4.2 4.2l1-1 1.8.9v1.3c0 .5-.4.8-.9.8a8.3 8.3 0 0 1-7.1-7.1c0-.5.3-.9.8-.9h1.3l.9 1.8-1 1Z"
                stroke="currentColor" stroke-width="1.4"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Chat on WhatsApp</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <!-- QUICK LINKS -->
      <nav class="site-footer__nav" aria-label="Footer navigation">
        <h3>Explore</h3>
        <ul>
          <li><a href="/#home">Home</a></li>
          <li><a href="/#about">About us</a></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#technology">Technology</a></li>
          <li><a href="/#portfolio">Our work</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a href="/#testimonials">Testimonials</a></li>
          <li><a href="/#faq">FAQs</a></li>
        </ul>
      </nav>

      <!-- SERVICES -->
      <nav class="site-footer__nav" aria-label="Our services">
        <h3>What we do</h3>
        <ul>
          <li><a href="/#services">Website creation</a></li>
          <li><a href="/#services">Hosting & domain setup</a></li>
          <li><a href="/#services">Maintenance & fixes</a></li>
          <li><a href="/#services">SEO & tracking</a></li>
          <li><a href="/#services">Custom web apps</a></li>
          <li><a href="/#services">Business email setup</a></li>
          <li><a href="/#services">Event landing pages</a></li>
          <li><a href="/#services">Free digital consultation</a></li>
        </ul>
      </nav>

      <!-- CONTACT SUMMARY -->
      <div class="site-footer__location">
        <h3>Let's connect</h3>
        <p>
          Based in <span data-luo-location></span>.
          Supporting small businesses around the world.
        </p>

        <a class="site-footer__email-large"
           href="#" data-luo-email
           data-luo-email>
          letusoptimize@gmail.com
        </a>

        <a class="site-footer__text-link" href="/#faq">
          Have a question?
          <span aria-hidden="true">↗</span>
        </a>
      </div>

    </div>

    <div class="site-footer__divider"></div>

    <!-- COPYRIGHT -->
    <div class="site-footer__bottom">
      <p>
        © <span data-current-year>2026</span>
        <a href="/" data-luo-brand-link>Let Us Optimize</a>.
        All rights reserved.
      </p>

      <a href="/" class="site-footer__back-top" data-scroll-top>
  Back to top
  <span aria-hidden="true">↑</span>
</a>
    </div>

    <!-- OVERSIZED BRAND WORDMARK -->
    <div class="site-footer__wordmark" aria-hidden="true">
      Let Us Optimize<span>.</span>
    </div>

  </div>
</footer>`;

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (footer) footer.outerHTML = footerTemplate;
  }

  function renderHeader() {
    const isHome = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");
    const sectionHref = (id) => isHome ? `#${id}` : `/#${id}`;
    const header = document.querySelector("[data-site-header]");
    if (!header) return;

    header.innerHTML = `
      <div class="site-header__inner">
        <a class="site-header__logo"
           href="/"
           aria-label="${config.brand.name} home">
          <img src="${config.assets.logo}"
               width="138"
               height="50"
               alt="${config.brand.name}">
        </a>

        <button class="site-header__menu-button"
                type="button"
                aria-label="Open navigation menu"
                aria-expanded="false"
                aria-controls="primary-navigation">
          <svg viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>

        <nav class="site-nav"
             id="primary-navigation"
             aria-label="Main navigation">
          <a class="site-nav__link"
             href="/" ${isHome ? 'aria-current="page"' : ""}>Home</a>
          <a class="site-nav__link" href="${sectionHref("about")}">About</a>
          <a class="site-nav__link" href="${sectionHref("services")}">Services</a>
          <a class="site-nav__link" href="${sectionHref("portfolio")}">Our Work</a>
          <a class="site-nav__link" href="${sectionHref("pricing")}">Pricing</a>
          <a class="button site-header__cta"
             href="#" data-luo-whatsapp target="_blank" rel="noopener noreferrer">
            Let's Talk ${arrowIcon}
          </a>
        </nav>
      </div>
    `;

    const menuButton = header.querySelector(
      ".site-header__menu-button"
    );
    const navigation = header.querySelector(".site-nav");

    function closeMenu() {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );
    }

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });
  }

  function renderMetrics() {
    const metrics = document.querySelector("[data-hero-metrics]");
    if (!metrics) return;

    metrics.innerHTML = config.metrics.map((metric) => `
      <article class="metric-card">
        <strong class="metric-card__value">
          ${metric.value}
        </strong>
        <p class="metric-card__label">
          ${metric.label}
        </p>
      </article>
    `).join("");
  }

  
function renderRating() {
  const configRating = config.rating;
  const card = document.querySelector(".about__rating");

  if (!card || configRating.value == null) return;

  const value = card.querySelector("[data-rating-value]");
  const scale = card.querySelector(".about__rating-scale");
  const label = card.querySelector(".about__rating-label");
  const link = card.querySelector(".about__rating-link");
  const stars = card.querySelector(".about__stars");

  value.textContent = Number(configRating.value).toFixed(1);
  scale.textContent = `/ ${configRating.scale}`;
  label.textContent =
    `Google rating · ${configRating.reviewCount} reviews`;

  stars.hidden = false;

  if (configRating.reviewUrl) {
    link.href = configRating.reviewUrl;
    link.textContent = "Read Google reviews";
  } else {
    link.hidden = true;
  }

  
document.querySelectorAll("[data-rating-summary]").forEach((element) => {
  const count = configRating.reviewCount;
  const source = configRating.source || "Google";

  element.textContent = count
    ? `${source} · ${count} reviews`
    : `${source} rating`;
});

}


  document.addEventListener("DOMContentLoaded", () => {
    renderFooter();
    renderHeader();
    applyGlobalContactLinks();
    applyGlobalBusinessDetails();
    renderMetrics();
    renderRating();
  });
})();