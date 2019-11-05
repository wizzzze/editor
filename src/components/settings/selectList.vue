<template>
    <div class="group">
      <div class="group-label">
        <label>{{title}}</label>
      </div>
      <div class="group-select">
        <select>
          <option v-for="(option, i) in options" :key="i"
            :value="option.value">
            {{option.text}}
          </option>
        </select>
      </div>
    </div>
</template>

<script>
export default {
  name: 'selectList',
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
  font-size: 13px;
}
.group-select{
  flex-grow:2;
  padding: 0 6px;
}
.group select{
  height:30px;
  width:100% !important;
  display: inline-block;
  line-height:30px;
  padding-left:10px;
  background-color:#263238;
  outline:none;
  color:#E7E7E7;
  font-size:12px;
  /*border:1px solid #D7D7D7;*/
}
</style>