<template>
  <v-app>
    <template>
      <v-row>
        <v-col cols="12">
          <v-btn to="/promociones/nuevo">Nuevo</v-btn>
        </v-col>
        <v-col v-for="promo in promos" :key="promo.id_promo" cols="12" md="4">
          <PromocionCard v-bind="promo"></PromocionCard>
        </v-col>
      </v-row>
    </template>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import PromocionCard from '../../components/promocionCard'

import env from '../../config/env'

export default {
  name: 'Promociones',
  layout: 'usuarioComercio',
  middleware: ['auth'],
  components: { PromocionCard },
  data: () => ({
    promociones: null,
    promos: [],
  }),
  async mounted() {
    const pr = await axios.get(
      env.endpoint + '/promocionComercio.php?id=' + this.loggedInUser.idComercio
    )
    this.promociones = pr.data.data.filter((i) => i.estado === 0)

    // this.promociones

    this.promociones.forEach((element) => {
      const a = {
        id: element.id_promo,
        nombre: element.nombrePromo,
        descripcion: element.descripcionPromo,
        fechaFin: element.fechaFin,
        valorDescuento: element.valorDescuento,
        img: element.urlBannerImagen,
      }

      this.promos.push(a)
    })
  },
  computed: {
    ...mapGetters(['getAux', 'loggedInUser']),
  },
}
</script>

<style></style>
