<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                Categorías
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">
                Datos
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> Imágenes </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12"
                  ><v-card class="mx-auto">
                    <v-list>
                      <v-list-group
                        v-for="cat in aux"
                        :key="cat.idCategoria"
                        no-action
                      >
                        <template v-slot:activator>
                          <v-list-item-title>{{
                            cat.nombreCategoria
                          }}</v-list-item-title>
                        </template>

                        <v-list-item
                          v-for="ti in cat.tipoProducto"
                          :key="ti.id_tipoProducto"
                          @click="activar(ti.id_tipoProducto, cat.idCategoria)"
                          :input-value="
                            ti.id_tipoProducto === activo ? true : false
                          "
                          color="primary"
                        >
                          <v-list-item-title
                            v-text="ti.nombreTipoProducto"
                          ></v-list-item-title>
                        </v-list-item>
                      </v-list-group>
                    </v-list> </v-card
                ></v-card>

                <v-btn color="primary" @click="validacion1()">
                  Continuar
                </v-btn>

                <v-btn text to="/comercio/vitrinas" nuxt> Regresar </v-btn>
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
                            label="Nombre del Producto *"
                            required
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="descripcion"
                            label="Descripción del Producto *"
                            :rules="descripcionRules"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="precio"
                            :rules="precioRules"
                            label="Precio *"
                            suffix="USD"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="stock"
                            :rules="stockRules"
                            label="Stock Disponible *"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form> </v-container
                ></v-card>

                <v-btn color="primary" @click="validacion2()"> Continue </v-btn>

                <v-btn text @click="e1 = 1"> Regresar </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12">
                  <v-row>
                    <v-col cols="12">
                      <v-file-input
                        accept="image/*"
                        label="Subir Imágenes"
                        v-model="files"
                        @change="uploadImage"
                        chips
                        multiple
                        counter="6"
                      ></v-file-input> </v-col
                  ></v-row>
                  <v-row>
                    <v-col
                      v-for="(file, index) in files"
                      :key="index"
                      cols="12"
                      md="4"
                    >
                      <v-item>
                        <v-card class="d-flex align-center" dark height="150">
                          <v-spacer></v-spacer>
                          <v-img
                            max-height="150"
                            max-width="250"
                            :src="url[index]"
                          ></v-img>
                          <!-- <v-icon dark> mdi-camera-plus </v-icon -->
                          <v-spacer></v-spacer>
                        </v-card>
                      </v-item> </v-col
                  ></v-row>
                </v-card>

                <v-btn color="primary" @click="validacion3()">
                  Registrar
                </v-btn>

                <v-btn text @click="e1 = 2"> Regresar </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            Registre un tipo de producto
          </v-card-title>
          <v-card-text>
            <v-form ref="form2" v-model="valid2" lazy-validation>
              <v-text-field
                v-model="nombreTipoProducto"
                :rules="ntpRules"
                label="Nombre del tipo de producto"
                required
              ></v-text-field
            ></v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="agregartp()">
              Agregar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog></v-row
    >
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

import env from '../../../config/env'
export default {
  name: 'InsertarProducto',
  layout: 'usuarioComercio',
  middleware: ['auth'],
  data: () => ({
    nombreTipoProducto: '',
    ntpRules: [(v) => !!v || 'Nombre es requerido'],

    valid2: true,
    activo: null,
    dialog: false,
    picture: '',
    valid: true,
    e1: 1,
    categoria: null,
    tipoprod: null,
    nombre: '',
    nombreRules: [(v) => !!v || 'Nombre es requerido'],
    descripcion: '',
    descripcionRules: [(v) => !!v || 'Descripción es requerido'],
    precio: null,
    precioRules: [(v) => !!v || 'Precio es requerido'],
    stock: null,
    stockRules: [(v) => !!v || 'Stock es requerido'],
    files: null,
    url: null,
    aux: null,
    error: false,
    error_msg: '',
  }),
  async mounted() {
    const tp = await axios.get(env.endpoint + '/tipoProducto.php')

    tp.data.data.forEach((element) => {
      element.tipoProducto.push({
        nombreTipoProducto: 'Otro tipo de producto',
        idCategoria: element.idCategoria,
      })
    })
    this.aux = tp.data.data
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    uploadImage() {
      this.url = []

      this.files.forEach((element) => {
        this.url.push(URL.createObjectURL(element))
      })
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    validacion1() {
      if (this.activo) {
        this.e1 = 2
      } else {
        this.dialog = true
      }
    },

    validacion2() {
      this.validate()

      if (this.$refs.form.validate()) {
        this.e1 = 3
      }
    },
    async validacion3() {
      if (this.files.lenght === 0) {
        alert('Por favor, suba al menos una imagen')
      } else if (this.files.lenght > 6) {
        alert('Puede subir máximo 6 imágenes por producto')
      } else {
        const json = {
          nombreProducto: this.nombre,
          idComercio: this.loggedInUser.idComercio,
          descripcion: this.descripcion,
          tipoProducto: this.activo,
          precioPVP: this.precio,
          precioPorMayor: 0,
          minimoPorMayor: 0,
          precioVendedores: 15,
          cantDisponible: this.stock,
          tiempoEntregaHoras: 0,
        }

        const up = await axios.post(env.endpoint + '/producto.php', json)

        if (up.data.code === 200) {
          this.files.forEach((element) => {
            /*  */

            const nombre = Date.now()
            /*eslint-disable */
            var storageRef = this.$fireStorageObj()
              .ref()
              .child(`productos/${nombre}`)

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
                // console.log('Upload is ' + progress + '% done')
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

                  /* console.log('File available at', downloadURL)
                  console.log(downloadURL) */
                  this.picture = downloadURL

                  this.subirImagen(up.data.data[0].id_producto)
                })
              }
            )
          })

          const vit = this.$route.params.id
          const pv = await axios.post(env.endpoint + '/productoVitrina.php', {
            idProducto: up.data.data[0].id_producto,
            idVitrina: vit,
          })

          if (pv.data.code === 200) {
            this.error = true
            this.error_msg = 'Se agregó el producto correctamente'
            // alert('Se agregó el producto correctamente')
            this.$router.push({
              path: '/comercio/vitrinas',
            })
          }
        }
      }
    },
    activar(a, b) {
      this.activo = a
      this.categoria = b
    },

    async subirImagen(id) {
      const jsonimg = {
        url_imgProducto: this.picture,
        idProducto: id,
      }

      const resimg = await axios.post(
        env.endpoint + '/imagenProducto.php',
        jsonimg
      )
    },

    async agregartp() {
      if (this.$refs.form2.validate()) {
        const tp = await axios.post(env.endpoint + '/tipoProducto.php', {
          nombreTipoProducto: this.nombreTipoProducto,
          idCategoria: this.categoria,
        })

        if (tp.data.code === 200) {
          const pos = this.aux
            .map(function (e) {
              return e.idCategoria
            })
            .indexOf(this.categoria)

          this.aux[pos].tipoProducto.splice(
            this.aux[pos].tipoProducto.length - 1,
            0,
            {
              nombreTipoProducto: this.nombreTipoProducto,
              id_tipoProducto: tp.data.data[0].id_tipoProducto,
            }
          )
          this.activo = tp.data.data[0].id_tipoProducto
          this.dialog = false
          this.e1 = 2
        }
      }
    },
  },
}
</script>

<style></style>
