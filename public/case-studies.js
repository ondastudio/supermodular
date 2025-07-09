/* *** Flip transition from hero to case studies *** */
const flipEl = document.querySelector("#flip-cases-el");
const flipStart = document.querySelector("#flip-cases-start");
const flipEnd = document.querySelector("#flip-cases-end");

window.addEventListener("load", () => {
  ScrollTrigger.create({
    trigger: ".cases-intro",
    start: "top bottom",
    end: "top top",
    scrub: true,
    //markers: true,
    onEnter: () => {
      const state = Flip.getState(flipEl);
      flipEnd.appendChild(flipEl);

      Flip.from(state, {
        duration: 0.3,
        ease: "power2.inOut",
      });

      flipEnd.classList.add("sticky");
      flipEnd.parentElement.style.alignItems = "flex-end";
    },
    onLeaveBack: () => {
      const state = Flip.getState(flipEl);

      flipEnd.classList.remove("sticky");
      flipEnd.parentElement.style.alignItems = "flex-start";

      flipStart.appendChild(flipEl);

      Flip.from(state, {
        duration: 0.3,
        ease: "power2.inOut",
      });
    },
  });

  /* Hide buttons when it reach the case-studies part*/
  ScrollTrigger.create({
    trigger: ".cases-container",
    start: "top bottom",
    //markers: true,
    onEnter: () => {
      flipEnd.classList.add("hidden");
    },
    onLeaveBack: () => {
      flipEnd.classList.remove("hidden");
    },
  });
});

/* *** Active case study on scroll logic *** */
window.addEventListener("load", () => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    document.querySelectorAll("[data-case-content]").forEach((contentEl) => {
      const number = contentEl.getAttribute("data-case-content");

      ScrollTrigger.create({
        id: "content",
        trigger: contentEl,
        start: "top center",
        end: "bottom center",
        //markers: true,
        onEnter: () => setActiveMenu(number),
        onEnterBack: () => setActiveMenu(number),
      });
    });

    function setActiveMenu(activeNumber) {
      document.querySelectorAll("[data-case-menu]").forEach((menu) => {
        const isActive = menu.getAttribute("data-case-menu") === activeNumber;

        menu.classList.toggle("active", isActive);

        if (isActive) {
          menu.querySelector(".button").classList.remove("disable");
        } else {
          menu.querySelector(".button").classList.add("disable");
        }
      });
    }
  } else {
    document.querySelectorAll("[data-case-menu]").forEach((menu) => {
      menu.classList.add("active");
      menu.querySelector(".button").classList.remove("disable");
    });
  }
});

/* *** Videos Swiper + Details animation *** */
//remove slides that are hidden from DOM
document.querySelectorAll(".swiper-slide").forEach((slide) => {
  slide.querySelectorAll(".w-condition-invisible").forEach((el) => el.remove());

  //after cleanup, if slide is empty (no child elements), remove the slide
  if (slide.children.length === 0) {
    slide.remove();
  }
});

//get all different cases and create swipers for each
const caseStudies = document.querySelectorAll(".case-study");

