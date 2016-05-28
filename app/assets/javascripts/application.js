
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require three
//= require_tree .

var scene = new THREE.Scene();
var loader = new THREE.ImageLoader();
var pic = $('#img');
var collider = [];
var r = 20;
var enemyCount = 50;
var mouse = new THREE.Vector2();
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 1000 );
var geometry = new THREE.SphereGeometry( 0.2 );
// ENEMY OBJECT
var material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture(pic.context.images[0].src),
    wireframe: false

  });

  // WebGLRenderer

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
var space = document.getElementById( "space" );
space.appendChild( renderer.domElement );
for (var i =0; i < enemyCount; i++) {
var cube = new THREE.Mesh( geometry, material );
  cube.position.set( r/2 - r * Math.random(),
                     r/2 - r * Math.random(),
                     0.0);
  scene.add( cube );
  collider.push(cube);
}
  // ADDING PLAYER
var player = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) );
scene.add( player );
space.addEventListener('mousemove' , playerMovement, false );

  // MOUSE MOVEMENT EVENT
function playerMovement ( e ) {
  mouse.x = (( e.clientX - space.offsetLeft ) / space.clientWidth ) * 2 - 1;
  mouse.y = - ( ( e.clientY - space.offsetTop)/ space.clientHeigth ) * 2 + 1;

  player.position.set( 275 * mouse.x, 275 * mouse.y, 0.0);
  console.log('mouse move');
}

camera.position.z = 10;
function animate() {
	requestAnimationFrame( animate );

  for (var i = 0; i < collider.length; i++) {
    if ( collider[i].position.y < -3 ) {
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
