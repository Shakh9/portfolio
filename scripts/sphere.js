import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.home__canvas');
  const canvas = document.getElementById('sphereCanvas');
  let pulseScale = 1;
  let pulseDirection = 0.005;

  if (!container || !canvas) {
    console.error('Контейнер или canvas не найден');
    return;
  }

  // Сцена
  const scene = new THREE.Scene();

  // Камера
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 9);

  // Рендерер с прозрачным фоном
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);

  // Управление
  const controls = new OrbitControls(camera, canvas);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.2;
  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.enablePan = false;

  // ============================================
  // ИКОСАЭДР
  // ============================================

  const geometry = new THREE.IcosahedronGeometry(2.2, 0);

  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Внешняя полупрозрачная сфера
  const outerGeometry = new THREE.SphereGeometry(2.4, 48, 48);
  const outerMaterial = new THREE.MeshBasicMaterial({
    color: 0xC0C0C0,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
  scene.add(outerSphere);


  // ============================================
  // ЛОГОТИПЫ (НАСТОЯЩИЕ ИЗОБРАЖЕНИЯ)
  // ============================================

  // Список технологий с путями к логотипам
  const techs = [
    { name: 'react', path: 'assets/icons/technologies/react.png', lat: 0, lon: 0 },
    { name: 'vue', path: 'assets/icons/technologies/vue.png', lat: 0, lon: 45 },
    { name: 'angular', path: 'assets/icons/technologies/angular.png', lat: 0, lon: 90 },
    { name: 'svelte', path: 'assets/icons/technologies/svelte.png', lat: 0, lon: 135 },
    { name: 'js', path: 'assets/icons/technologies/js.png', lat: 0, lon: 180 },
    { name: 'ts', path: 'assets/icons/technologies/ts.png', lat: 0, lon: 225 },
    { name: 'nextjs', path: 'assets/icons/technologies/nextjs.png', lat: 0, lon: 270 },
    { name: 'astro', path: 'assets/icons/technologies/astro.png', lat: 0, lon: 315 },
    { name: 'html', path: 'assets/icons/technologies/html.png', lat: 35, lon: 30 },
    { name: 'css', path: 'assets/icons/technologies/css.png', lat: 35, lon: 90 },
    { name: 'sass', path: 'assets/icons/technologies/sass.png', lat: 35, lon: 150 },
    { name: 'tailwind', path: 'assets/icons/technologies/tailwind.png', lat: 35, lon: 210 },
    { name: 'vite', path: 'assets/icons/technologies/vite.png', lat: 35, lon: 270 },
    { name: 'webpack', path: 'assets/icons/technologies/webpack.png', lat: 35, lon: 330 },
    { name: 'git', path: 'assets/icons/technologies/git.png', lat: -35, lon: 30 },
    { name: 'figma', path: 'assets/icons/technologies/figma.png', lat: -35, lon: 90 },
    { name: 'nodejs', path: 'assets/icons/technologies/nodejs.png', lat: -35, lon: 150 },
    { name: 'redux', path: 'assets/icons/technologies/redux.png', lat: -35, lon: 210 },
    { name: 'threejs', path: 'assets/icons/technologies/threejs.png', lat: -35, lon: 270 },
    { name: 'graphql', path: 'assets/icons/technologies/graphql.png', lat: -35, lon: 330 },
  ];


  // Функция для преобразования сферических координат в декартовы
  function sphereToCartesian(lat, lon, radius) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = lon * Math.PI / 180;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return { x, y, z };
  }

  // Загружаем все логотипы
  const textureLoader = new THREE.TextureLoader();
  const radius = 3.0;  // Радиус размещения логотипов
  const logoSize = 0.65;  // Размер всех логотипов (одинаковый)

  techs.forEach(tech => {
    textureLoader.load(tech.path,
      (texture) => {
        // Успешная загрузка
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);

        const { x, y, z } = sphereToCartesian(tech.lat, tech.lon, radius);
        sprite.position.set(x, y, z);

        // ОДИНАКОВЫЙ РАЗМЕР ДЛЯ ВСЕХ ЛОГОТИПОВ
        sprite.scale.set(logoSize, logoSize, 1);

        scene.add(sprite);
        console.log(`Логотип ${tech.name} загружен`);
      },
      undefined,
      (error) => {
        // Ошибка загрузки
        console.error(`Ошибка загрузки логотипа ${tech.name}:`, error);
      }
    );
  });

  // ============================================
  // АНИМАЦИЯ
  // ============================================

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Адаптация под размер
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  console.log('3D сцена с логотипами загружена');
});
