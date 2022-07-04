import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World.js";
import Resources from "./Utils/Resources";
import sources from "./sources.js";
import ScrollEvents from "./Hud/ScrollEvents.js";
import MenuControllerFloating from "./Hud/MenuControllerFloating.js";
import AnimationInterface from "./Hud/AnimationInterface.js";

export default class Experience {
  constructor(canvas) {
    //Global acccess
    window.experience = this;

    //Options
    this.canvas = canvas;

    //Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    //Setup elementos graficos
    this.ScrollEvents = new ScrollEvents();
    this.MenuControllerFloating = new MenuControllerFloating();
    this.AnimationInterface = new AnimationInterface();

    //Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    //tick
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
    this.MenuControllerFloating.update();
  }
}
