/*Equal do landing !! when going live delete landing*/
gsap.registerPlugin(MorphSVGPlugin);

let mm = gsap.matchMedia();

mm.add("(min-width: 480px)", () => {
  const morph = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    defaults: { ease: "power1.inOut", duration: 2 },
  });

  morph
    .to(".path-one", { morphSVG: ".path-two" })
    .to(".path-one", { morphSVG: ".path-three" }, "+=1")
    .to(".path-one", { morphSVG: ".path-four" }, "+=1")
    .to(".path-one", { morphSVG: ".path-five" }, "+=1")
    .to(".path-one", { morphSVG: ".path-six" }, "+=1")
    .to(".path-one", { morphSVG: ".path-one" }, "+=1");
});

mm.add("(max-width: 479px)", () => {
  const morph = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    defaults: { ease: "power1.inOut", duration: 2 },
  });

  morph
    .to(".path-one-mobile", { morphSVG: ".path-two-mobile" })
    .to(".path-one-mobile", { morphSVG: ".path-three-mobile" }, "+=1")
    .to(".path-one-mobile", { morphSVG: ".path-four-mobile" }, "+=1")
    .to(".path-one-mobile", { morphSVG: ".path-five-mobile" }, "+=1")
    .to(".path-one-mobile", { morphSVG: ".path-six-mobile" }, "+=1")
    .to(".path-one-mobile", { morphSVG: ".path-one-mobile" }, "+=1");
});