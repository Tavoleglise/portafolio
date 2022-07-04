import * as THREE from "three";

export default class Environment {
  constructor() {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setEnvironmentMap();
    //this.setSunSunLight();
    this.setDirectionalLights();
  }

  setSunSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);
    this.experience.scene.add(this.sunLight);
  }

  setDirectionalLights() {
    this.directionalLight1 = new THREE.DirectionalLight("#ffffff", 1);
    this.directionalLight2 = new THREE.DirectionalLight("#ffffff", 0.5);
    this.directionalLight1.position.set(1, 1, 0);
    this.directionalLight2.position.set(-1, 1, 0);
    this.experience.scene.add(this.directionalLight1, this.directionalLight2);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 2;
    this.environmentMap.texture = this.resources.items.enviromentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.setEnvironmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMapIntensity = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.setEnvironmentMap.updateMaterial();
  }
}
