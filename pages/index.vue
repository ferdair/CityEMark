<template>
  <div>
    <v-carousel hide-delimiters height="300">
      <v-carousel-item
        v-for="(item, i) in carrusel"
        :key="i"
        :src="item"
      ></v-carousel-item>
    </v-carousel>
    <v-container>
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in vitrinas">
          <v-col :key="i" cols="12" md="3">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 16 : 0"
                :class="{ 'on-hover': hover }"
                to="/tienda/bloque/A"
              >
                <v-img :src="item"> </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-h4 text-md-h2 text-center">
          TIENDAS DESTACADAS
        </v-col>
        <v-col cols="12" md="3" v-for="tienda in destacadas" :key="tienda.id">
          <v-hover v-slot="{ hover }"
            ><v-card
              :class="{ 'on-hover': hover }"
              max-width="344"
              :elevation="hover ? 16 : 2"
              :to="`/tienda/${tienda.id}`"
            >
              <v-img :src="tienda.imagenLogo" height="200px"></v-img>

              <v-card-title> {{ tienda.nombre }} </v-card-title>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-h4 text-md-h2 text-center"
          >ENCUENTRA LO QUE BUSCAS</v-col
        >
      </v-row>
      <v-row dense
        ><v-col cols="12">
          <v-card>
            <v-row align="centrer">
              <v-col cols="8">
                <v-text-field
                  class="pl-4"
                  flat
                  label="Correo electrónico"
                  prepend-inner-icon="mdi-magnify"
                  solo-inverted
                  full-width
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-btn class="pr-4" depressed x-large color="yellow darken-1">
                  DESCUBRIR OFERTAS
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
import env from '../config/env'

export default {
  name: 'Index',
  layout: 'UsuarioIndex',
  data: () => ({
    carrusel: [
      require('@/static/imagen1.jpg'),
      require('@/static/imagen2.jpg'),
      require('@/static/imagen3.jpg'),
      require('@/static/imagen4.jpg'),
      require('@/static/imagen6.jpg'),
    ],
    vitrinas: [
      require('@/static/vitrina1.jpg'),
      require('@/static/vitrina2.jpg'),
      require('@/static/vitrina3.jpg'),
      require('@/static/vitrina4.jpg'),
    ],
    destacadas: null,
  }),
  async mounted() {
    const d = await axios.get(env.endpoint + '/datosComercio.php?id=destacados')
    this.destacadas = d.data.data
  },
}
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
</style>
