import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class Text3d {
  constructor(objectDistance) {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.objectDistance = objectDistance;
    this.camera = this.experience.camera.instance;

    this.texts = ["HTML5", "CSS", "Javascript", "React Js", "Three Js"];

    this.text = new THREE.Object3D();
    this.texts3d = [];

    this.text3dGroup = new THREE.Group();
    this.text3dGroup.position.y = -this.objectDistance * 2;
    this.text3dGroup.position.x = 2;
    this.text3dGroup.position.z = 10;
    this.scene.add(this.text3dGroup);
    const fontLoader1 = new FontLoader();
    this.texts3d = this.texts.map((text, index) => {
      fontLoader1.load("/fonts/helvetiker_regular.typeface.json", (font) => {
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: 0.2,
          height: 0.2,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 4,
        });
        textGeometry.center();

        const textMaterial = new THREE.MeshMatcapMaterial({
          matcap: this.resources.items.matcap,
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        const angle = (1 / this.texts.length) * index * Math.PI * 2;
        const x = Math.cos(angle) * 1; // Get the x position using cosinus
        const z = Math.sin(angle) * 1;
        const y = (index - this.texts.length / 2) * 0.3;

        textMesh.position.set(x, y, z);

        this.text3dGroup.add(textMesh);
      });
    });
    if (this.experience.sizes.width <= 992) {
      this.setMobilePositions();
    }
  }
  setMobilePositions() {
    //this.text3dGroup.position.x = 0;
    //this.text3dGroup.position.y = -this.objectDistance * 2 - 1;
    this.scene.remove(this.text3dGroup);
  }
  update() {}
  resize() {
    if (this.experience.sizes.width <= 992) {
      this.setMobilePositions();
    }
  }
}
