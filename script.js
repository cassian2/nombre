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
  let ambientLight = new THREE.AmbientLight("#ffffff", 1);
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
    let material = new THREE.MeshPhongMaterial({ map: texturenucleus,color: 0x239089 });
    geometry.center();
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

  });
  // const donutGeometry = new THREE.TorusGeometry(50, 25, 40, 100)
  //       const donutMaterial = new THREE.MeshNormalMaterial()

  //       for(let i = 0; i < 100; i++){
  //           const donut = new THREE.Mesh(donutGeometry, donutMaterial)

  //           donut.position.x = (Math.random() -0.5) * 1000
  //           donut.position.y = (Math.random() -0.5) * 1000
  //           donut.position.z = (Math.random() -0.5) * 1000

  //           donut.rotation.x = Math.random() * Math.PI
  //           donut.rotation.y = Math.random() * Math.PI

  //           const scale = Math.random()
  //           donut.scale.set(scale, scale, scale)

  //           scene.add(donut)
  //       }
  //
  
  // // /*  Nucleus  */   
  // texturenucleus.anisotropy = 16;
  // let icosahedronGeometry = new THREE.IcosahedronGeometry(20, 20);
  // let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
  // nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
  // scene.add(nucleus);


  /*    Sphere  Background   */
  textureSphereBg.anisotropy = 16;
  let geometrySphereBg = new THREE.SphereBufferGeometry(250, 40, 40);
  let materialSphereBg = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      map: textureSphereBg,
  });
  sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
  scene.add(sphereBg);
  /*    Moving Stars   */
  let starsGeometry = new THREE.Geometry();

  for (let i = 0; i < 50; i++) {
      let particleStar = randomPointSphere(150); 

      particleStar.velocity = Math.floor(Math.random() * 200);

      particleStar.startX = particleStar.x;
      particleStar.startY = particleStar.y;
      particleStar.startZ = particleStar.z;

      starsGeometry.vertices.push(particleStar);
  }
  let starsMaterial = new THREE.PointsMaterial({
      size: 5,
      color: "#ffffff",
      transparent: true,
      opacity: 0.8,
      map: textureStar,
      blending: THREE.AdditiveBlending,
  });
  starsMaterial.depthWrite = false;  
  stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
  // /*    Fixed Stars   */
  // function createStars(texture, size, total) {
  //   let pointGeometry = new THREE.Geometry();
  //   let pointMaterial = new THREE.PointsMaterial({
  //       size: size,
  //       map: texture,
  //       blending: THREE.AdditiveBlending,                      
  //   });

  //   for (let i = 0; i < total; i++) {
  //       let radius = Math.floor(Math.random() * 140);
  //       let particles = randomPointSphere(radius);
  //       pointGeometry.vertices.push(particles);
  //   }
  //   return new THREE.Points(pointGeometry, pointMaterial);
  // }
  // scene.add(createStars(texture1, 15, 20));   
  // scene.add(createStars(texture2, 5, 5));
  // scene.add(createStars(texture4, 7, 5))
    //
  function randomPointSphere (radius) {
    let theta = 2 * Math.PI * Math.random();
    let phi = Math.acos(2 * Math.random() - 1);
    let dx = 0 + (radius * Math.sin(phi) * Math.cos(theta));
    let dy = 0 + (radius * Math.sin(phi) * Math.sin(theta));
    let dz = 0 + (radius * Math.cos(phi));
    return new THREE.Vector3(dx, dy, dz);
}
}
function animate() {

  //Stars  Animation
  stars.geometry.vertices.forEach(function (v) {
      v.x += (0 - v.x) / v.velocity;
      v.y += (0 - v.y) / v.velocity;
      v.z += (0 - v.z) / v.velocity;

      v.velocity -= 0.3;

      if (v.x <= 5 && v.x >= -5 && v.z <= 5 && v.z >= -5) {
          v.x = v.startX;
          v.y = v.startY;
          v.z = v.startZ;
          v.velocity = THREE.MathUtils.randInt(50, 300);
      }
  });
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
