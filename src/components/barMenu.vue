<template>
  <v-menu
    transition="slide-y-transition"
    offset-y
    bottom
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        dark
        v-on="on"
      >
        {{title}}
      </v-btn>
    </template>
    <v-list
      dark
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="item.click"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'barMenu',
  props : {
    title : String,
    items: Array,
  },
  data: () => ({
  }),
};
</script>