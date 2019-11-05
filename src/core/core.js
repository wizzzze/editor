import * as THREE from 'three';
import Loader from './loader';
import Scene from './scene';
import {OrbitControls} from './orbitControls';
import {ADD_OBJECT,  SET_SCENE} from './events';
import editorStore from '../store';

class Core extends THREE.EventDispatcher{

	constructor(dom){
		super();
		this.parentDom = dom;
		this.width = this.parentDom.clientWidth;
		this.height = this.parentDom.clientHeight;

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize( this.width, this.height );

		this.renderer.gammaOutput = true;

		this.scene = new Scene(this.renderer);

		this.modelGroup = new THREE.Group();
		this.scene.add(this.modelGroup);

		this.raycaster = new THREE.Raycaster;
		this.mouse = new THREE.Vector2();

		this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 0.1, 1000 );
		this.camera.position.x = 30;
		this.camera.position.y = 30;
		this.camera.position.z = 30;

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.loader = new Loader();

		this.loader.addEventListener( ADD_OBJECT, (event)=>{
			this.addToScene(event.item);
		});

		this.loader.addEventListener( SET_SCENE, (event)=>{
			this.addToScene(event.scene);
		});
	}

	addToScene(item){
		if(item instanceof THREE.Mesh){
			this.modelGroup.add(item);
			editorStore.dispatch('actionsAddModel', item);
			this.setDefaultMaterial(item);
			if(item.material.envMap !== undefined){
				item.material.envMap = this.scene.getCubeMap();
				item.material.needsUpdate = true;
			}
		}else{
			item.children.forEach((child)=>{
				this.addToScene(child);
			});
		}
		
	}

	setDefaultMaterial(item){
		if(!item.material.isMeshStandardMaterial){
			item.material = new THREE.MeshStandardMaterial({
				color: 0xffffff,
				metalness: 0,
				roughness: 1
			});
		}
	}

	hdrCubeMapLoaded(){
		// this.scene.getScene().background = cubeMap;
	}

	animate() {
		requestAnimationFrame( ()=>{this.animate()} );
		// this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
		this.renderer.render( this.scene.getScene(), this.camera );
	}

	init() {
		this.animate();
	}

}


export default Core;