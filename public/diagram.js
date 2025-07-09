const diagramToggle = document.querySelector("#diagram-toggle");

// On-off button
diagramToggle.addEventListener("click", function () {
  diagramToggle.classList.toggle("is-active");

  document.querySelectorAll(".diagram_progress").forEach((el) => {
    el.classList.toggle("is-active");
  });

  document
    .querySelector(".diagram_connector.last")
    .classList.toggle("is-active");

  document.querySelectorAll(".diagram_connector.is-yellow").forEach((el) => {
    el.classList.toggle("is-active");
  });

  document
    .querySelector(".diagram_title.bg-yellow")
    .classList.toggle("disable");
});

window.addEventListener("load", () => {
  const diagramTrigger = document.querySelector(".technology-diagram");

  //fade in when hits the center of the viewport
  gsap.to(diagramTrigger, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: diagramTrigger,
      start: "top center",
      //markers: true,
    },
  });

  //pin when diagram reaches top of viewport and trigger click
  let hasClicked = false;

  ScrollTrigger.create({
    trigger: diagramTrigger,
    start: "top top",
    //end: "bottom center",
    //pin: ".technology",
    //markers: true,
    onEnter: () => {
      if (!hasClicked) {
        diagramToggle?.click();
        hasClicked = true;
      }
    },
  });
});