const sections = document.querySelectorAll(".section, .hero");

sections.forEach((el, idx) => {
  el.classList.add("reveal");
  el.style.animationDelay = `${idx * 120}ms`;
});
