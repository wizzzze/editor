<template>
  <div id="app">
    <toolBar />
    <leftBar />
    <container />
    <progressBar :amount="50"/>
  </div>
</template>

<script>
import toolBar from './components/toolBar'
import leftBar from './components/leftBar'
import container from './components/container'
import progressBar from './components/progress'

export default {
  name: 'App',
  components: {
    toolBar,
    leftBar,
    container,
    progressBar
  }
}
</script>

<style>
body{
  margin:0;
  padding:0;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  bottom:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
