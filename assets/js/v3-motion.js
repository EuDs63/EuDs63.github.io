(() => {
  "use strict";
  if (!Element.prototype.animate || !("IntersectionObserver" in window)) return;

  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const seen = new WeakSet();
  const running = new Map();
  const targets = Array.from(document.querySelectorAll(
    ".book-margin, .opening-page h1, .book-contents, .book-shelf, " +
    ".page-heading, .article-heading"
  ));
  let observer;

  function finish(element) {
    seen.add(element);
    observer?.unobserve(element);
    running.get(element)?.cancel();
    running.delete(element);
  }

  function reveal(element, delay = 0) {
    if (seen.has(element)) return;
    seen.add(element);
    observer?.unobserve(element);
    if (preference.matches || document.visibilityState !== "visible" || element.contains(document.activeElement)) return;
    const title = element.matches(".opening-page h1");
    const subject = element;
    const frames = [{ opacity: 0, transform: `translateY(${title ? 12 : 6}px)` }, { opacity: 1, transform: "translateY(0)" }];
    if (!subject) return;
    element.classList.add("is-entered");
    const animation = subject.animate(frames, {
      duration: title ? 600 : 400,
      delay,
      easing: "cubic-bezier(.22, 1, .36, 1)",
      fill: "backwards"
    });
    animation.id = "v3-enter";
    running.set(element, animation);
    animation.onfinish = animation.oncancel = () => running.delete(element);
  }

  function stop() {
    observer?.disconnect();
    running.forEach(animation => animation.cancel());
    running.clear();
  }

  function observe(initial = false) {
    if (preference.matches || document.visibilityState !== "visible") return;
    observer?.disconnect();
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    const navigation = performance.getEntriesByType("navigation")[0];
    if (navigation?.type === "back_forward") {
      targets.forEach(finish);
      stop();
      return;
    }
    const intro = initial && !location.hash && window.scrollY < 8 &&
      navigation?.type !== "back_forward" && performance.now() < 1200;
    targets.forEach(element => {
      if (seen.has(element)) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.top < innerHeight) {
        if (intro && bounds.bottom > 0) {
          const delay = element.matches(".book-margin") ? 60 : 0;
          reveal(element, delay);
        } else seen.add(element);
      } else observer.observe(element);
    });
  }

  // Keyboard focus, printing and history restoration must never wait for an entrance.
  document.addEventListener("focusin", event => {
    targets.forEach(element => { if (element.contains(event.target)) finish(element); });
  });
  preference.addEventListener?.("change", () => { stop(); if (!preference.matches) observe(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else observe(); });
  window.addEventListener("beforeprint", () => { targets.forEach(finish); stop(); });
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", event => { if (event.persisted) { targets.forEach(finish); stop(); } });
  observe(true);
})();
