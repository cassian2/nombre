let scene;
let camera;
let renderer;

function setup() {
  setupScene();
  setupCamera();
  setupRenderer();
  setupText();
  setupLights();

  setupEventListeners();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.set(0, -400, 400);
  let controls = new THREE.OrbitControls(camera);
  controls.update();
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupText() {
  let loadert = new THREE.FontLoader();
  const loader = new THREE.TextureLoader();
  const textureSphereBg = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
  const texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
  const textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");
  const texture1 = loader.load("https://i.ibb.co/F8by6wW/p2-b3gnym.png");
  const texture2 = loader.load("https://i.ibb.co/yYS2yx5/p3-ttfn70.png");
  const texture4 = loader.load("https://i.ibb.co/yWfKkHh/p4-avirap.png");
  let ambientLight = new THREE.AmbientLight("#000", 1);
  ambientLight.position.set(0, 20, 20);
  scene.add(ambientLight);

  loadert.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/254249/helvetiker_regular.typeface.json", function (font) {
    let message = "Litzy";
    let geometry = new THREE.TextGeometry(message, {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 3,
      bevelSegments: 5
    });
    // Cambiar color del material del texto a turquesa
    let material = new THREE.MeshPhongMaterial({ color: 0x239089 });  // Turquesa
    geometry.center();
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });

  const donutGeometry = new THREE.TorusGeometry(50, 25, 40, 100);
  
  // Cambiar color del material de las donas a verde agua
  const donutMaterial = new THREE.MeshPhongMaterial({ color: 0xb5fffff}); // Verde agub5ffffa

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    donut.position.x = (Math.random() - 0.5) * 1000;
    donut.position.y = (Math.random() - 0.5) * 1000;
    donut.position.z = (Math.random() - 0.5) * 1000;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xcccccc);
  spotLight.position.set(200, 100, 400);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw() {
  requestAnimationFrame(draw);
  renderer.render(scene, camera);
}

setup();
draw();
