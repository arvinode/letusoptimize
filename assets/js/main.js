/**
 * LET US OPTIMIZE — HOMEPAGE INTERACTIONS
 */
(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function initHeadline() {
    const target = document.querySelector("[data-rotating-text]");
    if (!target) return;

    const phrases = [
      "Web Development",
      "Digital Experiences",
      "Scalable Websites"
    ];

    if (reducedMotion) {
      target.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let characterIndex = phrases[0].length;
    let deleting = true;

    target.textContent = phrases[0];

    function animate() {
      const phrase = phrases[phraseIndex];

      if (deleting) {
        characterIndex = Math.max(0, characterIndex - 1);
        target.textContent = phrase.slice(0, characterIndex);

        if (characterIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          window.setTimeout(animate, 300);
          return;
        }

        window.setTimeout(animate, 36);
        return;
      }

      const nextPhrase = phrases[phraseIndex];
      characterIndex = Math.min(
        nextPhrase.length,
        characterIndex + 1
      );
      target.textContent = nextPhrase.slice(0, characterIndex);

      if (characterIndex === nextPhrase.length) {
        deleting = true;
        window.setTimeout(animate, 1900);
        return;
      }

      window.setTimeout(animate, 65);
    }

    window.setTimeout(animate, 2200);
  }

  function initRevealAnimations() {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window) || reducedMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          instance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    elements.forEach((element) => observer.observe(element));
  }

  function initHashlessAnchorNavigation() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (!link || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
          link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      // The footer's back-to-top control should always work without adding a hash.
      if (link.matches("[data-scroll-top]")) {
        const isHome = window.location.pathname === "/" ||
          window.location.pathname.endsWith("/index.html");

        if (isHome) {
          event.preventDefault();
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
          window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        }
        return;
      }

      const rawHref = link.getAttribute("href");
      if (!rawHref || !rawHref.includes("#")) return;

      const url = new URL(rawHref, window.location.href);
      const isSameDocument = url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (!isSameDocument || !url.hash || url.hash === "#") return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      // Replace rather than push history so the fragment never remains in the address bar.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

      if (link.classList.contains("skip-link")) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeadline();
    initRevealAnimations();
    initHashlessAnchorNavigation();
  });
})();


/* =====================================================
   PRICING PLAN SWITCHER
   ===================================================== */

function initPricingSwitcher() {
  const tabs = document.querySelectorAll("[data-pricing-tab]");
  const panels = document.querySelectorAll("[data-pricing-panel]");

  if (!tabs.length || !panels.length) return;

  function activatePlan(type, moveFocus = false) {
    tabs.forEach((tab) => {
      const active = tab.dataset.pricingTab === type;

      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));

      if (active && moveFocus) {
        tab.focus();
      }
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.pricingPanel !== type;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activatePlan(tab.dataset.pricingTab);
    });

    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;

      activatePlan(tabs[nextIndex].dataset.pricingTab, true);
    });
  });

  activatePlan("business");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPricingSwitcher);
} else {
  initPricingSwitcher();
}


/* =====================================================
   TESTIMONIALS SLIDER
   ===================================================== */

function initTestimonials() {
  const slider = document.querySelector(".testimonial-slider");

  if (!slider) return;

  const viewport = slider.querySelector("[data-testimonial-viewport]");
  const track = slider.querySelector("[data-testimonial-track]");
  const cards = [...slider.querySelectorAll("[data-testimonial-card]")];
  const prevButton = slider.querySelector("[data-testimonial-prev]");
  const nextButton = slider.querySelector("[data-testimonial-next]");
  const pagination = slider.querySelector("[data-testimonial-pagination]");
  const status = slider.querySelector("[data-testimonial-status]");

  if (!viewport || !track || cards.length === 0) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let currentIndex = 0;
  let visibleCards = 2;
  let touchStartX = 0;
  let touchStartY = 0;

  const maxIndex = () => Math.max(0, cards.length - visibleCards);

  function getVisibleCards() {
    return window.matchMedia("(max-width: 680px)").matches ? 1 : 2;
  }

  function createPagination() {
    pagination.replaceChildren();

    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "testimonial-slider__dot";
      dot.setAttribute("aria-label", `Show testimonial group ${i + 1}`);

      dot.addEventListener("click", () => {
        goTo(i);
      });

      pagination.appendChild(dot);
    }
  }

  function updateSlider(announce = false) {
    const card = cards[0];
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap) || 0;

    const cardWidth = card.getBoundingClientRect().width;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex();

    [...pagination.children].forEach((dot, index) => {
      if (index === currentIndex) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    if (announce && status) {
      status.textContent =
        `Showing testimonial group ${currentIndex + 1} of ${maxIndex() + 1}`;
    }
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    updateSlider(true);
  }

  function refreshLayout() {
    const nextVisibleCards = getVisibleCards();

    if (nextVisibleCards !== visibleCards) {
      visibleCards = nextVisibleCards;
      currentIndex = Math.min(currentIndex, maxIndex());
      createPagination();
    }

    updateSlider();
  }

  prevButton.addEventListener("click", () => {
    goTo(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    goTo(currentIndex + 1);
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(currentIndex + 1);
    }
  });

  viewport.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  viewport.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    // Only navigate when the gesture is primarily horizontal.
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    goTo(currentIndex + (deltaX < 0 ? 1 : -1));
  }, { passive: true });

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(refreshLayout);
    resizeObserver.observe(viewport);
  } else {
    window.addEventListener("resize", refreshLayout);
  }

  // Respect reduced-motion preferences.
  function updateMotionPreference() {
    track.style.transition = reducedMotion.matches
      ? "none"
      : "";
  }

  reducedMotion.addEventListener?.("change", updateMotionPreference);

  visibleCards = getVisibleCards();
  createPagination();
  updateMotionPreference();
  updateSlider();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTestimonials);
} else {
  initTestimonials();
}


/* =====================================================
   FAQ ACCORDION
   ===================================================== */

function initFAQ() {
  const faqList = document.querySelector("[data-faq-list]");

  if (!faqList || faqList.dataset.initialized === "true") return;

  faqList.dataset.initialized = "true";

  const items = [...faqList.querySelectorAll(".faq-item")];

  items.forEach((item) => {
    const button = item.querySelector(".faq-item__trigger");
    const answer = item.querySelector(".faq-item__answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const shouldOpen = button.getAttribute("aria-expanded") !== "true";

      items.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(
          ".faq-item__trigger"
        );
        const otherAnswer = otherItem.querySelector(
          ".faq-item__answer"
        );

        if (!otherButton || !otherAnswer) return;

        const isActive = otherItem === item && shouldOpen;

        otherButton.setAttribute("aria-expanded", String(isActive));
        otherItem.classList.toggle("is-open", isActive);
        otherAnswer.hidden = !isActive;
      });
    });
  });
}

/* Run this from your existing initialization flow. */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFAQ);
} else {
  initFAQ();
}


/* =====================================================
   FOOTER UTILITIES
   ===================================================== */

function initFooter() {
  const year = document.querySelector("[data-current-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFooter);
} else {
  initFooter();
}
