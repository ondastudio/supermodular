window.addEventListener("load", () => {
  const isMobile = window.innerWidth <= 767;
  const cards = document.querySelectorAll(".box-model.bg-white.is-ai-right");
  const totalCards = cards.length;

  //morph animation
  let aiMorph = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    defaults: { ease: "power2.inOut", duration: 1 },
    paused: true,
  });

  aiMorph
    .to("#ai-morph1", { morphSVG: "#ai-morph2" })
    .to("#ai-morph1", { morphSVG: "#ai-morph3" })
    .to("#ai-morph1", { morphSVG: "#ai-morph4" })
    .to("#ai-morph1", { morphSVG: "#ai-morph5" })
    .to("#ai-morph1", { morphSVG: "#ai-morph6" })
    .to("#ai-morph1", { morphSVG: "#ai-morph1" });

  //set all cards to 100% height initially
  cards.forEach((card) => gsap.set(card, { height: "100%" }));

  if (isMobile) {
    ScrollTrigger.create({
      id: "ai-collapse-sequence",
      trigger: ".ai-sticky_wrapper",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      //markers: true,
      onUpdate: (self) => {
        const segment = 1 / totalCards;

        cards.forEach((card, index) => {
          const progress = (self.progress - segment * index) / segment;
          const clamped = Math.min(Math.max(progress, 0), 1);
          gsap.set(card, { height: `${100 - clamped * 100}%` });
        });
      },
    });
  } else {
    //desktop
    cards.forEach((card, index) => {
      gsap.to(card, {
        height: "25%",
        ease: "none",
        scrollTrigger: {
          id: `ai-card-${index + 1}`,
          trigger: ".ai-sticky_wrapper",
          start: "top top",
          end: "bottom-=30% bottom",
          scrub: true,
          //markers: true,
        },
      });
    });

    // SUMMARY CARD ANIMATION
    gsap.fromTo(
      ".ai-cards_wrapper",
      { yPercent: 0 },
      {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".ai-sticky_wrapper",
          start: "bottom-=25% bottom",
          end: "bottom bottom",
          scrub: true,
          //markers: true,
        },
      }
    );
  }

  // Morph Animation Trigger
  ScrollTrigger.create({
    trigger: ".box-summary",
    start: isMobile ? "top bottom" : "top-=90% center",
    once: true,
    //markers: true,
    onEnter: () => {
      aiMorph.play();
    },
  });
});