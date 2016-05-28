
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require three
//= require_tree .

var scene,player;
var loader = new THREE.ImageLoader();
var pic = $('#img');
var collider = [];
var r = 20;
var enemyCount = 30;
var mouse = new THREE.Vector2();
var geometry = new THREE.SphereGeometry( 0.2 );


  // WebGLRenderer

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
var space = document.getElementById( "space" );
space.appendChild( renderer.domElement );

 // CAMERA
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
scene = new THREE.Scene();

// ENEMIES
// ENEMY OBJECT
var material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture(pic.context.images[0].src),
    wireframe: false

  });
for (var i =0; i < enemyCount; i++) {
var cube = new THREE.Mesh( geometry, material );
  cube.position.set( r/2 - r * Math.random(),
                     r/2 - r * Math.random(),
                     0.0);
  scene.add( cube );
  collider.push(cube);
}

  // ADDING PLAYER
player = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) );
scene.add( player );
space.addEventListener('keydown' , playerMovement, false );

  // Keyboard event
function playerMovement ( event ) {

}
$( window ).keydown(function( e ) {
  if ( e.which == 38 ) {
   player.position.y +=1;
   console.log("arrow up fired");
 } else if ( e.which == 37 ) {
   player.position.x -=1;
   console.log("left?");
 } else if ( e.which == 39 ) {
   player.position.x += 1;
   console.log("right?");
 } else if ( e.which == 40 ) {
   player.position.y -= 1;
   console.log("down?");
 }
});

function animate() {
	requestAnimationFrame( animate );

  for (var i = 0; i < collider.length; i++) {
    if ( collider[i].position.y < -5 ) {
      collider[i].position.y = 6;
    } else {
      collider[i].position.y -= 0.010;
      collider[i].rotation.x += 0.01;
      collider[i].rotation.y += 0.01;
      collider[i].rotation.z += 0.01;
    }
}
	renderer.render(scene, camera);
}
animate();
