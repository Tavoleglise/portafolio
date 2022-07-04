import gsap from "gsap";

export default class AnimationInterface {
  constructor() {
    this.animatedButtons = [];

    this.animatedButtons = [].slice.call(
      document.getElementsByClassName("animationButton")
    );

    this.animatedButtons.forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        gsap.to(e.target, { scale: 1.3 });
      });
      el.addEventListener("mouseleave", (e) => {
        gsap.to(e.target, { scale: 1 });
      });
    });
  }
}
