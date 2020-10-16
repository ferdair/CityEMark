<template>
  <v-app
    ><v-container>
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
  ></v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import env from '../../config/env'
import VitrinaCorrousel from '../../components/VitrinaCorrousel'

export default {
  name: 'Vitrinas',
  layout: 'usuarioComercio',
  middleware: ['auth', 'tiendaRed'],
  components: {
    VitrinaCorrousel,
  },
  data: () => ({
    vitrinas: null,
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
  },
}
</script>

<style></style>
