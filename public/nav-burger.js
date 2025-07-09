const navBurger = document.querySelector(".nav_burger");
const icon = navBurger.querySelector("svg");
const buttons = navBurger.querySelectorAll(".nav_burger-list .button");

let isOpen = false;

if (navBurger) {
  navBurger.addEventListener("click", () => {
    isOpen = !isOpen;

    //rotate the icon
    gsap.to(icon, {
      rotate: isOpen ? 45 : 0,
      duration: 0.2,
      ease: "power2.out",
    });

    //stagger in/out the buttons
    if (isOpen) {
      navBurger.querySelector(".nav_burger-list").style.pointerEvents = "auto";

      gsap.to(buttons, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(buttons, {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          navBurger.querySelector(".nav_burger-list").style.pointerEvents =
            "none";
        },
      });
    }
  });
}