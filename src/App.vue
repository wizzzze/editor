<template>
  <v-app>
    <v-app-bar
      app
      color="#263238"
      height="46"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="20"
        />
      </div>
      <barMenu v-for="(item, i) in menus" 
        :key="i"
        :title="item.title"
        :items="item.items"
      />

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <container />
    </v-content>
  </v-app>
</template>

<script>
import barMenu from './components/barMenu';
import container from './components/container';
import menuConf from './configs/menuConf';

export default {
  name: 'App',
  components: {
    barMenu,
    container
  },

  data: () => ({
    //
    menus : menuConf
  }),
};
</script>
