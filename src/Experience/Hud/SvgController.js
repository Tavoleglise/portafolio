import gsap from "gsap";

export default class SvgController {
  constructor() {
    this.maskSkill1 = document.getElementById("mask1");
    this.maskSkill2 = document.getElementById("mask2");
    this.maskSkill3 = document.getElementById("mask3");
    this.setTimeline();
  }

  setTimeline() {
    //let tween = gsap.to(this.mask, { x: 400 });
    this.timelineSkillBars = gsap.timeline();
    this.timelineSkillBars

      .to(this.maskSkill1, { x: 400, duration: 1, ease: "elastic" })

      .to(this.maskSkill2, { x: 300, duration: 1, ease: "elastic" })

      .to(this.maskSkill3, { x: 200, duration: 1, ease: "elastic" });
  }
}
