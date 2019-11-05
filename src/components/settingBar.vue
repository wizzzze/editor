<template>
  <div class="model_setting_bar" id="model_setting_bar">
    <v-btn text small dark>
      <v-icon dark size="18">mdi-checkbox-marked-circle</v-icon>
    </v-btn>
    <v-btn text small dark>Normal</v-btn>
    <v-btn text small dark>Normal</v-btn>
    <v-btn text small dark>Normal</v-btn>
  </div>
</template>

<script>
export default {
  name: 'settingBar',
  props : {
  },
  data: () => ({

  }),
  mounted() {
  }
};
</script>
<style>
.model_setting_bar{
  position: absolute;
  right:5px;
  top:5px;
  height:30px;
  z-index: 99;
}
</style>