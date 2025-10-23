// src/scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Wrap each letter of title in span
  const title = document.querySelector(".hero-title");
  title.innerHTML = title.textContent.replace(/\S/g, "<span>$&</span>");

  // Wrap each word of subtitle in span
  const subtitle = document.querySelector(".hero-subtitle");
  subtitle.innerHTML = subtitle.textContent.replace(/\S+/g, "<span>$&</span>");

  // Initial states
  gsap.set(".barbell-img", { y: -120, opacity: 0 });
  gsap.set(".hero-title span", { opacity: 0, y: 50 });
  gsap.set(".hero-subtitle span", { opacity: 0, y: 30 });

  // Timeline for hero animation
  const tl = gsap.timeline();

  // Title: letters slide up + fade
  tl.to(".hero-title span", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
  });

  // Subtitle: words slide up + fade
  tl.to(
    ".hero-subtitle span",
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    },
    "-=0.5"
  );

  // Barbell drop animation (independent, after text animates in)
  tl.to(
    ".barbell-img",
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "bounce.out",
    },
    "+=0.8"
  );

  // Navigation drawer logic (unchanged)
  const navToggle = document.getElementById("nav-toggle");
  const navDrawer = document.getElementById("nav-drawer");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".gsap-nav-link");
  let isOpen = false;

  gsap.set(navDrawer, { y: "-100vh" });

  function openDrawer() {
    navOverlay.classList.remove("hidden");
    navDrawer.classList.remove("translate-x-full");
    navDrawer.classList.add("translate-x-0");
    gsap.to(navDrawer, { y: 0, duration: 0.22, ease: "power2.out" });

    // Navigation links: fade in, slide up, and scale up for a pop effect
    gsap.fromTo(
      navLinks,
      { opacity: 0, y: 40, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.12,
        ease: "back.out(1.7)",
        delay: 0.1,
      }
    );
    isOpen = true;
  }

  function closeDrawer() {
    gsap.to(navDrawer, {
      y: "-100vh",
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        navDrawer.classList.remove("translate-x-0");
        navDrawer.classList.add("translate-x-full");
        navOverlay.classList.add("hidden");
        navLinks.forEach((link) => {
          link.style.opacity = "";
          link.style.transform = "";
        });
      },
    });
    isOpen = false;
  }

  navToggle.addEventListener("click", () => {
    if (!isOpen) openDrawer();
    else closeDrawer();
  });

  navOverlay.addEventListener("click", closeDrawer);

  // ========== Animate category cards on scroll
  // Register ScrollTrigger (safe guard)
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Smooth GSAP scroll animations for category cards (reverse on scroll back)
  gsap.utils.toArray(".category-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 40, scale: 0.98, rotateX: 8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.82,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          toggleActions: "play reverse none reverse", // play on enter, reverse on leave/enterBack
          // markers: true, // uncomment to debug timing
        },
      }
    );
  });

  // Before/After compare slider control (clean, updates only CSS var)
  (function () {
    const wrap = document.querySelector(".compare-wrap");
    if (!wrap) return;
    const range = wrap.querySelector(".compare-range");
    const handle = wrap.querySelector(".compare-handle");

    // clamp helper
    const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

    function setPercent(p) {
      p = clamp(p);
      // update only the CSS variable — CSS handles width & handle position
      wrap.style.setProperty("--compare-percent", p + "%");
      // keep range in sync
      if (range) range.value = Math.round(p);
    }

    // range input control
    if (range)
      range.addEventListener("input", (e) => setPercent(e.target.value));

    // click on wrapper to move slider
    wrap.addEventListener("click", (e) => {
      const rect = wrap.getBoundingClientRect();
      const p = ((e.clientX - rect.left) / rect.width) * 100;
      setPercent(p);
    });

    // drag support for handle (pointer events)
    let dragging = false;
    handle.style.touchAction = "none";
    handle.addEventListener("pointerdown", (e) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const rect = wrap.getBoundingClientRect();
      const p = ((e.clientX - rect.left) / rect.width) * 100;
      setPercent(p);
    });
    window.addEventListener("pointerup", (e) => {
      if (!dragging) return;
      dragging = false;
      try {
        handle.releasePointerCapture(e.pointerId);
      } catch {}
    });

    // init (reads initial range value or default 50)
    setPercent(range ? range.value : 50);
  })();

  // Initialize BeerSlider (before/after plugin)
  try {
    if (typeof BeerSlider !== "undefined") {
      // read start from data-beer-start or default to 50
      const el = document.getElementById("beer-slider");
      if (el)
        new BeerSlider(el, { start: parseInt(el.dataset.beerStart || 50, 10) });
    }
  } catch (err) {
    // fail silently if plugin not loaded
    // console.error("BeerSlider init error:", err);
  }

  // Newsletter form handler (simple client-side only)
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const msg = document.getElementById("newsletter-msg");

  if (form && emailInput && msg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        msg.textContent = "Please enter a valid email address.";
        msg.classList.add("show");
        msg.classList.remove("text-green-400");
        msg.classList.add("text-red-400");
        return;
      }

      // TODO: replace with real API call
      // simulate success
      msg.textContent = "Thanks! Check your inbox to confirm subscription.";
      msg.classList.add("show");
      msg.classList.remove("text-red-400");
      msg.classList.add("text-green-400");
      form.reset();
    });
  }
});
