<template>
  <div class="group">
    <div class="group-label">
      <label>{{title}}</label>
    </div>
    <div>
      <div class="input-group">
        <div v-for="(option, i) in options" :key="i">
          <input type="text" :placeholder="option.label" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select',
  components: {
  },
  props : {
    title: String,
    options: Array,
  },
  data: () => ({
    select : null
  }),
};
</script>
<style>

.group{
  height:40px;
  line-height:40px;
  display: flex;
  padding:5px 15px;
}
.group-label{
  min-width:80px;
  text-align: left;
}
.group-label>label{
  color:#E7E7E7;
  font-size: 12px;
}
.input-group{
  width:100%;
  height:40px;
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.input-group>div{
  padding:6px;
  position:relative;
}
.input-group>div>input{
  height:30px;
  width:100% !important;
  display: inline-block;
  line-height:30px;
  padding-left:10px;
  background-color:#263238;
  outline:none;
  color:#E7E7E7;
  border-radius: 2px;
  font-size: 12px;
  border:0.5px solid #212933;
}
</style>