window.addEventListener("load", () => {
  const isDesktop = window.innerWidth >= 768;

  if (isDesktop) {
    gsap.fromTo(
      ".how-we-do-it_wrapper",
      { y: "100%" },
      {
        y: "0%",
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".how-we-do-it-sticky",
          start: "top 30%",
          end: "top top",
          scrub: true,
        },
      }
    );

    ScrollTrigger.create({
      id: "how-we-do-it",
      trigger: ".how-we-do-it-sticky",
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress < 0.05) {
          $("[how-mask='1']").removeClass("is-active");

          $("[how-tag='1']").addClass("is-closed");
          $("[how-tag='1']").removeClass("is-active");
          $("[how-tag='2']").addClass("is-closed");
          $("[how-tag='2']").removeClass("is-active");
          $("[how-tag='3']").addClass("is-closed");
          $("[how-tag='3']").removeClass("is-active");
        }
        if (progress > 0.05 && progress < 0.35) {
          //opens first one
          $("[how-mask='1']").addClass("is-active");
          $("[how-mask='2']").removeClass("is-active");
          $("[how-mask='3']").removeClass("is-active");
          //
          $("[how-tag='1']").removeClass("is-closed");
          $("[how-tag='1']").addClass("is-active");

          $("[how-tag='2']").removeClass("is-closed");
          $("[how-tag='2']").removeClass("is-active");

          $("[how-tag='3']").removeClass("is-closed");
          $("[how-tag='3']").removeClass("is-active");
        }

        if (progress >= 0.35 && progress < 0.75) {
          //opens second one
          $("[how-mask='1']").removeClass("is-active");
          $("[how-mask='2']").addClass("is-active");
          $("[how-mask='3']").removeClass("is-active");
          //
          $("[how-tag='1']").removeClass("is-closed");
          $("[how-tag='1']").removeClass("is-active");

          $("[how-tag='2']").removeClass("is-closed");
          $("[how-tag='2']").addClass("is-active");

          $("[how-tag='3']").removeClass("is-closed");
          $("[how-tag='3']").removeClass("is-active");
        }

        if (progress >= 0.75) {
          //opens third one
          $("[how-mask='1']").removeClass("is-active");
          $("[how-mask='2']").removeClass("is-active");
          $("[how-mask='3']").addClass("is-active");
          //
          $("[how-tag='1']").removeClass("is-closed");
          $("[how-tag='1']").removeClass("is-active");

          $("[how-tag='2']").removeClass("is-closed");
          $("[how-tag='2']").removeClass("is-active");

          $("[how-tag='3']").removeClass("is-closed");
          $("[how-tag='3']").addClass("is-active");
        }
      },
    });

    // Scroll to specific progress based on tag clicks
    const scrollToStep = (progress) => {
      const st = ScrollTrigger.getById("how-we-do-it");
      if (!st) return;
      const scrollPos = st.start + (st.end - st.start) * progress;
      gsap.to(window, {
        scrollTo: { y: scrollPos },
        duration: 1,
        ease: "power1.inOut",
      });
    };

    $("[how-tag='1']").on("click", () => scrollToStep(0.1));
    $("[how-tag='2']").on("click", () => scrollToStep(0.5));
    $("[how-tag='3']").on("click", () => scrollToStep(0.9));
  } else {
    //mobile
    $("[how-mask]").addClass("is-active");
    $("[how-tag]").removeClass("is-closed");
    $("[how-button-mask]").removeClass("is-closed");
  }
});