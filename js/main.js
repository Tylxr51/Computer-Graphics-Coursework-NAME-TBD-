import * as THREE from '/three.js-r170/build/three.module.js';
import { PointerLockControls } from '/three.js-r170/examples/jsm/controls/PointerLockControls.js';  
import Floor from '/js/scene.js';

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );



// Add renderer to the document
document.body.style.margin = '0';
document.body.appendChild( renderer.domElement );

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Position camera
camera.position.set( 5, 0.5, 0 );
camera.lookAt( 0, 0, 0 );

// Set up controls
const controls = new PointerLockControls( camera, renderer.domElement );
controls.pointerSpeed = 0.5;

const instructions = document.getElementById( 'instructions' );
const paused = document.getElementById( 'paused' );

// Enable pointer lock on click
instructions.addEventListener( 'click', () => {
    controls.lock();
} );

paused.addEventListener( 'click', () => {
    controls.lock();
} );

controls.addEventListener('lock', function () {
    instructions.style.display = 'none';
    paused.style.display = 'none';
} );

controls.addEventListener('unlock', function () {
    instructions.style.display = 'none';
    paused.style.display = 'flex';
} );

// Set up clock for controls update
const clock = new THREE.Clock();

// Set up floor
const floor = new Floor();
scene.add( floor.mesh );

// Set up box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const boxMesh = new THREE.Mesh( boxGeometry, boxMaterial );
boxMesh.position.set(0, 0.5, 0);    
scene.add( boxMesh );




// Animation loop
function animate() {

    // Schedule the next frame
    requestAnimationFrame( animate );

    // Update controls
    const delta = clock.getDelta();
    controls.update( delta );


    // Render the scene
    renderer.render( scene, camera );
}


// Start animation loop
animate();

