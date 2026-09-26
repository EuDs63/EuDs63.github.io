(() => {
  "use strict";
  const nav = document.querySelector("#main-nav");
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll("a"));
  const desktop = matchMedia("(min-width: 701px)");
  const indicator = document.createElement("span");
  indicator.className = "nav-indicator";
  indicator.setAttribute("aria-hidden", "true");
  nav.append(indicator);
  let pointed = null;
  function update() {
    if (!desktop.matches) {
      nav.removeAttribute("data-indicator-ready");
      return;
    }
    const focused = links.find(link => link === document.activeElement);
    const link = focused || pointed || links.find(link => link.hasAttribute("aria-current"));
    nav.setAttribute("data-indicator-ready", "");
    if (!link) { indicator.style.opacity = "0"; return; }
    const parent = nav.getBoundingClientRect(), bounds = link.getBoundingClientRect();
    indicator.style.width = bounds.width + "px";
    indicator.style.transform = `translateX(${bounds.left - parent.left}px)`;
    indicator.style.opacity = "1";
  }
  links.forEach(link => link.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") { pointed = link; update(); }
  }));
  nav.addEventListener("pointerleave", () => { pointed = null; update(); });
  nav.addEventListener("focusin", update);
  nav.addEventListener("focusout", () => requestAnimationFrame(update));
  desktop.addEventListener?.("change", () => { pointed = null; update(); });
  window.addEventListener("resize", update, { passive: true });
  document.fonts?.ready.then(update);
  update();
})();
