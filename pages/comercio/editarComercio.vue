<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1" editable>
                Categoría
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2" editable>
                Datos
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" editable>Logo</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12">
                  <v-col cols="12">
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
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="categoria"
                      :items="categorias"
                      item-text="nombreCat"
                      item-key="tipoComercio"
                      item-value="id_categoria"
                      label="Categoría"
                      prepend-icon="mdi-map-marker"
                    ></v-select>
                  </v-col>
                </v-card>

                <v-btn color="primary" @click="e1 = 2"> Siguiente </v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mb-12"
                  ><v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="nombre"
                            :rules="nombreRules"
                            prepend-icon="mdi-store"
                            label="Nombre Comercial / Marca *"
                            required
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="eslogan"
                            label="Eslogan o una breve descripción del Negocio *"
                            :rules="esloganRules"
                            prepend-icon="mdi-bullhorn"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="correo"
                            :rules="correoRules"
                            label="Correo electrónico *"
                            prepend-icon="mdi-email"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-container>
                            <v-row>
                              <v-col cols="12" md="5">
                                <v-text-field
                                  v-model="nuevoTelefono"
                                  prepend-icon="mdi-phone"
                                  label="Teléfono *"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" md="5">
                                <v-radio-group v-model="tipoNuevoTelefono">
                                  <v-radio
                                    v-for="n in 3"
                                    :key="n"
                                    :label="`${labelTelefonos[n - 1]}`"
                                    :value="n"
                                  ></v-radio> </v-radio-group></v-col
                              ><v-col cols="12" md="2">
                                <v-btn
                                  class="mx-2"
                                  fab
                                  dark
                                  color="indigo"
                                  @click="agregarTelefono"
                                >
                                  <v-icon dark> mdi-plus </v-icon>
                                </v-btn>
                              </v-col></v-row
                            >
                            <v-row>
                              <v-col>
                                <v-chip-group column>
                                  <v-chip
                                    v-for="(fono, index) in telefonos"
                                    v-bind:key="index"
                                    class="ma-2"
                                    :color="
                                      fono.tipoTelefono == 0
                                        ? 'blue darken-4'
                                        : fono.tipoTelefono == 1
                                        ? 'green darken-4'
                                        : fono.tipoTelefono == 1
                                        ? 'teal'
                                        : 'red'
                                    "
                                    text-color="white"
                                    close
                                    @click:close="quitarTelefono(fono.telefono)"
                                  >
                                    {{ fono.telefono }}
                                  </v-chip>
                                </v-chip-group>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-col>

                        <v-col cols="12" md="6">
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
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="ciudad"
                            :items="ciudades"
                            item-text="nombreCiu"
                            item-key="ciudades"
                            item-value="id_ciudad"
                            label="Ciudad"
                            prepend-icon="mdi-map-marker"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-form> </v-container
                ></v-card>
                <v-btn text> Anterior </v-btn>

                <v-btn color="primary" @click="e1 = 3"> Siguiente </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12">
                  <v-col cols="12">
                    <v-file-input
                      accept="image/*"
                      label="Subir Logo"
                      v-model="file"
                      @change="uploadImage"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-img
                      max-height="150"
                      max-width="250"
                      :src="url"
                    ></v-img> </v-col
                ></v-card>
                <v-btn text> Anterior </v-btn>

                <v-btn color="primary" @click="subirImagen">
                  Guardar Cambios
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="error" :multi-line="true">
      {{ error_msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
// import uploadImage from '../../components/uploadImage.vue'
// import firebase from 'firebase'

import env from '../../config/env'

export default {
  name: 'EditarComercio',
  layout: 'usuarioComercio',
  middleware: ['auth'],
  data: () => ({
    auxteleli: [],
    auxtel: [],
    auxurl: null,
    e1: 1,
    url: null,
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
    nuevoTelefono: '',
    tipoNuevoTelefono: null,
    telefonos: [],
    labelTelefonos: [
      'Teléfono sólo llamadas',
      'Teléfono solo Whatsapp',
      'Teléfono para Llamadas y Whatsapp',
    ],
    nuevaRed: '',
    nuevoTipoRed: null,
    redesSociales: [],
    tiposRedes: null,
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

    this.provincias = this.auxiliares.provincia.filter(
      (m) => m.nombreProv !== 'No State'
    )

    this.tiposComercio = this.auxiliares.tipoComercio.filter(
      (m) => m.nombreTipoComercio !== 'Tipo de Comercio'
    )

    const redessoc = await axios.get(
      env.endpoint + '/redesComercio.php?id=tipoRedSocial'
    )
    this.tiposRedes = redessoc.data.data
  },
  async mounted() {
    const com = await axios.get(
      env.endpoint + '/datosComercio.php?id=' + this.loggedInUser.idComercio
    )

    const tel = await axios.get(
      env.endpoint + '/telefonoComercio.php?id=' + com.data.data[0].id
    )

    this.tipoComercio = com.data.data[0].idTipoComercio
    this.categoria = com.data.data[0].idCategoria
    this.nombre = com.data.data[0].nombre
    this.eslogan = com.data.data[0].eslogan

    this.correo = com.data.data[0].correo

    this.provincia = this.auxiliares.ciudad.find(
      (ciud) => ciud.id_ciudad === com.data.data[0].idCiudad
    ).provincia
    this.ciudad = com.data.data[0].idCiudad

    this.url = com.data.data[0].imagenLogo
    this.auxurl = com.data.data[0].imagenLogo
    this.changeCategoria()
    this.changeCiudad()
    // tel.data.data.telefono = tel.data.data.numeroTelefono

    tel.data.data.forEach((element) => {
      this.telefonos.push({
        id: element.id_telefono,
        estado: element.estado,
        telefono: element.numeroTelefono,
        idComercio: element.idComercio,
        tipoTelefono: element.tipoTelefono,
      })
    })

    // estado activo = 0
    this.telefonos = this.telefonos.filter((e) => e.estado === 0)

    this.auxtel = new Set(this.telefonos.map((a) => a.telefono))
    this.auxteleli = new Set()

    // this.telefonos = tel.data.data
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
      try {
        if (this.file) {
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
              this.error = true
              this.error_msg = 'La carga está completa en un ' + progress + '%'
              // console.log('Upload is ' + progress + '% done')
              /* eslint-enable */
            },
            (error) => {
              /* this.error = true
          this.error_msg = JSON.stringify(error.message)

          */
              /*eslint-disable */
              this.error = true
              this.error_msg = error
              // console.log(error)
              /* eslint-enable */
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                /*eslint-disable */

                // console.log('File available at', downloadURL)
                // console.log(downloadURL)
                /* eslint-enable */

                this.picture = downloadURL

                this.registrar()
              })
            }
          )
        } else {
          this.picture = this.auxurl

          this.registrar()
        }
      } catch (error) {
        this.error = true
        this.error_msg = error
        // alert('Subiendo imagen' + error)
        this.picture = this.auxurl
        this.registrar()
      }
    },
    async registrar() {
      const json = {
        id: this.loggedInUser.idComercio,
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

      const data = await axios.put(env.endpoint + '/datosComercio.php', json)

      if (data.data.code === 200) {
        this.auxteleli.forEach((element) => {
          if (element[0].id) {
            axios.patch(env.endpoint + '/telefonoComercio.php', {
              id: element[0].id,
              campo: 'estado',
              dato: 2,
            })
          }
        })

        this.telefonos.forEach((element) => {
          if (!element.id) {
            axios.post(env.endpoint + '/telefonoComercio.php', {
              numeroTelefono: element.telefono,
              idComercio: this.loggedInUser.idComercio,
              tipoTelefono: element.tipoTelefono,
            })
          }
        })

        this.error = true
        this.error_msg = data.data.message
      } else {
        this.error = true
        this.error_msg = data.data.message
      }
    },
    changeCiudad() {
      //  alert(JSON.stringify(this.auxiliares))

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
      if (this.file) {
        this.url = URL.createObjectURL(this.file)
      } else {
        this.url = ''
      }
      // alert(this.file)
    },
    agregarTelefono() {
      this.telefonos.push({
        telefono: this.nuevoTelefono,
        tipoTelefono: this.tipoNuevoTelefono - 1,
      })
      this.nuevoTelefono = ''
    },
    quitarTelefono(numero) {
      const e = this.telefonos.filter((i) => i.telefono === numero)
      this.auxteleli.add(e)
      this.telefonos = this.telefonos.filter((i) => i.telefono !== numero)
    },
    agregarRedSocial() {
      // alert(this.nuevoTipoRed)
      this.redesSociales.push({
        urlRedSocial: this.nuevaRed,
        idTipoRedSocial: this.nuevoTipoRed,
      })

      this.nuevaRed = ''
    },
    quitarRed(red) {
      this.redesSociales = this.redesSociales.filter(
        (i) => i.urlRedSocial !== red
      )
    },
  },
}
</script>
