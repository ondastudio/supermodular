const heroTrigger = document.querySelector(".hero");

window.addEventListener("load", () => {
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroTrigger,
      start: "top top",
      end: () => `+=${heroTrigger.offsetHeight}`, //has to be a function to it gets updated on resize as well
      pin: heroTrigger,
      scrub: true,
      //markers: true,
    },
  });

  heroTl.to("#hero-title", { flexGrow: 1, ease: "none" });
  //.to(".hero-slide-up", { height: "auto", ease: "none" }, ">");
});