import gsap from "gsap";

export default class LoadingScreen {
  constructor(toLoad) {
    this.bar = document.getElementById("loadingBar");
    this.loadingScreenElement = document.getElementById("loadingScreen");
    this.itemsLoaded = 0;
    this.itemsToLoad = toLoad;
  }
  itemLoaded() {
    const progressRatio = this.itemsLoaded / (this.itemsToLoad - 1);
    console.log(progressRatio);
    this.bar.style.transform = `scaleX(${progressRatio})`;
    if (this.itemsLoaded === this.itemsToLoad - 1) {
      this.itemsFinished();
    }
  }
  itemsFinished() {
    gsap.to(this.loadingScreenElement, { autoAlpha: 0, duration: 1 });
    console.log("llego a 0");
  }
  setItemsLoaded(num) {
    this.itemsLoaded = num;
  }
}
