var container;
var camera, controls, scene, renderer;
var sphereTab = [];
var objects = [];
var atom;
var orbitRing;
var wireObj_01, wireObj_02, wireObj_03;
var scrollPos = 0;
var camera_pivot;

var windowInnerWidth = 0;
var windowInnerHeight = 0;
var windowOuterHeight = 0;

// fps monitor
// (function () {
//     var script = document.createElement('script');
//     script.onload = function () {
//         var stats = new Stats();
//         document.body.appendChild(stats.dom);
//         requestAnimationFrame(function loop() {
//             stats.update();
//             requestAnimationFrame(loop)
//         });
//     };
//     script.src = '//mrdoob.github.io/stats.js/build/stats.min.js';
//     document.head.appendChild(script);
// })();


// init();
// animate();

$(document).ready(function () {

    init();
    animate();

    /* Store the window width */
    windowInnerWidth = window.innerWidth;
    windowInnerHeight = window.innerHeight;
    windowOuterHeight = window.outerHeight;

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('scroll', onScroll, false);
});

function init() {
    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera_pivot = new THREE.Object3D();
    scene.add(camera_pivot);
    camera_pivot.add(camera);
    camera.position.set(0, 0, 70);
    //camera.lookAt(camera_pivot.position);
    // camera.position.z = 38;
    // camera.lookAt(scene.position);

    // stars
    for (var i = 0; i < 300; i++) {
        lumiereS = new THREE.MeshPhongMaterial({
            emissive: '#fff'
        });
        //sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 1, 20, 20), lumiereS));
        sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 0.11, 4, 4), lumiereS));
    }

    for (var i = 0; i < sphereTab.length; i++) {
        // sphereTab[i].position.set(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300);
        // sphereTab[i].position.set(0, Math.random() * 600 - 300, 0);
        scene.add(sphereTab[i]);
    }

    // black atom material
    var atomMat = new THREE.MeshPhongMaterial({
        color: 0x878787,
        specular: 0xdddddd,
        shininess: 10,
        shading: THREE.FlatShading,
        transparent: 1,
        opacity: 1
    });


    // wireframe shape
    if (window.matchMedia("(max-width: 600px)").matches) {
        atom = new THREE.Mesh(new THREE.IcosahedronGeometry(6, 1), atomMat);
        geometry_01 = new THREE.IcosahedronGeometry(13, 1);
    } else {
        // black atom
        atom = new THREE.Mesh(new THREE.IcosahedronGeometry(8, 1), atomMat);
        // wireframe shape
        var geometry_01 = new THREE.IcosahedronGeometry(16, 1);
    }

    var wireMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
    });

    // wireframe 01
    var wireframe_01 = new THREE.WireframeGeometry(geometry_01);
    wireObj_01 = new THREE.LineSegments(wireframe_01, wireMat);
    wireObj_01.material.depthTest = true;
    wireObj_01.material.transparent = true;
    wireObj_01.material.opacity = 0.1;

    // wireObj_01.rotation.x = 1;
    scene.add(atom);
    objects.push(atom);
    scene.add(wireObj_01);
    objects.push(wireObj_01);


    // lights
    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(4, 4, 4);
    scene.add(light);
    light = new THREE.DirectionalLight(0x4f4f4f);
    light.position.set(-4, -4, -4);
    scene.add(light);

    // render
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.sortObjects = false;
    renderer.autoClear = false;

    //sky color
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container = document.getElementById('threejs-container');
    container.appendChild(renderer.domElement);

    // window.addEventListener('scroll', onScroll, false);
    // window.addEventListener('resize', onWindowResize, false);
}

function animate() {

    var timer = 0.00001 * Date.now();
    for (var i = 0, il = sphereTab.length; i < il; i++) {
        var sfere = sphereTab[i];

        sfere.position.x = 100 * Math.sin(timer + i);
        sfere.position.y = 50 * Math.sin(timer + i * 1.6);
        sfere.position.z = 150 * Math.sin(timer + i * 1.5);
    }
    atom.rotation.y += 0.008;
    wireObj_01.rotation.x += 0.01;
    //wireObj_01.rotation.y += 0.008;
    //wireObj_01.rotation.z += 0.008;
    // earthPivot.rotation.z += 0.006;
    // earthPivot2.rotation.z += 0.01;
    //orbitRing.rotation.x += 0.006;
    //orbitRing.rotation.y += 0.007;
    //orbitRing.rotation.z += 0.008;
    // earthPivot4.rotation.z += 0.008;
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera)
}

function onScroll(event) {
    event.preventDefault();

    // camera.rotation.x -= event.deltaY * 0.05;

    if ((document.body.getBoundingClientRect()).top > scrollPos) {
        camera_pivot.rotation.y -= 0.004;
    } else {
        camera_pivot.rotation.y += 0.004;
    }

    scrollPos = (document.body.getBoundingClientRect()).top;
}

function onWindowResize() {
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // render();

    if (window.innerWidth != windowInnerWidth || window.outerHeight != windowOuterHeight) {

        windowInnerWidth = window.innerWidth;
        windowOuterHeight = window.outerHeight;
        windowInnerHeight = window.innerHeight;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

}