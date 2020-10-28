<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span class="headline">Datos de la vitrina</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid2" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Nombre"
                        required
                        v-model="nombrev"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Descripción"
                        required
                        v-model="descripcionv"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        accept="image/*"
                        label="Subir Imágenes"
                        v-model="files"
                        @change="generarUrl"
                        chips
                        multiple
                        counter="6"
                        :clearable="false"
                      ></v-file-input>
                    </v-col>
                    <v-col
                      v-for="(img, index) in imgsv"
                      :key="img.id_imgVitrina"
                      cols="12"
                      md="4"
                    >
                      <v-item>
                        <v-img
                          max-height="150"
                          max-width="250"
                          class="pa-1"
                          :src="img.url_imgVitrina"
                          @click="quitarImg(img.id_imgVitrina, index)"
                          ><v-btn icon dark>
                            <v-icon color="red">
                              mdi-close-circle
                            </v-icon></v-btn
                          ></v-img
                        >
                      </v-item>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="blue darken-1" text> Regresar </v-btn>
              <v-btn color="ref" text @click="editarRegistro()">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
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
import { mapGetters } from 'vuex'

import env from '../../../config/env'

export default {
  name: 'EditarVitrina',
  layout: 'usuarioComercio',
  middleware: ['auth'],
  data: () => ({
    error: false,
    error_msg: '',
    files: null,
    auximgeli: [],
    auximg: [],
    nombrev: '',
    descripcionv: '',
    imgsv: null,
    valid2: true,
    vitrina: null,
    auxinput: true,
    picture: null,
  }),

  computed: {
    ...mapGetters(['getAux', 'loggedInUser']),
    imgdisp() {
      return this.imgsv
    },
  },
  async mounted() {
    const v = await axios.get(
      env.endpoint + '/vitrinaComercio.php?id=' + this.loggedInUser.idComercio
    )

    const r = Number(this.$route.params.id)
    this.vitrina = v.data.data.filter((x) => x.id_vitrina === r)
    this.nombrev = this.vitrina[0].nombreVitrina
    this.descripcionv = this.vitrina[0].descripcion

    // imagenes de la vitrina
    const im = await axios.get(
      env.endpoint +
        '/imagenVitrinaComercio.php?id=' +
        this.vitrina[0].id_vitrina
    )

    this.imgsv = im.data.data

    this.imgsv = this.imgsv.filter((e) => e.estado === 0)
    this.auximg = im.data.data.filter((e) => e.estado === 0)
    this.auximgeli = []
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      this.$refs.form.validate()
    },

    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async editarRegistro() {
      const json = {
        id: this.vitrina[0].id_vitrina,
        idComercio: this.vitrina[0].idComercio,
        nombreVitrina: this.nombrev,
        descripcion: this.descripcionv,
        tipoVitrina: 1,
        orden: 1,
        estado: 0,
      }
      const vi = await axios.put(env.endpoint + '/vitrinaComercio.php', json)

      if (vi.data.code === 200) {
        this.error = true
        this.error_msg = vi.data.message
        // alert('Sus cambios estarán disponibles en un par de minutos')
        this.auximgeli.forEach(async (element) => {
          const r = await axios.patch(
            env.endpoint + '/imagenVitrinaComercio.php',
            {
              id: element[0].id_imgVitrina,
              campo: 'estado',
              dato: 2,
            }
          )

          if (r.data.code !== 200) {
            this.error = true
            this.error_msg = r.data.message
          }
        })
        // alert(this.files)
        if (this.files !== null) {
          this.files.forEach((element) => {
            /*  */

            const nombre = Date.now()
            /*eslint-disable */
            var storageRef = this.$fireStorageObj()
              .ref()
              .child(`vitrinas/${nombre}`)

            var uploadTask = storageRef.put(element)
            /* eslint-enable */

            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                /*eslint-disable */

                this.error = true
                this.error_msg =
                  'La carga está completa en un ' + progress + '%'
                /* console.log('Upload is ' + progress + '% done') */
                /* eslint-enable */
              },
              (error) => {
                /* this.error = true
          this.error_msg = JSON.stringify(error.message)
          */
                /*eslint-disable */

                this.error = true
                this.error_msg = error /* eslint-enable */
              },
              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  /*eslint-disable */

                  /*   console.log('File available at', downloadURL)
                  console.log(downloadURL) */
                  this.picture = downloadURL

                  this.subirImagen(this.vitrina[0].id_vitrina)
                })
              }
            )
          })

          this.$router.push({
            path: '/comercio/vitrinas',
          })
          this.error = true
          this.error_msg = 'Actualice la página por favor'
        } else {
          this.error = true
          this.error_msg = 'Actualice la página por favor'

          this.$router.push({
            path: '/comercio/vitrinas',
          })
        }
      } else {
        this.error = true
        this.error_msg = vi.data.message
      }
    },

    quitarImg(id, index) {
      if (id) {
        const e = this.imgsv.filter((i) => i.id_imgVitrina === id)
        this.auximgeli.splice(0, 0, e)
        this.imgsv = this.imgsv.filter((i) => i.id_imgVitrina !== id)
      } else {
        const a = this.files.findIndex(
          (i) => i.name === this.imgsv[index].nombre
        )

        this.files.splice(a, 1)
        this.imgsv.splice(index, 1)
      }
    },
    generarUrl() {
      if (this.auxinput) {
        this.files.forEach((element, index) => {
          this.imgsv.splice(this.imgsv.length, 0, {
            url_imgVitrina: URL.createObjectURL(element),
            nombre: element.name,
          })
        })

        this.auxinput = false
      } else {
        this.imgsv.splice(0)
        this.files.forEach((element, index) => {
          this.imgsv.splice(this.imgsv.length, 0, {
            url_imgVitrina: URL.createObjectURL(element),
            nombre: element.name,
          })
        })
      }
    },
    async subirImagen(id) {
      const jsonimg = {
        url_imgVitrina: this.picture,
        idVitrina: id,
      }

      await axios.post(env.endpoint + '/imagenVitrinaComercio.php', jsonimg)
    },
  },
}
</script>

<style></style>
