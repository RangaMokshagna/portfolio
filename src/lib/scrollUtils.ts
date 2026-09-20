export function scrollToSection(id: string) {
  const targetId = id.replace(/^#/, "");
  const headingWrapper = document.querySelector(`section#${targetId} [data-scroll-target], section#${targetId}`);
  if (!headingWrapper) return;

  const navElement = document.querySelector('header nav');
  const navHeight = navElement ? navElement.getBoundingClientRect().height : 60;
  const NAV_OFFSET = navHeight + 24;

  const calculateTarget = () => {
    return headingWrapper.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  };

  const target = calculateTarget();
  window.scrollTo({ top: target, behavior: "smooth" });

  let checkTimer: ReturnType<typeof setTimeout>;

  const checkScroll = () => {
    clearTimeout(checkTimer);
    
    // Check if we are close to the target
    const currentTarget = calculateTarget();
    if (Math.abs(window.scrollY - currentTarget) > 4) {
      window.scrollTo({ top: currentTarget, behavior: "auto" }); // instant correction
    }
    
    window.removeEventListener("scrollend", checkScroll);
  };

  // Fallback for browsers that don't support scrollend
  checkTimer = setTimeout(() => {
    checkScroll();
  }, 700);

  window.addEventListener("scrollend", checkScroll, { once: true });
}
