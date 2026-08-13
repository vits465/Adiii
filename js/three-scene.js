/**
 * Three.js Dual WebGL Scene Renderer (Leo Parpeix Style)
 * Renders home model scene_v9.glb and about flower model scene_v15.glb
 */
class Dual3DManager {
  constructor() {
    this.heroScene = null;
    this.aboutScene = null;

    this.initHeroScene();
    this.initAboutScene();
  }

  initHeroScene() {
    const container = document.getElementById('webgl-hero-container');
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x10b981, 2.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Load scene_v9.glb
    if (typeof THREE.GLTFLoader !== 'undefined') {
      const loader = new THREE.GLTFLoader();

      if (typeof THREE.DRACOLoader !== 'undefined') {
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
        loader.setDRACOLoader(dracoLoader);
      }

      loader.load(
        'leoparpeix_assets/assets/models/home/scene_v9.glb',
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(1.35, 1.35, 1.35);
          modelGroup.add(model);
        },
        undefined,
        (err) => {
          this.createFallbackMesh(modelGroup);
        }
      );
    } else {
      this.createFallbackMesh(modelGroup);
    }

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      modelGroup.rotation.y += 0.005;
      modelGroup.rotation.x += (mouseY * 0.4 - modelGroup.rotation.x) * 0.05;
      modelGroup.rotation.y += (mouseX * 0.4 - modelGroup.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();
  }

  initAboutScene() {
    const container = document.getElementById('webgl-about-container');
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x34d399, 2.5);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Load scene_v15.glb (About 3D Flower Model)
    if (typeof THREE.GLTFLoader !== 'undefined') {
      const loader = new THREE.GLTFLoader();

      if (typeof THREE.DRACOLoader !== 'undefined') {
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');
        loader.setDRACOLoader(dracoLoader);
      }

      loader.load(
        'leoparpeix_assets/assets/models/about/scene_v15.glb',
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(0.9, 0.9, 0.9);
          model.position.set(0, -0.5, 0);
          modelGroup.add(model);
        },
        undefined,
        (err) => {
          this.createFallbackFlower(modelGroup);
        }
      );
    } else {
      this.createFallbackFlower(modelGroup);
    }

    let mouseX = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      modelGroup.rotation.y += 0.003;
      modelGroup.rotation.y += (mouseX * 0.3 - modelGroup.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();
  }

  createFallbackMesh(group) {
    const geo = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32);
    const mat = new THREE.MeshPhongMaterial({ color: 0x083D2A, specular: 0x34d399, shininess: 80 });
    group.add(new THREE.Mesh(geo, mat));
  }

  createFallbackFlower(group) {
    const geo = new THREE.DodecahedronGeometry(1.2, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0x10b981, wireframe: true });
    group.add(new THREE.Mesh(geo, mat));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof THREE !== 'undefined') {
    window.dual3DManager = new Dual3DManager();
  }
});
