import * as THREE from "three";

export default class Particles {
  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.objectsDistance = 4;
    this.camera = this.experience.camera.instance;

    this.setScrollEvent();
    this.setCursorEvent();
    this.setCameraGroup();
  }

  setScrollEvent() {
    let scrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    });
  }

  setCursorEvent() {
    this.cursor = {};
    this.cursor.x = 0;
    this.cursor.y = 0;
    window.addEventListener("mousemove", (event) => {
      this.cursor.x = event.clientX / experience.sizes.width - 0.5;
      this.cursor.y = event.clientY / experience.sizes.height - 0.5;
    });
  }

  setCameraGroup() {
    this.cameraGroup = new THREE.Group();
    this.experience.scene.add(this.cameraGroup);
    this.cameraGroup.add(this.experience.camera.instance);
  }

  update() {
    this.camera.position.y =
      (-scrollY / experience.sizes.height) * this.objectsDistance;

    this.camera.position.z = (-scrollY / experience.sizes.height) * -5 + 6;

    const parallaxX = this.cursor.x * 0.5;
    const parallaxY = -this.cursor.y * 0.5;
    this.cameraGroup.position.x +=
      (parallaxX - this.cameraGroup.position.x) *
      2 *
      this.experience.time.deltaTime;
    this.cameraGroup.position.y +=
      (parallaxY - this.cameraGroup.position.y) *
      2 *
      this.experience.time.deltaTime;
  }
}
