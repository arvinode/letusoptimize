/**
 * LET US OPTIMIZE — shared head services.
 * Keep page-specific SEO/social metadata in each HTML file so crawlers and social
 * preview bots can read it without executing JavaScript. This file owns shared
 * Organization schema and optional analytics bootstrap.
 */
(() => {
  const config = window.LUO_CONFIG;
  if (!config) return;

  // Shared document-head resources. Page HTML keeps only page-specific metadata.
  const addLink = (rel, href, extra = {}) => {
    if ([...document.head.querySelectorAll("link")].some((link) => link.rel === rel && link.href === new URL(href, document.baseURI).href)) return;
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    Object.entries(extra).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  };
  addLink("icon", config.assets.favicon || "/favicon.ico");
  addLink("preconnect", config.site.fontOrigin, { crossorigin: "" });
  addLink("stylesheet", config.site.fontStylesheet);
  addLink("stylesheet", "assets/css/global.css");
  const theme = document.querySelector('meta[name="theme-color"]') || document.createElement("meta");
  theme.name = "theme-color";
  theme.content = config.site.themeColor || "#111110";
  if (!theme.parentNode) document.head.appendChild(theme);
  const colorScheme = document.querySelector('meta[name="color-scheme"]') || document.createElement("meta");
  colorScheme.name = "color-scheme";
  colorScheme.content = "light";
  if (!colorScheme.parentNode) document.head.appendChild(colorScheme);

  const addJsonLd = (id, data) => {
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.brand.name,
    "url": config.brand.domain.replace(/\/$/, "") + "/",
    "email": config.contact.email,
    "telephone": config.contact.phone,
    "sameAs": Object.values(config.social).filter(Boolean)
  };
  const address = config.contact.address || {};
  if (address.addressLocality && address.addressRegion && address.addressCountry) {
    org.address = {
      "@type": "PostalAddress",
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "addressCountry": address.addressCountry,
      ...(address.streetAddress ? { "streetAddress": address.streetAddress } : {}),
      ...(address.postalCode ? { "postalCode": address.postalCode } : {})
    };
  }
  addJsonLd("luo-organization-schema", org);

  // Analytics remains inactive until a real ID is added to config.js.
  const tracking = config.site && config.site.tracking;
  if (tracking && tracking.googleTagManagerId && !window.__luoGtmLoaded) {
    window.__luoGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    const gtm = document.createElement("script");
    gtm.async = true;
    gtm.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tracking.googleTagManagerId)}`;
    document.head.appendChild(gtm);
  }
  if (tracking && tracking.ga4MeasurementId && !window.__luoGa4Loaded) {
    window.__luoGa4Loaded = true;
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.ga4MeasurementId)}`;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", tracking.ga4MeasurementId);
  }
})();
