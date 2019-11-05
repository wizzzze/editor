<template>
  <v-menu
    transition="slide-y-transition"
    bottom
  >
    <template v-slot:activator="{ on }">
      <v-btn
        class="purple"
        color="primary"
        dark
        v-on="on"
      >
        Slide Y Transition
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'fileMenu',

  data: () => ({
    
  }),
};
</script>
