<template>
  <div class="mainContainer">
    <div class="leftContainer">
      <editorContainer />
      <contentPanel />
    </div>
    <div class="rightContainer">
      <materialPanel />
    </div>
  </div>
</template>

<script>
  import editorContainer from './editorContainer';
  import contentPanel from './contentPanel';
  import materialPanel from './materialPanel';
export default {
  name: 'container',
  components: {
    editorContainer,
    contentPanel,
    materialPanel
  },
  props : {
  },
  data: () => ({
  }),
};
</script>
<style>
.mainContainer{
  /*position:absolute;*/
  width:100%;
  height: 100%;
  display: flex;
  padding:0;
}
.leftContainer{
  flex-grow:1;
  display: flex;
  flex-direction: column;
}
.rightContainer{
  display: flex;
  width:360px;
  flex-direction: column;
  background-color:#324249;
}
</style>