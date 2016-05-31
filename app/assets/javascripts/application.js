
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require three
//= require_tree .

var scene,player,gem;
var loader = new THREE.ImageLoader();
var pic = $('#img');
var collider = [];
var range = 20;
var enemyRadius = 0.2;
var gemRadius = 0.2;
var radius = 0.5;
var enemyCount = 30;
var mouse = new THREE.Vector2();
var enemyGeometry = new THREE.SphereGeometry( enemyRadius );
var geometry = new THREE.SphereGeometry( radius );
var gemGeometry = new THREE.SphereGeometry( gemRadius );



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
var enemy = new THREE.Mesh( enemyGeometry, material );
  enemy.position.set( range / 2 - range * Math.random(),
                     range / 2 - range * Math.random(),
                     0.0);
  scene.add( enemy );
  collider.push( enemy );
}

  // ADDING PLAYER
player = new THREE.Mesh( enemyGeometry, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) );
scene.add( player );

gem = new THREE.Mesh ( gemGeometry, new THREE.MeshBasicMaterial ( { color: 0x00ff00, wireframe: false } ) );
gem.position.set( range / 2 - range * Math.random(),
                   range / 2 - range * Math.random(),
                   0.0);
scene.add ( gem );

$( window ).keydown(function( e ) {
  var playerSpeed = 0.5;
  if ( e.which == 38 ) {
   player.position.y += playerSpeed;
   console.log("up");
 } else if ( e.which == 37 ) {
   player.position.x -= playerSpeed;
   console.log("left");
 } else if ( e.which == 39 ) {
   player.position.x += playerSpeed;
   console.log("right?");
 } else if ( e.which == 40 ) {
   player.position.y -= playerSpeed;
   console.log("down?");
 }
 // if player leaves inner space, game will teleport player to center.
 if ( player.position.y == -6  ||
      player.position.y ==  6  ||
      player.position.x == -11 ||
      player.position.x ==  11 ) {
        player.position.y = 0;
        player.position.x = 0;
        console.log("outside");
      }

});

function animate() {
	requestAnimationFrame( animate );

  for (var i = 0; i < collider.length; i++) {
    if ( collider[i].position.y < -5 ) {
      collider[i].position.y = 6;
    } else {
      collider[i].position.y -= 0.030;
      collider[i].rotation.x += 0.01;
      collider[i].rotation.y += 0.01;
      collider[i].rotation.z += 0.01;
      if ( collider[i].position.distanceTo( player.position )  < 2 * enemyRadius ) {
        console.log("collision");
      }
    }
}
	renderer.render(scene, camera);
  if ( gem.position.distanceTo( player.position ) < 2 * gemRadius ) {
    console.log("gem collision");
    gon.score += 100;
    console.log(gon.score);
    gem.position.set( range / 2 - range * Math.random(),
                       range / 2 - range * Math.random(),
                       0.0);
  }
}
animate();
