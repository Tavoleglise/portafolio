import * as THREE from "three";
import Environment from "./Environment";
import FloatingObjects from "./FloatingObjects";
import Particles from "./Particles.js";
import CameraAnimation from "./CameraAnimation.js";
import Text3d from "./Text3d";
import LoadingScreen from "../Hud/LoadingScreen";

export default class World {
  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.parameters = {
      materialColor: "#ffeded",
    };
    this.loadingScreen = new LoadingScreen(this.resources.toLoad);

    this.resources.on("item loaded", () => {
      this.loadingScreen.setItemsLoaded(this.resources.loaded);
      this.loadingScreen.itemLoaded();
    });
    //wait for resourses
    this.resources.on("ready", () => {
      console.log("resources are ready");
      //Setup
      this.environment = new Environment();
      this.floatingObjects = new FloatingObjects();
      this.text3d = new Text3d(this.floatingObjects.objectsDistance);
      this.particles = new Particles(
        this.floatingObjects.objectsDistance,
        this.floatingObjects.sectionMeshes
      );
    });
    this.cameraAnimation = new CameraAnimation();
  }

  update() {
    if (this.floatingObjects) this.floatingObjects.update();
    if (this.cameraAnimation) this.cameraAnimation.update();
    if (this.text3d) this.text3d.update();
  }

  resize() {
    if (this.floatingObjects) this.floatingObjects.resize();
    if (this.text3d) this.text3d.resize();
  }
}
