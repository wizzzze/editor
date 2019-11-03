import THREE from "three";
import Loader from './loader';
import {ADD_OBJECT,  SET_SCENE} from './events';

class Core{

	constructor(dom){
		this.parentDom = dom;
		this.width = this.parentDom.clientWidth;
		this.height = this.parentDom.clientHeight;

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( this.width, this.height );
		this.parentDom.appendChild( this.renderer.domElement );

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 );

		this.loader = new Loader();
		this.loader.addEventListener( ADD_OBJECT, (event)=>{
			this.scene.add(event.item);
		});

		this.loader.addEventListener( SET_SCENE, (event)=>{
			this.scene = event.scene;
		});

	}


	
}


export default Core;