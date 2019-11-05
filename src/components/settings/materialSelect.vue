<template>
    <div class="group material-select">
      <div class="group-material-prview">
        
      </div>
      <div class="group-select">
        
      </div>
    </div>
</template>

<script>
  import * as THREE from "three";
export default {
  name: 'materialSelect',
  components: {
  },
  props : {
    options: Array,
    material,
  },
  data: () => ({
    select : null
  }),

  mounted(){
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( 60, 60 );

    let camera = new THREE.PerspectiveCamera( 45, 1, 0.1, 1000 );
    let camera.position.x = 30;
    let camera.position.y = 30;
    let camera.position.z = 30;

    let scene = new THREE.Scene();


  }
};
</script>
<style>
.material-select{
  /*height:80px;*/
}
.group-material-prview{
  height:60px;
  width:80px;
}
</style>