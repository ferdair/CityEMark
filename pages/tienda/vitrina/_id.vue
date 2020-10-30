<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-img :src="img" aspect-ratio="1.7" height="100" contain></v-img>
        </v-col>
        <v-col cols="4" class="text-h2 text-md-h3 text-left">
          {{ nombre }}</v-col
        >
        <v-col cols="6" class="text-h2 text-md-h3 text-left"></v-col>
      </v-row>

      <!--  <v-row class="fill-height" align="center" justify="center">
        <template v-for="producto in productos">
          <v-col :key="producto.id_producto" cols="12" md="3">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 16 : 0"
                :class="{ 'on-hover': hover }"
                to="/tienda/bloque/A"
              >
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row> -->
      <v-row class="fill-height" align="center" justify="center">
        <v-col
          cols="12"
          md="3"
          v-for="producto in productos"
          :key="producto.id_producto"
        >
          <v-card elevation="24" class="mx-auto">
            <v-card-title>{{ producto.nombreProducto }}</v-card-title>

            <v-carousel cycle :show-arrows="false" height="200">
              <v-carousel-item
                v-for="(img, i) in producto.imagenes"
                :key="i"
                :src="img.url_imagen"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
            <v-list two-line>
              <v-list-item>
                <v-list-item-content>
                  <!--  <v-list-item-title>{{
                    producto.nombreProducto
                  }}</v-list-item-title> -->
                  <v-list-item-subtitle>{{
                    producto.descripcion
                  }}</v-list-item-subtitle>
                  <v-list-item-subtitle
                    >precio: {{ producto.precioPVP }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >stock: {{ producto.cantDisponible }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8" class="text-h5 text-md-h4 text-center">
          Ver otras Vitrinas</v-col
        >
        <v-col cols="4" class="d-flex justify-center">
          <v-btn
            class="pr-4"
            :to="`/tienda/${idComercio}`"
            depressed
            x-large
            color="yellow darken-1"
          >
            VOLVER A LA TIENDA
          </v-btn></v-col
        >
      </v-row>

      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" md="3" v-for="vit in vitrinasIn" :key="vit.id_vitrina">
          <v-card
            elevation="24"
            class="mx-auto"
            :to="`/tienda/vitrina/${vit.id_vitrina}`"
          >
            <v-card-title>{{ vit.nombreVitrina }}</v-card-title>

            <v-carousel cycle :show-arrows="false" height="200">
              <v-carousel-item
                v-for="(img, i) in vit.imagenes"
                :key="i"
                :src="img.url_imagen"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
            <v-list two-line>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>{{
                    vit.descripcion
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
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
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
import env from '../../../config/env'
export default {
  name: 'Tiendas',
  layout: 'UsuarioIndex',
  data: () => ({
    idComercio: 0,
    comercio: null,
    img: '',
    nombre: '',
    vitrinasIn: null,
    productos: null,
    vitrina: null,
    redes: null,
    telefonos: null,
    correo: '',
    direccion: '',
  }),
  async mounted() {
    const vit = await axios.get(env.endpoint + '/vitrinaComercio.php')

    this.vitrina = vit.data.data.filter(
      (e) => e.id_vitrina === Number(this.$route.params.id)
    )

    this.productos = this.vitrina[0].productos

    this.productos = this.productos.filter((i) => i.estado === 1)
    /*     alert(JSON.stringify(this.productos))
     */
    const com = await axios.get(
      env.endpoint + '/datosComercio.php?id=' + this.vitrina[0].idComercio
    )

    this.comercio = com.data.data[0]
    this.idComercio = this.comercio.id
    this.img = this.comercio.imagenLogo
    this.nombre = this.comercio.nombre
    this.correo = this.comercio.correo
    this.direccion = this.comercio.direccion

    this.vitrinasIn = vit.data.data.filter(
      (e) =>
        e.id_vitrina !== Number(this.$route.params.id) &&
        e.idComercio === this.idComercio &&
        e.estado === 0
    )

    const re = await axios.get(
      env.endpoint + '/redesComercio.php?id=' + this.idComercio
    )

    this.redes = re.data.data

    const te = await axios.get(
      env.endpoint + '/telefonoComercio.php?id=' + this.idComercio
    )

    this.telefonos = te.data.data

    // this.vitrinasIn = this.vitrinasIn.filter((i) => i.estado === 0)
  },
}
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}
</style>
