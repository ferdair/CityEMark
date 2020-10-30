<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="text-h4 text-md-h2 text-center"
          >Tiendas (Bloque {{ bloque }})</v-col
        >
      </v-row>
      <!-- <v-sheet class="mx-auto">
        <v-slide-group show-arrows mandatory v-model="model">
          <v-slide-item
            v-for="cat in categorias"
            :key="cat.id_categoria"
            v-slot="{ active }"
          >
            <v-btn
              class="mx-2"
              :input-value="active"
              active-class="purple white--text"
              depressed
              rounded
              @click="filtrar"
            >
              {{ cat.nombreCat }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet> -->

      <v-row>
        <v-col cols="12">
          <v-chip-group active-class="primary--text">
            <v-chip
              v-for="cat in categorias"
              :key="cat.id_categoria"
              @click="filtrar(cat.id_categoria)"
            >
              {{ cat.nombreCat }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3" v-for="tienda in tiendasfilt" :key="tienda.id">
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
        <v-spacer></v-spacer>
        <v-btn
          class="pr-4"
          to="/tienda/bloque/B"
          depressed
          x-large
          color="yellow darken-1"
        >
          IR A BLOQUE B
        </v-btn>
      </v-row>
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
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
import env from '../../../config/env'
export default {
  name: 'TiendasBloque',
  layout: 'UsuarioIndex',
  data: () => ({
    bloque: '',
    categorias: null,
    tiendas: null,
    tiendasfilt: null,
    vitrinas: [
      require('@/static/vitrina2.jpg'),
      require('@/static/vitrina3.jpg'),
      require('@/static/vitrina4.jpg'),
    ],
  }),
  async mounted() {
    const aux = this.$route.params.bloque + ' '
    this.bloque = aux.toUpperCase()

    const auxCom = await axios.get(env.endpoint + '/auxiliarComercio.php')
    this.categorias = auxCom.data.data[0].categoria

    this.categorias.filter((e) => e.tipoComercio === 1)
    this.categorias.splice(0, 1, { nombreCat: 'Todos' })

    const tb = await axios.get(
      env.endpoint + '/datosComercio.php?id=bloque' + this.bloque
    )

    this.tiendas = tb.data.data
    this.tiendasfilt = tb.data.data
  },
  /*  watch: {
    model: () => {
      this.tiendasfilt = this.tiendas.filter((i) => i.idCategoria)
    },
  }, */
  methods: {
    filtrar(idcat) {
      this.tiendasfilt = this.tiendas.filter((i) => i.idCategoria === idcat)
    },
  },
}
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
</style>
