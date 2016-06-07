
  var wScene = new THREE.Scene();
  var wCamera = new THREE.PerspectiveCamera( 75, 400 / 400, 0.1, 1000 );
  wCamera.position.z = 1;

  var wRenderer = new THREE.WebGLRenderer();
  wRenderer.setClearColor ( 0xFFFFFF );
  wRenderer.setSize( 400, 400 );
    if ( document.getElementById( "welcome-sphere" ) ) {
      var welcome = document.getElementById( "welcome-sphere" );
      document.body.appendChild( welcome );
      welcome.appendChild( wRenderer.domElement );
    }

  var wGeometry = new THREE.SphereGeometry( 0.5 );
  wObject = new THREE.Mesh( wGeometry, new THREE.MeshBasicMaterial ({
    color: Math.random() * 0xFFFFFF,
    wireframe: true
  } ) );
  wScene.add ( wObject );
  function render () {

    requestAnimationFrame( render );
    wObject.rotation.x += 0.05;
    wObject.rotation.y += 0.05;
    wObject.position.z += 0.05;
    if (wObject.position.z >= 1 ) {
      wObject.position.z = -5;
    }

    wRenderer.render( wScene, wCamera );
  }
  render();
