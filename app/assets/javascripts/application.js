
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require three
//= require_tree .

var scene = new THREE.Scene();
var loader = new THREE.ImageLoader();
var pic = $('#img');
var collider = [];
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
var material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture(pic.context.images[0].src),
    wireframe: false

  });

// function mouseMove( e ) {
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//   mouse.y = ( event.clientY / window.innerWidth ) * 2 + 1;
// }

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var r = 20;
var enemyCount = 50;
for (var i =0; i < enemyCount; i++) {
var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  cube.position.set( r/2 - r * Math.random(),
                     r/2 - r * Math.random(),
                     0.0);
  collider.push(cube);
}



camera.position.z = 10;
function animate() {
  // raycaster.setFromCamera( mouse, camera );
  // var intersects = raycaster.intersecObjects( scene.children );
  // for ( var i = 0; i < intersects.lenght; i++ ) {
  //   intersects[i].object.material.color.set( 0xFF0000 );
  // }

	requestAnimationFrame( animate );

  for (var i = 0; i < collider.length; i++) {
    if ( collider[i].position.y < -3 ) {
      collider[i].position.y = 6;
    } else {
      collider[i].position.y -= 0.10;
      // collider[i].rotation.x += 0.01;
      // collider[i].rotation.y += 0.01;
      // collider[i].rotation.z += 0.01;
    }
}
	renderer.render(scene, camera);

  object.position.add(direction);

}
// window.addEventListener( 'mouseMove', onMouseMove, false );

animate();
