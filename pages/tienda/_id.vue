<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-h5 text-md-h4 text-right"
          >BLOQUE {{ bloque }} - LOCAL N°{{ num }}
        </v-col>
        <v-col cols="4">
          <v-img :src="img" aspect-ratio="1.7" height="100" contain></v-img>
        </v-col>
        <v-col cols="8" class="text-h2 text-md-h3 text-left">
          {{ nombre }}</v-col
        >
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="vit in vitrinas"
          :key="vit.id_vitrina"
          class="d-flex justify-center"
        >
          <v-hover v-slot="{ hover }"
            ><v-card
              :class="{ 'on-hover': hover }"
              max-width="344"
              :elevation="hover ? 16 : 2"
              :to="`/tienda/vitrina/${vit.id_vitrina}`"
            >
              <v-card-title> {{ vit.nombreVitrina }} </v-card-title>

              <v-img :src="vit.imagenes[0].url_imagen" height="200px"></v-img>
              <v-card-text>{{ vit.descripcion }}</v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center text-h5 text-md-h4" cols="12">
          Siguenos en</v-col
        >
        <v-col cols="4" v-for="red in redes" :key="red.id_redes">
          <v-btn class="mx-4" icon :href="red.urlRedSocial" target="_blank">
            <v-icon x-large>{{ red.icono }}</v-icon>
          </v-btn>
          {{ red.nombreTipoRedSocial }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-h5 text-md-h4 text-center"
          >Contáctenos</v-col
        >
        <v-col cols="12" md="6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3152435346656!2d-79.68914988586427!3d0.9098771993362572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fd4bf0cd4bf9fb7%3A0x39d0d07631469146!2sCuerpo%20de%20Bomberos!5e0!3m2!1ses!2sec!4v1604039177001!5m2!1ses!2sec"
            frameborder="0"
            style="border: 0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
            height="450"
            width="450"
          ></iframe>
        </v-col>
        <v-col cols="12" md="6">
          <div v-for="tele in telefonos" :key="tele.id_telefono">
            <v-icon>mdi-phone</v-icon>{{ tele.numeroTelefono }}
          </div>
          <v-row> <v-icon>mdi-at</v-icon>{{ correo }} </v-row>
          <v-row> Dirección:</v-row>
          <v-row> {{ direccion }} </v-row>
          <v-row><v-btn outlined>Cómo llegar</v-btn></v-row>
        </v-col>
      </v-row>
      <v-row class="fill-height" align="center" justify="center">
        <template v-for="(item, i) in vitrinasIn">
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
import env from '../../config/env'
export default {
  name: 'Tiendas',
  layout: 'UsuarioIndex',
  data: () => ({
    bloque: '',
    comercio: null,
    num: 0,
    img: '',
    nombre: '',
    vitrinas: null,
    redes: null,
    telefonos: null,
    correo: '',
    direccion: '',
    vitrinasIn: [
      require('@/static/vitrina1.jpg'),
      require('@/static/vitrina2.jpg'),
      require('@/static/vitrina3.jpg'),
      require('@/static/vitrina4.jpg'),
    ],
  }),
  async mounted() {
    const com = await axios.get(
      env.endpoint + '/datosComercio.php?id=' + this.$route.params.id
    )

    this.comercio = com.data.data[0]

    this.bloque =
      this.comercio.numeroLocal > 100 && this.comercio.numeroLocal < 200
        ? 'A'
        : 'B'

    this.num = this.comercio.numeroLocal
    this.img = this.comercio.imagenLogo
    this.nombre = this.comercio.nombre
    this.correo = this.comercio.correo
    this.direccion = this.comercio.direccion

    const vit = await axios.get(
      env.endpoint + '/vitrinaComercio.php?id=' + this.$route.params.id
    )

    this.vitrinas = vit.data.data

    const re = await axios.get(
      env.endpoint + '/redesComercio.php?id=' + this.$route.params.id
    )

    this.redes = re.data.data

    const te = await axios.get(
      env.endpoint + '/telefonoComercio.php?id=' + this.$route.params.id
    )

    this.telefonos = te.data.data
  },
}
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
</style>
