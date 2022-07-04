import * as THREE from "three";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default class FloatingObjects {
  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.objectsDistance = 4;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMeshes();

    if (this.experience.sizes.width <= 992) {
      this.setMobilePositions();
    }
  }
  setGeometry() {
    this.geometryObject1 = new THREE.TorusGeometry(1, 0.4, 16, 60);
    this.geometryObject2 = new THREE.ConeGeometry(1, 2, 32);
    this.geometryObject3 = new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16);
    this.astronaut = this.experience.resources.items.astronaut;
    this.robot = this.experience.resources.items.robot.scene;
    this.monitor = this.experience.resources.items.monitor.scene;
    this.mouse = this.experience.resources.items.mouse.scene;
    this.pc = this.experience.resources.items.pc.scene;
    this.paper_plane = this.experience.resources.items.paper_plane.scene;
    this.space_ship = this.experience.resources.items.space_ship.scene;
  }
  setTexture() {
    this.resources.items.gradientTexture.magFilter = THREE.NearestFilter;
    this.textureObject1 = this.resources.items.gradientTexture;
  }
  setMaterial() {
    const parameters = {
      materialColor: "#ffeded",
    };
    this.material = new THREE.MeshToonMaterial({
      color: this.experience.world.parameters.materialColor,
      gradientMap: this.textureObject1,
    });
  }
  setMeshes() {
    this.mesh1 = new THREE.Mesh(this.geometryObject1, this.material);
    this.mesh2 = new THREE.Mesh(this.geometryObject2, this.material);
    this.mesh3 = new THREE.Mesh(this.geometryObject3, this.material);

    this.monitor.scale.set(0.7, 0.7, 0.7);
    this.monitor.position.x = 0;
    this.monitor.rotation.z = Math.PI / 4;

    this.mouse.position.x = 1.5;
    this.mouse.scale.set(0.25, 0.25, 0.25);
    this.mouse.rotation.z = -Math.PI / 2;

    this.pc.position.y = -1;
    this.pc.position.z = -2;
    this.pc.rotation.z = -Math.PI / 6;

    this.sectionMeshes = [
      this.mesh1,
      this.mesh2,
      this.mesh3,
      this.astronaut.scene,
    ];

    this.astronaut.scene.scale.set(0.6, 0.6, 0.6);
    this.robot.scale.set(0.6, 0.6, 0.6);
    this.space_ship.scale.set(0.8, 0.8, 0.8);

    this.astronaut.scene.rotation.y = -Math.PI / 2;
    this.robot.rotation.y = -Math.PI;
    this.space_ship.rotation.x = Math.PI / 4;

    this.astronaut.scene.position.x = 20;
    this.robot.position.x = 10;
    this.space_ship.position.set(5, 2, -5);

    this.astronaut.scene.position.y = -this.objectsDistance * 0;
    this.robot.position.y = 0;

    this.astronaut.scene.position.z = -22;

    const path = [
      { x: 10, y: 0 },
      { x: -35, y: 0 },
    ];
    const path1 = [
      { x: 2, y: 0 },
      { x: -2, y: 0 },
    ];
    gsap.to(this.astronaut.scene.position, {
      motionPath: {
        path, // equivalent to path: path
      },
      ease: "none",
      duration: 20,
    });
    gsap
      .timeline()
      .to(this.robot.position, {
        x: -2,
        ease: "Power1.easeOut",
        duration: 4,
      })
      .to(this.robot.rotation, {
        y: "+=2",
        ease: "Elastic.easeOut",
      });

    this.setUpGamerGroup = new THREE.Group();
    this.setUpGamerGroup.position.x = -2;
    this.setUpGamerGroup.position.y = -this.objectsDistance * 1;
    this.setUpGamerGroup.position.z = 5;

    this.paper_plane.position.set(0.6, -this.objectsDistance * 4, 24);
    this.paper_plane.scale.set(0.25, 0.25, 0.25);
    //this.paper_plane.rotation.y = Math.PI;
    this.paper_plane.rotation.x = Math.PI / 10;

    this.scene.add(
      this.setUpGamerGroup,
      this.astronaut.scene,
      this.paper_plane,
      this.robot,
      this.space_ship
    );

    this.setUpGamerGroup.add(this.monitor);
  }
  setMobilePositions() {
    this.setUpGamerGroup.position.x = 0;
    this.scene.remove(this.paper_plane);
  }
  update() {
    this.astronaut.scene.rotation.x = this.experience.time.elapsedTime * 0.1;
    this.astronaut.scene.rotation.y = this.experience.time.elapsedTime * 0.1;
    this.astronaut.scene.rotation.z = this.experience.time.elapsedTime * 0.1;

    this.robot.position.y =
      Math.sin(this.experience.time.elapsedTime * 7) * 0.2;

    this.space_ship.position.y =
      Math.sin(this.experience.time.elapsedTime * 0.5) * 0.5;
    this.space_ship.rotation.x =
      Math.sin(this.experience.time.elapsedTime * 0.4) * 0.5 + 0.5;

    this.monitor.rotation.z = this.experience.time.elapsedTime * 0.1;
    this.monitor.rotation.y = this.experience.time.elapsedTime * 0.05;
    this.mouse.rotation.y = this.experience.time.elapsedTime * 0.05;
    this.pc.rotation.z = -this.experience.time.elapsedTime * 0.08;
    this.pc.rotation.y = -this.experience.time.elapsedTime * 0.08;

    //Animating Camera
  }
  resize() {
    if (this.experience.sizes.width <= 992) {
      this.setMobilePositions();
    }
  }
}
