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
  gsap.utils.toArray(".category-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.1,
      ease: "power3.out",
    });
  });
});
