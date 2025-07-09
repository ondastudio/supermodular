//logo morph timeline
let morph = gsap.timeline({
  repeat: -1,
  repeatDelay: 0,
  defaults: { ease: "power2.inOut", duration: 1 }, // Set shared settings
});

morph
  .to("#logo1", { morphSVG: "#logo2" })
  .to("#logo1", { morphSVG: "#logo3" })
  .to("#logo1", { morphSVG: "#logo4" })
  .to("#logo1", { morphSVG: "#logo5" })
  .to("#logo1", { morphSVG: "#logo6" })
  .to("#logo1", { morphSVG: "#logo1" });

const isMobile = window.innerWidth <= 768;

if (isMobile) {
  const svg = document.querySelector("#logo-hide");
  const morphLogo = document.querySelector(".logo-morph");
  let isHidden = false;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 100 && !isHidden) {
      isHidden = true;

      // Step 1: Fade out original logo
      gsap.to(svg, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // Step 2: Collapse original logo width
          gsap.to(svg, {
            width: 0,
            duration: 0.3,
            onComplete: () => {
              // Step 3: Fade in the .logo-morph
              gsap.to(morphLogo, {
                opacity: 1,
                duration: 0.3,
              });

              morph.play();
            },
          });
        },
      });
    }

    if (scrollY <= 100 && isHidden) {
      isHidden = false;

      // Step 1: Hide .logo-morph
      gsap.to(morphLogo, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // Step 2: Expand original logo width
          gsap.to(svg, {
            width: "100%", // or your original width like "150px"
            duration: 0.3,
            onComplete: () => {
              // Step 3: Fade in original logo
              gsap.to(svg, {
                opacity: 1,
                duration: 0.3,
              });
            },
          });
        },
      });
    }
  });
}