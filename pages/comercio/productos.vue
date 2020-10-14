<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <productoCard v-bind="productos"></productoCard>
        </v-col>
        <v-col cols="12" md="4">
          <productoCard v-bind="productos"></productoCard>
        </v-col>
        <v-col cols="12" md="4">
          <productoCard v-bind="productos"></productoCard>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
/* import { mapGetters } from 'vuex'
import axios from 'axios'
import env from '../../config/env' */

import productoCard from '../../components/productoCard'
export default {
  name: 'Productos',
  layout: 'usuarioComercio',
  middleware: ['auth', 'tiendaRed'],
  components: {
    productoCard,
  },
  data: () => ({
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
    productos: [
      {
        nombre: 'String',
        stock: 'Number',
        img: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
  }),
}
</script>

<style></style>
