document.querySelectorAll("[data-case-scroll]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const targetId = trigger.getAttribute("data-case-scroll");
    const targetEl = document.querySelector(
      `[data-case-content="${targetId}"]`
    );

    if (targetEl) {
      const elementTopOffset =
        targetEl.querySelector(".case-scroll-to").getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: elementTopOffset,
        behavior: "smooth",
      });
    }
  });
});