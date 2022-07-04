import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class ScrollEvents {
  constructor() {
    this.experience = window.experience;
    console.log(window);

    this.titleTexts = document.getElementsByClassName("title");
    this.header = document.getElementById("header");
    this.title = document.getElementById("header-title");
    this.subtitle = document.getElementById("header-subtitle");
    this.sideContactIcons = document.getElementById("sideContactIcons");
    this.aboutMeSection = document.getElementById("aboutMe");

    this.onLoadEvent();

    /*Array.from(this.titleTexts).forEach((title) => {
      this.trackerMovement(title, 0.3);
    });*/
    this.movingHeaderIconsContainer();
  }

  onLoadEvent() {
    window.addEventListener("DOMContentLoaded", (event) => {
      gsap.from(this.title, {
        opacity: 0,
        duration: 5,
      });
    });
  }

  trackerMovement(object, power) {
    this.cursor = {};
    this.cursor.x = 0;
    this.cursor.y = 0;
    window.addEventListener("mousemove", (event) => {
      this.cursor.x = event.clientX / experience.sizes.width - 0.5;
      this.cursor.y = event.clientY / experience.sizes.height - 0.5;
      gsap.to(object, { x: -70 * this.cursor.x * power });
      gsap.to(object, { y: -70 * this.cursor.y * power });
    });
  }

  movingHeaderIconsContainer() {
    gsap.to(this.sideContactIcons, {
      scrollTrigger: {
        trigger: this.aboutMeSection,
        start: "50% bottom",
        toggleActions: "play none none reverse",
      },
      right: "1%",
      ease: "Power4.easeOut",
      duration: 1,
    });
  }
}
