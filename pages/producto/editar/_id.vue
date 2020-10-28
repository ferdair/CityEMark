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
                <v-btn text to="/comercio/vitrinas" nuxt> Regresar </v-btn>

                <v-btn color="primary" @click="validacion1()">
                  Continuar
                </v-btn>
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
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="preciopm"
                            label="Precio por mayor"
                            type="number"
                            suffix="USD"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="minimopm"
                            label="Mínimo por mayor"
                            type="number"
                            suffix="USD"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="preciov"
                            label="Precio Vendedores"
                            type="number"
                            suffix="USD"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="tiempoentrega"
                            label="Tiempo de entrega"
                            type="number"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form> </v-container
                ></v-card>
                <v-btn text @click="e1 = 1"> Regresar </v-btn>

                <v-btn color="primary" @click="validacion2()">
                  Continuar
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12">
                  <v-row
                    ><v-col cols="12">
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
                      v-for="(img, index) in imgsp"
                      :key="img.id_imgProducto"
                      cols="12"
                      md="4"
                    >
                      <v-item>
                        <v-img
                          max-height="150"
                          max-width="250"
                          class="pa-1"
                          :src="img.url_imgProducto"
                          @click="quitarImg(img.id_imgProducto, index)"
                          ><v-btn icon dark>
                            <v-icon color="red">
                              mdi-close-circle
                            </v-icon></v-btn
                          ></v-img
                        >
                      </v-item>
                    </v-col></v-row
                  >
                </v-card>
                <v-btn text @click="e1 = 2"> Regresar </v-btn>

                <v-btn color="primary" @click="editarRegistro()">
                  Guardar Cambios
                </v-btn>
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
  name: 'EditarProducto',
  layout: 'usuarioComercio',
  middleware: ['auth'],
  data: () => ({
    error: false,
    error_msg: '',
    e1: 1,
    aux: null,
    valid: true,
    nombreRules: [(v) => !!v || 'Nombre es requerido'],
    nombre: '',
    descripcionRules: [(v) => !!v || 'Descripción es requerida'],
    descripcion: '',
    precioRules: [(v) => !!v || 'Precio es requerido'],
    precio: '',
    stockRules: [(v) => !!v || 'Stock es requerido'],
    stock: '',
    preciopm: '',
    minimopm: '',
    preciov: '',
    tiempoentrega: '',
    files: null,
    dialog: false,
    valid2: true,
    ntpRules: '',
    nombreTipoProducto: '',
    producto: null,
    imgsp: null,
    auximgeli: [],
    auximg: [],
    auxinput: true,
    picture: null,
    activo: null,
  }),

  computed: {
    ...mapGetters(['getAux', 'loggedInUser']),
  },
  async mounted() {
    const tp = await axios.get(env.endpoint + '/tipoProducto.php')

    tp.data.data.forEach((element) => {
      element.tipoProducto.push({
        nombreTipoProducto: 'Otro tipo de producto',
        idCategoria: element.idCategoria,
      })
    })
    this.aux = tp.data.data

    const p = await axios.get(
      env.endpoint + '/producto.php?id=' + this.loggedInUser.idComercio
    )

    this.producto = p.data.data.filter(
      (element) => element.id_producto === Number(this.$route.params.id)
    )

    this.nombre = this.producto[0].nombreProducto
    this.descripcion = this.producto[0].descripcion
    this.activo = this.producto[0].tipoProducto
    this.precio = this.producto[0].precioPVP
    this.preciopm = this.producto[0].precioPorMayor
    this.minimopm = this.producto[0].minimoPorMayor
    this.preciov = this.producto[0].precioVendedores
    this.stock = this.producto[0].cantDisponible
    this.tiempoentrega = this.producto[0].tiempoEntregaHoras

    const im = await axios.get(
      env.endpoint + '/imagenProducto.php?id=' + this.producto[0].id_producto
    )

    this.imgsp = im.data.data

    this.imgsp = this.imgsp.filter((e) => e.estado === 0)
    this.auximg = im.data.data.filter((e) => e.estado === 0)

    this.auximgeli = []
  },
  methods: {
    validate() {
      this.$refs.form.validate()
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
        this.$mount()
      }
    },
    async validacion3() {
      if (this.files.lenght === 0) {
        this.error = true
        this.error_msg = 'Por favor suba al menos una imágen'
      } else if (this.files.lenght > 6) {
        this.error = true
        this.error_msg = 'Puede subir máximo 6 imágenes por producto'
      } else {
        const json = {
          id: this.producto.id_producto,
          nombreProducto: this.nombre,
          idComercio: this.producto.idComercio,
          descripcion: this.descripcion,
          tipoProducto: this.activo,
          observaciones: '',
          palabrasClave: '',
          estado: 1,
          orden: 0,
          precioPVP: this.precio,
          precioPorMayor: this.preciopm,
          minimoPorMayor: this.minimopm,
          precioReferidos: 0,
          precioVendedores: this.preciov,
          cantDisponible: this.stock,
          tiempoEntregaHoras: this.tiempoentrega,
        }

        const up = await axios.put(env.endpoint + '/producto.php', json)

        if (up.data.code === 200) {
          alert('Actualice la página por favor')
          this.error = true
          this.error_msg =
            'Sus cambios estarán disponibles en un par de minutos'

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
                this.error_msg = error
                // console.log(error)
                /* eslint-enable */
              },
              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  /*eslint-disable */

                  /*  console.log('File available at', downloadURL)
                  console.log(downloadURL) */
                  this.picture = downloadURL

                  this.subirImagen(up.data.data[0].id_producto)
                })
              }
            )
          })
        }
      }
    },
    activar(a, b) {
      this.activo = a
      this.categoria = b
      this.$mount()
    },
    async agregartp() {
      if (this.$refs.form2.validate()) {
        const tp = await axios.post(env.endpoint + '/tipoProducto.php', {
          nombreTipoProducto: this.nombreTipoProducto,
          idCategoria: this.categoria,
        })

        if (tp.data.code === 200) {
          this.error = true
          this.error_msg = tp.data.message

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
    async editarRegistro() {
      const json = {
        id: this.producto[0].id_producto,
        nombreProducto: this.nombre,
        idComercio: this.producto[0].idComercio,
        descripcion: this.descripcion,
        tipoProducto: this.activo,
        observaciones: '',
        palabrasClave: '',
        estado: 1,
        orden: 0,
        precioPVP: this.precio,
        precioPorMayor: this.preciopm,
        minimoPorMayor: this.minimopm,
        precioReferidos: 0,
        precioVendedores: this.preciov,
        cantDisponible: this.stock,
        tiempoEntregaHoras: this.tiempoentrega,
      }

      const vi = await axios.put(env.endpoint + '/producto.php', json)

      if (vi.data.code === 200) {
        this.error = true
        this.error_msg = vi.data.message
        this.auximgeli.forEach(async (element) => {
          const r = await axios.patch(env.endpoint + '/imagenProducto.php', {
            id: element[0].id_imgProducto,
            campo: 'estado',
            dato: 2,
          })

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

                  /* console.log('File available at', downloadURL)
                  console.log(downloadURL) */
                  this.picture = downloadURL

                  this.subirImagen(this.producto[0].id_producto)
                })
              }
            )
          })
          this.error = true
          this.error_msg = 'Actualice la página por favor'
          this.$router.push({
            path: '/comercio/vitrinas',
          })
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
        // alert(vi.data.message)
      }
    },
    uploadImage() {
      this.url = []

      this.files.forEach((element) => {
        this.url.push(URL.createObjectURL(element))
      })
    },

    async subirImagen(id) {
      const jsonimg = {
        url_imgProducto: this.picture,
        idProducto: id,
      }

      await axios.post(env.endpoint + '/imagenProducto.php', jsonimg)
    },
    generarUrl() {
      if (this.auxinput) {
        this.files.forEach((element, index) => {
          this.imgsp.splice(this.imgsp.length, 0, {
            url_imgProducto: URL.createObjectURL(element),
            nombre: element.name,
          })
        })

        this.auxinput = false
      } else {
        this.imgsp.splice(0)
        this.files.forEach((element, index) => {
          this.imgsp.splice(this.imgsp.length, 0, {
            url_imgProducto: URL.createObjectURL(element),
            nombre: element.name,
          })
        })
      }
    },
    quitarImg(id, index) {
      if (id) {
        const e = this.imgsp.filter((i) => i.id_imgProducto === id)
        this.auximgeli.splice(0, 0, e)
        this.imgsp = this.imgsp.filter((i) => i.id_imgProducto !== id)
      } else {
        const a = this.files.findIndex(
          (i) => i.name === this.imgsp[index].nombre
        )

        this.files.splice(a, 1)
        this.imgsp.splice(index, 1)
      }
    },
  },
}
</script>

<style></style>
