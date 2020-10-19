<template>
  <v-app>
    <!-- <v-container>
      <v-row>
        <v-col v-for="vitrina in vitrinas" :key="vitrina.id_vitrina">
          <VitrinaCorrousel
            :id="vitrina.id_vitrina"
            :nombre="vitrina.nombreVitrina"
            :descripcion="vitrina.descripcion"
            v-bind:imgs="[
              'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
              'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            ]"
          ></VitrinaCorrousel>
        </v-col>
      </v-row> </v-container
  -->
    <v-container>
      <v-row>
        <v-col cols="4"> Vitrina </v-col>
        <v-col cols="8"> Productos </v-col>
      </v-row>
      <v-row v-for="vitrina in vitrinas" :key="vitrina.id_vitrina">
        <v-col cols="4">
          <VitrinaCorrousel
            :id="vitrina.id_vitrina"
            :nombre="vitrina.nombreVitrina"
            :descripcion="vitrina.descripcion"
            v-bind:imgs="[
              'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
              'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
            ]"
          ></VitrinaCorrousel>
        </v-col>
        <v-col cols="8">
          <ProductoCorrousel
            v-for="producto in productos"
            :key="producto.id_producto"
            :id="producto.id_producto"
            :nombre="producto.nombreProducto"
            :descripcion="producto.descripcion"
            v-bind:imgs="producto.imagenes"
          ></ProductoCorrousel>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import env from '../../config/env'
import VitrinaCorrousel from '../../components/VitrinaCorrousel'
import ProductoCorrousel from '../../components/ProductoCorrousel'

export default {
  name: 'Vitrinas',
  layout: 'usuarioComercio',
  middleware: ['auth', 'tiendaRed'],
  components: {
    VitrinaCorrousel,
    ProductoCorrousel,
  },
  data: () => ({
    vitrinas: null,
    productos: null,
  }),
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  async created() {
    const {
      data: { data },
    } = await axios.get(
      env.endpoint + '/vitrinaComercio.php?id=' + this.loggedInUser.idComercio
    )
    this.vitrinas = data.filter((m) => m.estado === 0)
    // alert(JSON.stringify(data.filter((m) => m.estado === 0)))
    // alert(this.vitrinas[0].nombreVitrina)

    const pr = await axios.get(
      env.endpoint + '/producto.php?id=' + this.loggedInUser.idComercio
    )

    // estado en producto 1 es activo
    const filt = pr.data.data.filter((p) => p.estado === 1)
    this.productos = filt

    console.log(filt)
  },
}
</script>

<style></style>