caseStudies.forEach((section) => {
  const videoSwiperEl = section.querySelector(".swiper.videos");
  const labelSwiperEl = section.querySelector(".swiper.labels");
  const paginationEl = section.querySelector(".swiper-pagination");
  const tabsEl = section.querySelector(".cases-tabs");
  const tabVideos = section.querySelector('[data-w-tab="Videos"]');
  const tabDetails = section.querySelector('[data-w-tab="Details"]');

  if (!videoSwiperEl || !labelSwiperEl) {
    console.warn("Missing .videos or .labels swiper in", section);
    return;
  }

  const videoSwiper = new Swiper(videoSwiperEl, {
    slidesPerView: 1,
    pagination: {
      el: paginationEl,
      clickable: true,
      renderBullet: function (index, className) {
        return `
          <span class="${className} custom-bullet">
            <svg viewBox="0 0 20 20" class="progress-ring">
              <circle class="progress-ring__circle" cx="10" cy="10" r="9" />
            </svg>
          </span>`;
      },
    },
  });

  const labelsSwiper = new Swiper(labelSwiperEl, {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
  });

  //sync both swipers like thumbnails
  videoSwiper.controller.control = labelsSwiper;

  //handle video playback on init and slide change
  videoSwiper.on("init", () => handleSlideChange(videoSwiper));
  videoSwiper.on("slideChange", () => handleSlideChange(videoSwiper));

  //trigger videos logic with scrollTrigger - manually trigger init logic (Swiper doesn't call `init` automatically)
  window.addEventListener("load", () => {
    //tabs order change == switch logic here

    // ScrollTrigger.create({
    //   trigger: tabsEl,
    //   start: "top center",
    //   //markers: true,
    //   onEnter: () => {
    //     handleSlideChange(videoSwiper);
    //   },
    // });

    // //run gsap animation when clicking on details tab
    // tabDetails.addEventListener("click", () => {
    //   const rows = section.querySelectorAll(".cases-details_row");

    //   gsap.to(rows, {
    //     opacity: 1,
    //     duration: 1,
    //     stagger: 0.4,
    //     ease: "power2.out",
    //   });
    // });

    const rows = section.querySelectorAll(".cases-details_row");

    ScrollTrigger.create({
      trigger: tabsEl,
      start: "top center",
      onEnter: () => {
        gsap.to(rows, {
          opacity: 1,
          duration: 1,
          stagger: 0.4,
          ease: "power2.out",
        });
      },
    });

    tabVideos.addEventListener("click", () => {
      setTimeout(() => {
        handleSlideChange(videoSwiper);
        labelsSwiper.update();
      }, 500);
    });
  });

  // function handleSlideChange(swiper) {
  //   const slides = swiper.slides;
  //   const currentIndex = swiper.activeIndex;

  //   slides.forEach((slide, index) => {
  //     const video = slide.querySelector("video");
  //     if (!video) return;

  //     video.pause();
  //     video.currentTime = 0;

  //     if (index === currentIndex) {
  //       video.play().catch((err) => {
  //         console.warn("Autoplay failed:", err);
  //       });

  //       //advance slide when video ends or restart
  //       video.onended = () => {
  //         if (swiper.activeIndex === swiper.slides.length - 1) {
  //           //restart
  //           swiper.slideTo(0);
  //         } else {
  //           swiper.slideNext();
  //         }
  //       };
  //     } else {
  //       //clean up event listener from previous videos
  //       video.onended = null;
  //     }
  //   });
  // }

  function handleSlideChange(swiper) {
    const slides = swiper.slides;
    const currentIndex = swiper.activeIndex;

    // Clear any previously set timeout
    if (swiper.imageAutoplayTimeout) {
      clearTimeout(swiper.imageAutoplayTimeout);
      swiper.imageAutoplayTimeout = null;
    }

    const bullets = swiper.pagination?.el?.querySelectorAll(".custom-bullet");
    const totalLength = 56.5;

    // Reset all bullets
    bullets?.forEach((bullet, index) => {
      const circle = bullet.querySelector(".progress-ring__circle");
      if (circle) {
        circle.style.animation = "none";
        circle.style.strokeDasharray = totalLength;
        circle.style.strokeDashoffset = totalLength;
      }
    });

    const currentBullet = bullets?.[currentIndex];
    const currentCircle = currentBullet?.querySelector(
      ".progress-ring__circle"
    );

    slides.forEach((slide, index) => {
      const video = slide.querySelector("video");
      const image = slide.querySelector("img");

      if (video) {
        video.pause();
        video.currentTime = 0;
        video.onended = null;
      }

      if (index === currentIndex) {
        if (video) {
          video
            .play()
            .then(() => {
              const duration = video.duration * 1000;

              currentBullet?.style.setProperty(
                "--bullet-timer",
                `${duration}ms`
              );
              if (currentCircle) {
                currentCircle.offsetHeight; // reflow
                currentCircle.style.animation =
                  "draw-circle var(--bullet-timer) linear forwards";
              }

              video.onended = () => {
                if (swiper.activeIndex === swiper.slides.length - 1) {
                  swiper.slideTo(0);
                } else {
                  swiper.slideNext();
                }
              };
            })
            .catch((err) => {
              console.warn("Autoplay failed:", err);
            });
        } else if (image) {
          const fallbackDelay = 5000;
          currentBullet?.style.setProperty(
            "--bullet-timer",
            `${fallbackDelay}ms`
          );
          if (currentCircle) {
            currentCircle.offsetHeight;
            currentCircle.style.animation =
              "draw-circle var(--bullet-timer) linear forwards";
          }

          swiper.imageAutoplayTimeout = setTimeout(() => {
            if (swiper.activeIndex === swiper.slides.length - 1) {
              swiper.slideTo(0);
            } else {
              swiper.slideNext();
            }
          }, fallbackDelay);
        }
      }
    });
  }
});