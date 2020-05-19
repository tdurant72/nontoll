<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>Nontoll Routes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Nontoll/>
    </v-content>
  </v-app>
</template>

<script>

import Nontoll from './components/Nontoll';
export default {
  name: 'App',

  components: {
    Nontoll,
  },

  data: () => ({
    //
  }),
  
};
</script>
