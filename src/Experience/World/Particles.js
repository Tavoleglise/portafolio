import * as THREE from "three";

export default class Particles {
  constructor(objectDistance, sectionMeshes) {
    this.experience = window.experience;
    this.scene = this.experience.scene;
    this.particlesCount = 1000;
    this.positions = new Float32Array(this.particlesCount * 3);
    this.objectDistance = objectDistance;
    this.sectionMeshes = sectionMeshes;

    //setup
    this.setParticlesGeometry();
    this.setParticlesMaterial();
    this.setParticlesPoints();
  }

  setParticlesGeometry() {
    for (let i = 0; i < this.particlesCount; i++) {
      this.positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      this.positions[i * 3 + 1] =
        this.objectDistance *
        (Math.random() - 0.5) *
        this.objectDistance *
        (this.sectionMeshes.length + 3);
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }

    this.particlesGeometry = new THREE.BufferGeometry();
    this.particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
  }
  setParticlesMaterial() {
    this.particlesMaterial = new THREE.PointsMaterial({
      color: this.experience.world.parameters.materialColor,
      sizeAttenuation: true,
      size: 0.08,
    });
  }
  setParticlesPoints() {
    const particles = new THREE.Points(
      this.particlesGeometry,
      this.particlesMaterial
    );
    this.scene.add(particles);
  }
}
