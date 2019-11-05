<template>
  <div class="material_panel">
    <div class="material_preview">
    </div>
    <div class="material_setting_panel">
      <div class="setting_panel" 
        v-for="(item, i) in settings"
        :key="i"
      >
        <div class="setting_panel_header">
          {{item.title}}
        </div>
        <div class="setting_panel_body">
          <component v-for="(settingComponent, index) in item.items" :key="index"
            :is="settingComponent.type"
            :options="settingComponent.options"
            :title="settingComponent.title"
          >
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import settings from '../configs/setting';
  import selectList from './settings/selectList';
  import inputGroup from './settings/inputGroup';
export default {
  name: 'materialPanel',
  components: {
    selectList, inputGroup
  },
  props : {
  },
  data: () => ({
    settings : settings
  }),
};
</script>
<style>
.material_panel{
  width:100%; 
  display: flex;
  padding:0;
  flex-direction: column;
}

.material_preview{
  width:100%;
  min-height:200px;
  max-height:400px;
  background-color: #263238;
}
.material_setting_panel{
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
.setting_panel{
  width:100%;
  margin-bottom:15px;
}

.setting_panel_header{
  width:100%;
  height:30px;
  background-color: #21282f;
  padding-left:10px;
  display: flex;
  align-items: center;
  color:#C7C7C7;
  font-weight: bold;
  letter-spacing: 2px;
  font-size:12px;
}
</style>