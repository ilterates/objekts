
//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require turbolinks
//= require three
//= require_tree .
var scene,player,gem,collected;
var $score = $('#score').val();
collected = 0;
var score = 0;
var loader = new THREE.ImageLoader();
var pic = $('#img');
var collider = [];
var range = 20;
var enemyRadius = 0.5;
var gemRadius = 0.2;
var radius = 0.4;
var enemyCount = 15;
var mouse = new THREE.Vector2();
var enemyGeometry = new THREE.CubeGeometry( 1, 1, 1 );
var geometry = new THREE.SphereGeometry( radius );
var gemGeometry = new THREE.SphereGeometry( gemRadius );
var time = Date.now();
var myAlienFriends = [ pic.context.images[0].src,
                       pic.context.images[1].src,
                       pic.context.images[2].src ];
var picture = 0;


  // WebGLRenderer

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor ( 0xFFFFFF );
renderer.setSize( window.innerWidth, window.innerHeight );
var space = document.getElementById( "space" );
space.appendChild( renderer.domElement );

 // CAMERA
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;
scene = new THREE.Scene();

// ENEMIES
for ( var i =0; i < enemyCount; i++ ) {
  // ENEMY OBJECT
  var material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture(myAlienFriends[picture]),
    wireframe: false
  });
// var light = new THREE.PointLight( 0x000000, 1 );
// camera.add( light );
var enemy = new THREE.Mesh( enemyGeometry, material );
  enemy.position.set( range / 2 - range * Math.random(),
                     range / 2 - range * Math.random(),
                     0.0);
  scene.add( enemy );
  picture += 1;
  if ( picture == 3) {
    picture = 0;
  }
  collider.push( enemy );
}

  // ADDING PLAYER
player = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial ({
    color: 0x000000,
    wireframe: true
} ) );
scene.add( player );

gem = new THREE.Mesh ( gemGeometry, new THREE.MeshBasicMaterial ( { color: 0x8e44ad, wireframe: true } ) );
gem.position.set( range / 2 - range * Math.random(),
                   range / 2 - range * Math.random(),
                   0.0);
scene.add ( gem );

$( window ).keydown(function( e ) {
  var playerSpeed = 0.5;
  if ( e.which == 38 ) {
   player.position.y += playerSpeed;
 } else if ( e.which == 37 ) {
   player.position.x -= playerSpeed;
 } else if ( e.which == 39 ) {
   player.position.x += playerSpeed;
 } else if ( e.which == 40 ) {
   player.position.y -= playerSpeed;

 }
 // if player leaves inner space, game will teleport player to center.
 if ( player.position.y >= 5.7 ||
      player.position.y <= -4.7||
      player.position.x <= -11 ||
      player.position.x >=  11 ) {
        player.position.y = 0;
        player.position.x = 0;
        console.log("outside");
      }

});

function animate() {
	requestAnimationFrame( animate );

  for (var i = 0; i < collider.length; i++) {
    if ( collider[i].position.y < -5.5 ) {
      collider[i].position.y = 6;
    } else {
      collider[i].position.y -= 0.031;
      collider[i].rotation.x += 100;
      collider[i].rotation.y += 100;
      collider[i].rotation.z += 100;
      if ( collider[i].position.distanceTo( player.position )  < 2 * enemyRadius && score !== 0 ) {
        console.log("collision");
        if ( ( Date.now() - time ) > 1000 && collected >= 1 ) {
          $.ajax({
            method: 'POST',
            url: '/scores',
            data:  { user_score: $('#score').val() }
          });
          time = Date.now();
          collected = 0;
        }
        player.position.x = 0;
        player.position.y = 0;
        score = 0;
        console.log(score);
        $("#score").text(score);
        $("#score").val(score);
      }
    }
    if ( gem.position.x <= -8.5 ||
         gem.position.x >= 8.4  ||
         gem.position.y <= -4.6 ||
         gem.position.y >= 5.7 ) {
           gem.position.x = 3;
           gem.position.y = 3;
        console.log("gem was reset due to spawning outside.");
      }
}
	renderer.render(scene, camera);
  if ( gem.position.distanceTo( player.position ) < 2 * gemRadius ) {
    console.log("gem collision");
    score += 1000;
    collected += 1;
    console.log(score);
    $("#score").text(score);
    $("#score").val(score);
    gem.position.set( 5 / 2 - 10 * Math.random(), 5 / 2 - 10 * Math.random(),  0.0);
  }
}
animate();
if(window.location.toString().contains("users") >= 0){
  $("#score").val("");
  $("#score").text("");
  console.log("users path");
}
