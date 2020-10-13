<template>
  <v-app>
    <div>
      <v-container>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registro de Comercio</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="nombre"
                  :rules="nombreRules"
                  prepend-icon="mdi-store"
                  label="Nombre"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="eslogan"
                  label="Eslogan"
                  :rules="esloganRules"
                  prepend-icon="mdi-bullhorn"
                  required
                >
                </v-text-field>

                <v-text-field
                  v-model="correo"
                  :rules="correoRules"
                  label="Correo"
                  prepend-icon="mdi-email"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="direccion"
                  prepend-icon="mdi-compass"
                  label="Dirección"
                  :rules="direccionRules"
                  required
                ></v-text-field>

                <v-select
                  v-on:change="changeCiudad"
                  v-model="provincia"
                  :items="provincias"
                  item-text="nombreProv"
                  item-key="provincia"
                  item-value="id_provincia"
                  label="Provincia"
                  prepend-icon="mdi-map"
                ></v-select>
                <v-select
                  v-model="ciudad"
                  :items="ciudades"
                  item-text="nombreCiu"
                  item-key="ciudades"
                  item-value="id_ciudad"
                  label="Ciudad"
                  prepend-icon="mdi-map-marker"
                ></v-select>

                <v-select
                  v-on:change="changeCategoria"
                  v-model="tipoComercio"
                  :items="tiposComercio"
                  item-text="nombreTipoComercio"
                  item-key="tipoComercio"
                  item-value="id_tipoComercio"
                  label="Tipo de comercio"
                  prepend-icon="mdi-map"
                ></v-select>

                <v-select
                  v-model="categoria"
                  :items="categorias"
                  item-text="nombreCat"
                  item-key="tipoComercio"
                  item-value="id_categoria"
                  label="Categoría"
                  prepend-icon="mdi-map-marker"
                ></v-select>

                <div>
                  <p>Logo</p>
                  <input @change="uploadImage" type="file" accept="image/*" />
                </div>

                <!-- <uploadImage></uploadImage> -->
              </v-form>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="error" class="mr-4" @click="reset"> Limpiar </v-btn>
            <v-btn color="success" @click="subirImagen">Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
    <v-alert v-if="error" type="error">
      {{ error_msg }}
    </v-alert>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
// import uploadImage from '../../components/uploadImage.vue'
// import firebase from 'firebase'

import env from '../../config/env'

export default {
  name: 'RegistrarComercio',
  data: () => ({
    auxiliares: null,
    valid: true,
    nombre: '',
    nombreRules: [(v) => !!v || 'Nombre es requerido'],
    eslogan: '',
    esloganRules: [(v) => !!v || 'Eslogan es requerido'],
    correo: '',
    correoRules: [
      (v) => !!v || 'Correo es requerido',
      (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
    ],
    direccion: '',
    direccionRules: [(v) => !!v || 'Dirección es requerido'],
    error: false,
    error_msg: '',
    provincias: [],
    provincia: '',
    ciudades: [],
    ciudad: '',
    tipoComercio: '',
    tiposComercio: [],
    categoria: '',
    categorias: [],
    picture: '',
    file: null,
  }),
  computed: {
    ...mapGetters(['getAux', 'loggedInUser']),
    fromDateDisp() {
      return this.fromDateVal
    },
  },
  async created() {
    const {
      data: {
        data: [data],
      },
    } = await axios.get(env.endpoint + '/auxiliarComercio.php')

    this.auxiliares = data

    /* this.provincias = this.getAux.provincia.filter(
      (m) => m.nombreProv !== 'No State'
    ) */

    this.provincias = this.auxiliares.provincia.filter(
      (m) => m.nombreProv !== 'No State'
    )

    this.tiposComercio = this.auxiliares.tipoComercio.filter(
      (m) => m.nombreTipoComercio !== 'Tipo de Comercio'
    )

    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    /*     console.warn(this.getAux.provincia)
     */
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    subirImagen() {
      this.$refs.form.validate()
      const nombre = Date.now()
      /*eslint-disable */
      var storageRef = this.$fireStorageObj().ref().child(`logos/${nombre}`)

      var uploadTask = storageRef.put(this.file)
      /* eslint-enable */

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          /*eslint-disable */

          console.log('Upload is ' + progress + '% done')
          /* eslint-enable */
        },
        (error) => {
          /* this.error = true
          this.error_msg = JSON.stringify(error.message)

          */
          /*eslint-disable */

          console.log(error)
          /* eslint-enable */
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            /*eslint-disable */

            console.log('File available at', downloadURL)
            console.log(downloadURL)
            /* eslint-enable */

            this.picture = downloadURL

            this.registrar()
          })
        }
      )
    },
    async registrar() {
      if (this.$refs.form.validate()) {
        const json = {
          nombre: this.nombre,
          eslogan: this.eslogan,
          correo: this.correo,
          direccion: this.direccion,
          ubicacionGPS: '0,0', // Por defecto 0, 0 (No se pregunta en elfromulario)
          estado: 1, // Por Defecto 1 (No se pregunta en el fromulario)
          ciudad: this.ciudad,
          tipoComercio: this.tipoComercio,
          imagenLogo: this.picture,
          centroComercial: 1, // Por Defecto 1 (No se pregunta en el fromulario)
          numeroLocal: 0, // Por Defecto 0 (No se pregunta en el fromulario)
          categoria: this.categoria,
          palabrasClave: '', // Por Defecto vacio (No se pregunta en el fromulario)
          vendedores: 1, // Por Defecto 1 (No se pregunta en el fromulario)
          observaciones: '', // Por Defecto vacío (No se pregunta en el fromulario)
          tipoInterno: 1,
        }

        const data = await axios.post(env.endpoint + '/datosComercio.php', json)
        if (data.data.code === 200) {
          const patchUser = await axios.patch(
            env.endpoint + '/usuarioComercio.php',
            {
              id: this.loggedInUser.id,
              campo: 'comercio',
              dato: data.data.data[0].id,
            }
          )

          if (patchUser.data.code === 200) {
            this.loggedInUser.idComercio = data.data.data[0].id
            location.replace('/usuarioComercio')
          } else {
            /*eslint-disable */

            console.log('sadasd' + this.loggedInUser.idComercio)
            /* eslint-enable */
            this.error = true
            this.error_msg = data.data.message
          }
        } else {
          /*eslint-disable */

          console.log('Error post')
          /* eslint-enable */
          this.error = true
          this.error_msg = data.data.message
        }
      }
    },
    changeCiudad() {
      this.ciudades = this.auxiliares.ciudad.filter(
        (m) => m.provincia === this.provincia
      )
    },
    changeCategoria() {
      this.categorias = this.auxiliares.categoria.filter(
        (m) => m.tipoComercio === this.tipoComercio
      )
    },
    uploadImage(e) {
      this.file = e.target.files[0]
    },
  },
}
</script>
