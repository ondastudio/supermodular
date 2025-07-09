const loadingEl = document.querySelector(".loading");
const percentageEl = document.querySelector("#percentage");

//check if the user has already visited the homepage during this session
if (!sessionStorage.getItem("hasVisitedHomepage")) {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  //force scroll to the top on page load
  window.scrollTo(0, 0);
  lenis.stop();

  //morph logo animation
  let loadingMorph = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    defaults: { ease: "power2.inOut", duration: 1 },
  });

  loadingMorph
    .to("#loading1", { morphSVG: "#loading2" })
    .to("#loading1", { morphSVG: "#loading3" })
    .to("#loading1", { morphSVG: "#loading4" })
    .to("#loading1", { morphSVG: "#loading5" })
    .to("#loading1", { morphSVG: "#loading6" })
    .to("#loading1", { morphSVG: "#loading1" });

  //loading animation itself
  gsap.to(loadingEl.querySelector(".loading-wrapper"), {
    opacity: 1,
    duration: 0.2,
    delay: 0.2,
    onComplete() {
      //step 2: animate the percentage counter
      gsap.fromTo(
        percentageEl,
        { innerText: 0 },
        {
          innerText: 100,
          duration: 4,
          ease: "expo.inOut",
          roundProps: "innerText",
          onUpdate() {
            const val = Math.round(gsap.getProperty(percentageEl, "innerText"));
            percentageEl.innerText = val;
          },
          onComplete() {
            //step 3: fade out and remove the loading screen
            loadingEl.classList.add("fade-out");

            gsap.to(loadingEl, {
              opacity: 0,
              duration: 1,
              delay: 1,
              onComplete() {
                loadingEl.style.display = "none";
                loadingEl.remove();
                lenis.start();
                ScrollTrigger.refresh();
              },
            });
          },
        }
      );
    },
  });

  sessionStorage.setItem("hasVisitedHomepage", "true"); // flag in sessionStorage to remember the user has visited
} else {
  // User has visited the homepage during this session, no animation
  console.log("User has already visited the homepage during this session.");
  loadingEl.remove();
}