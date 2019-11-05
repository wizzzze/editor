import * as THREE from 'three';
import JSZip from 'jszip';
import {ADD_OBJECT} from './events';
import {AMFLoader} from '../loaders/AMFLoader';
// import {AWDLoader} from '../loaders/AWDLoader';
// import {BabylonLoader} from '../loaders/BabylonLoader';
import {ColladaLoader} from '../loaders/ColladaLoader';
import {DRACOLoader} from '../loaders/DRACOLoader';
import {FBXLoader} from '../loaders/FBXLoader';
import {GLTFLoader} from '../loaders/GLTFLoader';
import {LegacyGLTFLoader} from '../loaders/LegacyGLTFLoader';
import {KMZLoader} from '../loaders/KMZLoader';
import {MD2Loader} from '../loaders/MD2Loader';
import {OBJLoader} from '../loaders/OBJLoader';
import {MTLLoader} from '../loaders/MTLLoader';
// import {PlayCanvasLoader} from '../loaders/PlayCanvasLoader';
import {PLYLoader} from '../loaders/PLYLoader';
import {STLLoader} from '../loaders/STLLoader';
import {SVGLoader} from '../loaders/SVGLoader';
// import {TGALoader} from '../loaders/TGALoader';
import {TDSLoader} from '../loaders/TDSLoader';
// import {VRMLLoader} from '../loaders/VRMLLoader';
import {VTKLoader} from '../loaders/VTKLoader';
// import {CTMLoader} from '../loaders/CTMLoader';

class Loader extends THREE.EventDispatcher{
	
	constructor(){
		super();
		this.form = document.createElement('form');
		this.form.style.display = 'none';
		document.body.appendChild(this.form);
		
		this.input = document.createElement('input');
		this.input.multiple = true;
		this.input.type = 'file';

		this.input.addEventListener('change', (event)=>{
			console.log(event);
			this.loadFiles(event.target.files);
		});

		this.form.appendChild(this.input);
	}

	upload(){
		this.input.click();
	}

	loadFiles(files){
		if ( files.length > 0 ) {

			var filesMap = this.createFileMap( files );
			var manager = new THREE.LoadingManager();
			manager.setURLModifier( function ( url ) {

				var file = filesMap[ url ];

				if ( file ) {

					// console.log( 'Loading', url );

					return URL.createObjectURL( file );

				}

				return url;

			} );

			for ( var i = 0; i < files.length; i ++ ) {

				this.loadFile( files[ i ], manager );

			}

		}
	}

