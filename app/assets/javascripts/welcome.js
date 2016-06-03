
  var wscene = new THREE.Scene();
  var wcamera = new THREE.PerspectiveCamera( 75, 400 / 400, 0.1, 1000 );
  wcamera.position.z = 1;

  var wrenderer = new THREE.WebGLRenderer();
  wrenderer.setClearColor ( 0xFFFFFF );
  wrenderer.setSize( 400, 400 );
  var welcome = document.getElementById( "welcome-sphere" );
  document.body.appendChild( welcome );
  welcome.appendChild( wrenderer.domElement );
  var wgeometry = new THREE.SphereGeometry( 0.5 );
  wObject = new THREE.Mesh( wgeometry, new THREE.MeshBasicMaterial ({
    color: Math.random() * 0xFFFFFF,
    wireframe: true
  } ) );
  wscene.add ( wObject );
  function render () {

    requestAnimationFrame( render );
    wObject.rotation.x += 0.01;
    wObject.rotation.y += 0.01;
    wObject.position.z += 0.01;
    if (wObject.position.z >= 1 ) {
      wObject.position.z = -5;
    }

    wrenderer.render( wscene, wcamera );
  }
  render();
