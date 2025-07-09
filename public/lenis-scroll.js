//used on privacy policy page
document.querySelectorAll('[data="lenis-allow-scroll"]').forEach((el) => {
  el.addEventListener(
    "wheel",
    function (e) {
      e.stopPropagation(); // Impede o Lenis de interferir no scroll interno
    },
    { passive: false }
  );
});