	loadFile(file, manager){

		function handleZIP( contents ) {

			var zip = new JSZip( contents );

			// Poly

			if ( zip.files[ 'model.obj' ] && zip.files[ 'materials.mtl' ] ) {

				var materials = new MTLLoader().parse( zip.file( 'materials.mtl' ).asText() );
				var object = new OBJLoader().setMaterials( materials ).parse( zip.file( 'model.obj' ).asText() );

				this.dispatchEvent({ type : ADD_OBJECT, item : object });

			}

			//

			zip.filter( function ( path, file ) {

				var manager = new THREE.LoadingManager();
				manager.setURLModifier( function ( url ) {

					var file = zip.files[ url ];

					if ( file ) {

						// console.log( 'Loading', url );

						var blob = new Blob( [ file.asArrayBuffer() ], { type: 'application/octet-stream' } );
						return URL.createObjectURL( blob );

					}

					return url;

				} );

				var extension = file.name.split( '.' ).pop().toLowerCase();

				switch ( extension ) {

					case 'fbx':
						var loader = new FBXLoader( manager );
						var object = loader.parse( file.asArrayBuffer() );
						this.dispatchEvent({ type : ADD_OBJECT, item : object });
						break;
					case 'glb':

						var glbLoader = new GLTFLoader();
						glbLoader.parse( file.asArrayBuffer(), '', function ( result ) {

							var scene = result.scene;

							this.dispatchEvent({ type : ADD_OBJECT, item : scene });

						} );

						break;
					case 'gltf':

						var gltfLoader = new GLTFLoader( manager );
						gltfLoader.parse( file.asText(), '', function ( result ) {

							var scene = result.scene;
							
							this.dispatchEvent({ type : ADD_OBJECT, item : scene });

						} );

						break;

				}

			} );

		}

		function isGLTF1( contents ) {

			let resultContent;

			if ( typeof contents === 'string' ) {

				// contents is a JSON string
				resultContent = contents;

			} else {

				let magic = THREE.LoaderUtils.decodeText( new Uint8Array( contents, 0, 4 ) );

				if ( magic === 'glTF' ) {

					// contents is a .glb file; extract the version
					let version = new DataView( contents ).getUint32( 4, true );

					return version < 2;

				} else {

					// contents is a .gltf file
					resultContent = THREE.LoaderUtils.decodeText( new Uint8Array( contents ) );

				}

			}

			let json = JSON.parse( resultContent );

			return ( json.asset != undefined && json.asset.version[ 0 ] < 2 );

		}

		let filename = file.name;
		let extension = filename.split( '.' ).pop().toLowerCase();

		let reader = new FileReader();
		// reader.addEventListener( 'progress', function ( event ) {

		// 	var size = '(' + Math.floor( event.total / 1000 ).format() + ' KB)';
		// 	var progress = Math.floor( ( event.loaded / event.total ) * 100 ) + '%';

		// 	return ( 'Loading', filename, size, progress );

		// } );

		switch ( extension ) {

			case '3ds':

				reader.addEventListener( 'load', ( event ) => {

					let loader = new TDSLoader();
					let object = loader.parse( event.target.result );

					this.dispatchEvent({ type : ADD_OBJECT, item : object });

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'amf':

				reader.addEventListener( 'load', ( event ) => {

					let loader = new AMFLoader();
					let amfobject = loader.parse( event.target.result );

					this.dispatchEvent({ type : ADD_OBJECT, item : amfobject });

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'dae':

				reader.addEventListener( 'load', ( event ) => {

					let contents = event.target.result;

					let loader = new ColladaLoader( manager );
					let collada = loader.parse( contents );

					collada.scene.name = filename;

					this.dispatchEvent({ type : ADD_OBJECT, item : collada.scene });

				}, false );
				reader.readAsText( file );

				break;

			case 'fbx':

				reader.addEventListener( 'load', ( event ) => {

					let contents = event.target.result;

					let loader = new FBXLoader( manager );
					let object = loader.parse( contents );

					this.dispatchEvent({ type : ADD_OBJECT, item : object });

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'glb':

				reader.addEventListener( 'load', ( event ) => {

					let contents = event.target.result;

					let dracoLoader = new DRACOLoader();
					dracoLoader.setDecoderPath( '../examples/js/libs/draco/gltf/' );

					let loader = new GLTFLoader();
					loader.setDRACOLoader( dracoLoader );
					loader.parse( contents, '', function ( result ) {

						let scene = result.scene;
						scene.name = filename;

						this.dispatchEvent({ type : ADD_OBJECT, item : scene });

					} );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'gltf':

				reader.addEventListener( 'load', ( event ) => {

					let contents = event.target.result;

					let loader;

					if ( isGLTF1( contents ) ) {

						loader = new LegacyGLTFLoader( manager );

					} else {

						loader = new GLTFLoader( manager );

					}

					loader.parse( contents, '', function ( result ) {

						let scene = result.scene;
						scene.name = filename;

						this.dispatchEvent({ type : ADD_OBJECT, item : scene });

					} );

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'js':
			case 'json':
			case '3geo':
			case '3mat':
			case '3obj':
			case '3scn':

				reader.addEventListener( 'load', ( event ) => {

					let contents = event.target.result;

					// 2.0

					if ( contents.indexOf( 'postMessage' ) !== - 1 ) {

						let blob = new Blob( [ contents ], { type: 'text/javascript' } );
						let url = URL.createObjectURL( blob );

						let worker = new Worker( url );

						worker.onmessage = function ( event ) {

							event.data.metadata = { version: 2 };
							this.handleJSON( event.data, file, filename );

						};

						worker.postMessage( Date.now() );

						return;

					}

					// >= 3.0

					let data;

					try {

						data = JSON.parse( contents );

					} catch ( error ) {

						alert( error );
						return;

					}

					this.handleJSON( data, file, filename );

				}, false );
				reader.readAsText( file );

				break;


			case 'kmz':

				reader.addEventListener( 'load', ( event ) => {

					let loader = new KMZLoader();
					var collada = loader.parse( event.target.result );

					collada.scene.name = filename;

					this.dispatchEvent({ type : ADD_OBJECT, item : collada.scene });

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'md2':

				reader.addEventListener( 'load', ( event ) => {

					var contents = event.target.result;

					var geometry = new MD2Loader().parse( contents );
					var material = new THREE.MeshStandardMaterial( {
						morphTargets: true,
						morphNormals: true
					} );

					var mesh = new THREE.Mesh( geometry, material );
					mesh.mixer = new THREE.AnimationMixer( mesh );
					mesh.name = filename;

					this.dispatchEvent({ type : ADD_OBJECT, item : mesh });

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'obj':

				reader.addEventListener( 'load', ( event ) => {

					var contents = event.target.result;

					var object = new OBJLoader().parse( contents );
					object.name = filename;

					this.dispatchEvent({ type : ADD_OBJECT, item : object });

				}, false );
				reader.readAsText( file );

				break;

			case 'ply':

				reader.addEventListener( 'load', ( event ) => {

					var contents = event.target.result;

					var geometry = new PLYLoader().parse( contents );
					geometry.sourceType = "ply";
					geometry.sourceFile = file.name;

					var material = new THREE.MeshStandardMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

					this.dispatchEvent({ type : ADD_OBJECT, item : mesh });

				}, false );
				reader.readAsArrayBuffer( file );

				break;

			case 'stl':

				reader.addEventListener( 'load', ( event ) => {

					var contents = event.target.result;

					var geometry = new STLLoader().parse( contents );
					geometry.sourceType = "stl";
					geometry.sourceFile = file.name;

					var material = new THREE.MeshStandardMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

					this.dispatchEvent({ type : ADD_OBJECT, item : mesh });

				}, false );

				if ( reader.readAsBinaryString !== undefined ) {

					reader.readAsBinaryString( file );

				} else {

					reader.readAsArrayBuffer( file );

				}

				break;

			case 'svg':

				reader.addEventListener( 'load', ( event ) => {

					var contents = event.target.result;

					let loader = new SVGLoader();
					var paths = loader.parse( contents ).paths;

					//

					var group = new THREE.Group();
					group.scale.multiplyScalar( 0.1 );
					group.scale.y *= - 1;

					for ( var i = 0; i < paths.length; i ++ ) {

						var path = paths[ i ];

						var material = new THREE.MeshBasicMaterial( {
							color: path.color,
							depthWrite: false
						} );

						var shapes = path.toShapes( true );

						for ( var j = 0; j < shapes.length; j ++ ) {

							var shape = shapes[ j ];

							var geometry = new THREE.ShapeBufferGeometry( shape );
							var mesh = new THREE.Mesh( geometry, material );

							group.add( mesh );

						}

					}

					this.dispatchEvent({ type : ADD_OBJECT, item : group });

				}, false );
				reader.readAsText( file );

				break;

			case 'vtk':

				reader.addEventListener( 'load', ( event ) => {

					var contents = event.target.result;

					var geometry = new VTKLoader().parse( contents );
					geometry.sourceType = "vtk";
					geometry.sourceFile = file.name;

					var material = new THREE.MeshStandardMaterial();

					var mesh = new THREE.Mesh( geometry, material );
					mesh.name = filename;

					this.dispatchEvent({ type : ADD_OBJECT, item : mesh });

				}, false );
				reader.readAsText( file );

				break;

			case 'wrl':

				reader.addEventListener( 'load', (  ) => {

					throw "后面再加。。。";
					// var contents = event.target.result;

					// var result = new VRMLLoader().parse( contents );

					// this.dispatchEvent({ type : SET_SCENE, scene : result });

				}, false );
				reader.readAsText( file );

				break;

			case 'zip':

				reader.addEventListener( 'load', ( event ) => {

					handleZIP( event.target.result );

				}, false );
				reader.readAsBinaryString( file );

				break;

			default:

				// alert( 'Unsupported file format (' + extension +  ').' );
				break;

		}

	}

	createFileMap( files ) {

		var map = {};

		for ( var i = 0; i < files.length; i ++ ) {

			var file = files[ i ];
			map[ file.name ] = file;

		}

		return map;

	}

	handleJSON( data ) {

		if ( data.metadata === undefined ) { // 2.0

			data.metadata = { type: 'Geometry' };

		}

		if ( data.metadata.type === undefined ) { // 3.0

			data.metadata.type = 'Geometry';

		}

		if ( data.metadata.formatVersion !== undefined ) {

			data.metadata.version = data.metadata.formatVersion;

		}

		switch ( data.metadata.type.toLowerCase() ) {

			case 'buffergeometry':

				var loader = new THREE.BufferGeometryLoader();
				var result = loader.parse( data );

				var mesh = new THREE.Mesh( result );

				this.dispatchEvent({ type : ADD_OBJECT, item : mesh });

				break;

			case 'geometry':

				// console.error( 'Loader: "Geometry" is no longer supported.' );


				break;

			case 'object':

				var objLoader = new THREE.ObjectLoader();
				objLoader.setResourcePath( this.texturePath );

				var objResult = objLoader.parse( data );

				if ( objResult.isScene ) {

					this.dispatchEvent({ type : ADD_OBJECT, item : objResult });

				} else {

					this.dispatchEvent({ type : ADD_OBJECT, item : objResult });

				}

				break;

			case 'app':

				// editor.fromJSON( data );

				break;

		}

	}

}

export default Loader;