<template>
  <div class="editor_container" id="editor_container">
    <settingBar />
  </div>
</template>

<script>
import Editor from '../core/core';
import settingBar from './settingBar';
export default {
  name: 'editorContainer',
  components: {
    settingBar
  },
  props : {
  },
  data: () => ({

  }),
  mounted() {
    let parentDom = document.getElementById('editor_container');
    let editor = new Editor(parentDom);
    parentDom.appendChild( editor.renderer.domElement );
    editor.init();
    this.$store.dispatch('actionsEditor', editor);
  }
};
</script>
<style>
.editor_container{
  flex-grow: 1;
  display: flex;
  position: relative;
}
</style>