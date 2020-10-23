<template>
  <v-app>
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
            v-bind:imgs="vitrina.imagenes"
          ></VitrinaCorrousel>
        </v-col>
        <v-col cols="8">
          <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group class="pa-4" active-class="success" show-arrows>
              <v-slide-item>
                <v-card width="150" color="grey lighten-1" max-width="200">
                  <v-row class="fill-height" align="center" justify="center">
                    <v-btn
                      :to="`/vitrina/insertar/${vitrina.id_vitrina}`"
                      nuxt
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-row>
                </v-card>
              </v-slide-item>
              <v-slide-item
                v-for="producto in vitrina.productos"
                :key="producto.id_producto"
              >
                <ProductoCorrousel
                  :id="producto.id_producto"
                  :nombre="producto.nombreProducto"
                  :descripcion="producto.descripcion"
                  v-bind:imgs="producto.imagenes"
                  :precio="producto.precioPVP"
                  :stock="producto.cantDisponible"
                ></ProductoCorrousel>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
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

    const response = await axios.get(
      env.endpoint + '/producto.php?id=' + this.loggedInUser.idComercio
    )

    // estado en producto 1 es activo

    // estado 0 es activo

    this.vitrinas.forEach((element) => {
      const filt = response.data.data.filter(
        (p) => p.vitrina === element.id_vitrina && p.estado === 1
      )
      element.productos = filt
    })
    console.log(response.data.data)

    console.log(this.vitrinas)
  },
}
</script>

<style></style>
