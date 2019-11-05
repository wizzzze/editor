import * as THREE from 'three';
import { HDRCubeTextureLoader } from '../loaders/HDRCubeTextureLoader.js';
import { PMREMGenerator } from '../pmrem/PMREMGenerator.js';
import { PMREMCubeUVPacker } from '../pmrem/PMREMCubeUVPacker.js';

class Scene{

	constructor(renderer){
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('#131313');
		var gridHelper = new THREE.GridHelper( 40, 40 );
		this.scene.add( gridHelper );

		var hdrUrls = [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ];
		this.hdrCubeRenderTarget = null;
		this.hdrCubeMap = new HDRCubeTextureLoader()
			.setPath( 'pisaHDR/' )
			.setDataType( THREE.UnsignedByteType )
			.load( hdrUrls, () => {
				var pmremGenerator = new PMREMGenerator( this.hdrCubeMap );
				pmremGenerator.update( renderer );
				var pmremCubeUVPacker = new PMREMCubeUVPacker( pmremGenerator.cubeLods );
				pmremCubeUVPacker.update( renderer );
				this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
				this.hdrCubeMap.magFilter = THREE.LinearFilter;
				this.hdrCubeMap.needsUpdate = true;
				pmremGenerator.dispose();
				pmremCubeUVPacker.dispose();
				// core.hdrCubeMapLoaded();
				this.scene.background = this.hdrCubeMap;
				renderer.toneMappingExposure = 1;
			} );
	}

	getScene(){
		return this.scene;
	}

	getCubeMap(){
		return this.hdrCubeMap;
	}

	getRenderTarget(){
		return this.hdrCubeRenderTarget;
	}

	add(mesh){
		this.scene.add(mesh);
	}

}

export default Scene;