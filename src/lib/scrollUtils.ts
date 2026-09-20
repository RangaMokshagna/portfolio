export function scrollToSection(id: string) {
  const targetId = id.replace(/^#/, "");
  const section = document.getElementById(targetId);
  if (!section) return;

  const target = section.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: target, behavior: "smooth" });

  let checkTimer: ReturnType<typeof setTimeout>;

  const checkScroll = () => {
    clearTimeout(checkTimer);

    // Check if the section top is close to 0 (the top of the viewport)
    const rectTop = section.getBoundingClientRect().top;
    if (Math.abs(rectTop) > 4) {
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: "auto" }); // instant correction
    }
    
    window.removeEventListener("scrollend", checkScroll);
  };

  // Fallback for browsers that don't support scrollend
  checkTimer = setTimeout(() => {
    checkScroll();
  }, 700);

  window.addEventListener("scrollend", checkScroll, { once: true });
}
