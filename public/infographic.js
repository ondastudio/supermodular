window.addEventListener("load", () => {
  let infographicSvgs;

  if (window.innerWidth > 991) {
    infographicSvgs = document.querySelectorAll(
      ".infographic-desktop .infographic-img"
    );
  } else if (window.innerWidth > 767) {
    infographicSvgs = document.querySelectorAll(
      ".infographic-tablet .infographic-img"
    );
  } else {
    infographicSvgs = document.querySelectorAll(
      ".infographic-mobile .infographic-img"
    );
  }

  const infographicTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".infographic",
      start: "top top",
      end: "+=200%",
      scrub: true,
      pin: true,
      //markers: true,
    },
  });

  infographicSvgs.forEach((img, index) => {
    infographicTl.to(img, { opacity: 1, duration: 1 }, index); // fade in
    if (index > 0) {
      infographicTl.to(
        infographicSvgs[index - 1],
        { opacity: 0, duration: 1 },
        index
      ); // fade out previous
    }
  });
});