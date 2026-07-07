const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const heroCarousel = document.querySelector("[data-hero-carousel]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-label", "Abrir menu");
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (heroCarousel) {
  const images = [...heroCarousel.querySelectorAll("[data-hero-image]")];
  const panels = [...heroCarousel.querySelectorAll("[data-hero-panel]")];
  const controls = [...heroCarousel.querySelectorAll("[data-hero-control]")];
  let currentSlide = 0;
  let slideTimer;

  const setHeroSlide = (index) => {
    currentSlide = index;

    images.forEach((image, imageIndex) => {
      image.classList.toggle("is-active", imageIndex === index);
    });

    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("is-active", panelIndex === index);
    });

    controls.forEach((control, controlIndex) => {
      control.classList.toggle("is-active", controlIndex === index);
    });
  };

  const startHeroCarousel = () => {
    window.clearInterval(slideTimer);
    slideTimer = window.setInterval(() => {
      setHeroSlide((currentSlide + 1) % panels.length);
    }, 6500);
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      setHeroSlide(Number(control.dataset.heroControl));
      startHeroCarousel();
    });
  });

  startHeroCarousel();
}
