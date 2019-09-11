                    let camera, scene, renderer;
                    const mouse = new THREE.Vector2();
                    const look = new THREE.Vector2();
                    const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
                    var plane = new THREE.Plane(new THREE.Vector3(0, 0, 0.4), -11);
                    var raycaster = new THREE.Raycaster();
                    var pointOfIntersection = new THREE.Vector3();
                    let modelLoaded = false;

                    let placement = document.getElementById("model_target")


                    window.addEventListener('DOMContentLoaded', init);


                    function init() {

                        scene = new THREE.Scene();

                        camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000);
                        camera.position.set(0, 5, 35)
                        //camera.position.y = 13;

                        scene.background = new THREE.Color(0xDFD8C8); //Set background color 

                        var light = new THREE.DirectionalLight("#c1582d", 1);
                        var ambient = new THREE.AmbientLight("#85b2cd");
                        light.position.set( 0, -70, 100 ).normalize();
                        scene.add(light);
                        scene.add(ambient);

                        var texture = new THREE.Texture();

                        var loader = new THREE.GLTFLoader();

                        // Load a glTF resource
                        loader.load(
                            // 3d model resource 
                            './assets/models/4test.glb',
                            // called when the resource is loaded
                            function ( gltf ) {

                                    mesh = gltf.scene;
                                    mesh.scale.set( 5, 5, 5 );
                                    scene.add( mesh );

                            },
                            // called when loading is in progresses
                            function ( xhr ) {

                                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                                    if((xhr.loaded / xhr.total * 100) == 100){
                                        modelLoaded = true;


                                        var placeholder = document.getElementById("placeholder");
                                        placeholder.classList.remove("myimage")
                                        placement.classList.remove("loading");
                                    }

                            },
                            // called when loading has errors
                            function ( error ) {

                                    console.log( 'An error happened' );

                            }
                        );

                       
                       

                        renderer = new THREE.WebGLRenderer( { antialias: true } );
                        renderer.setSize( 600, 300 );
                        
                        placement.appendChild( renderer.domElement );

                        renderer.setClearColor(0x00ffff, 1); 
                        renderer.gammaOutput = true;
                        
                        document.addEventListener( 'mousemove', onMouseMove, false );
                        
                        window.addEventListener( 'resize', onResize, false );

                        render()

                    } 

                    function onMouseMove( event ) {

                        if (modelLoaded){
                            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 0;
                        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0;

                        raycaster.setFromCamera(mouse, camera);
                        raycaster.ray.intersectPlane(plane, pointOfIntersection);
                        mesh.lookAt(pointOfIntersection);
                        }
                     
                    }

                    

                    function onResize( event ) {

                        const width = 600 ;
                        const height = 300;
                    
                        windowHalf.set( width / 2, height / 2 );
                        
                        camera.aspect = width / height;
                        camera.updateProjectionMatrix();
                        renderer.setSize( width, height );     
                    }
                    
                    var easeAmount = 8;

                    function update(){
                        look.x += (mouse.x-look.x)/easeAmount;
                        look.y += (mouse.y-look.y)/easeAmount;
                        raycaster.setFromCamera(look, camera);
                        raycaster.ray.intersectPlane(plane, pointOfIntersection);
                        mesh.lookAt(pointOfIntersection);
                    }
                    


                    function render() {
                   
                        camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
                        camera.updateProjectionMatrix();

                        requestAnimationFrame( render );

                        if (modelLoaded){
                            update();
                        }
                        renderer.render( scene, camera );

                    }                 
		