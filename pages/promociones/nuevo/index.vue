<template>
  <v-app>
    <template>
      <v-container>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Crear Promoción
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              Añadir Productos
            </v-stepper-step>

            <v-divider></v-divider>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12"
                ><v-row>
                  <v-col cols="12">
                    <h3>Nueva Promoción</h3>
                  </v-col>
                  <v-col cols="12">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="nombre"
                            :rules="nombreRules"
                            label="Nombre de la promoción *"
                            required
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="descripcion"
                            label="Descripción de la promoción  *"
                            :rules="descripcionRules"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="valor"
                            :rules="valorRules"
                            label="Valor *"
                            type="number"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-radio-group v-model="tipoPromo" mandatory>
                            <template v-slot:label>
                              <div><strong>Tipo de promoción</strong></div>
                            </template>
                            <v-radio label="Descuento de porcentaje"></v-radio>
                            <v-radio
                              label="Descuento de un valor especifico"
                            ></v-radio>
                            <v-radio label="Nuevo precio"></v-radio>
                            <v-radio
                              label=" Descuento descrito en la descripción"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            label="Condiciones"
                            v-model="condiciones"
                            :rules="condicionesRules"
                            required
                          ></v-textarea>
                        </v-col>
                        <v-col cols="6">
                          <v-menu
                            v-model="fromDateMenuI"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                label="Fecha de inicio"
                                readonly
                                prepend-icon="mdi-calendar"
                                :value="fromDateDispI"
                                :rules="fechaRulesI"
                                required
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="fromDateValI"
                              year-icon="mdi-calendar-blank"
                              prev-icon="mdi-skip-previous"
                              next-icon="mdi-skip-next"
                              locale="es-ES"
                              @input="fromDateMenuI = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="6">
                          <v-menu
                            v-model="fromTimeMenuI"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                label="Hora de Inicio"
                                readonly
                                prepend-icon="mdi-calendar"
                                :value="fromTimeDispI"
                                :rules="horaRulesI"
                                required
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              ampm-in-title
                              format="ampm"
                              use-seconds
                              v-model="fromTimeValI"
                              @input="fromTimeMenuI = false"
                            ></v-time-picker>
                            <!--   <v-date-picker
                    v-model="fromTimeValI"
                    year-icon="mdi-calendar-blank"
                    prev-icon="mdi-skip-previous"
                    next-icon="mdi-skip-next"
                    locale="es-ES"
                    @input="fromTimeMenuI = false"
                  ></v-date-picker> -->
                          </v-menu>
                        </v-col>

                        <v-col cols="6">
                          <v-menu
                            v-model="fromDateMenuF"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                label="Fecha de Fin"
                                readonly
                                prepend-icon="mdi-calendar"
                                :value="fromDateDispF"
                                :rules="fechaRulesF"
                                required
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="fromDateValF"
                              year-icon="mdi-calendar-blank"
                              prev-icon="mdi-skip-previous"
                              next-icon="mdi-skip-next"
                              locale="es-ES"
                              @input="fromDateMenuF = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="6">
                          <v-menu
                            v-model="fromTimeMenuF"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                label="Hora de Fin"
                                readonly
                                prepend-icon="mdi-calendar"
                                :value="fromTimeDispF"
                                :rules="horaRulesF"
                                required
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              ampm-in-title
                              format="ampm"
                              use-seconds
                              v-model="fromTimeValF"
                              @input="fromTimeMenuF = false"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="6">
                          <v-file-input
                            accept="image/*"
                            label="Subir Banner"
                            v-model="file"
                            @change="uploadImage"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="">
                          <v-img
                            max-height="150"
                            max-width="250"
                            :src="url"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                  <v-col> </v-col> </v-row
              ></v-card>

              <v-btn color="error" class="mr-4" @click="reset"> Limpiar </v-btn>
              <v-btn color="success" @click="validar1">Crear</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-12">
                <v-card-title>
                  <span class="headline">Productos</span>
                </v-card-title>
                <v-card-text>
                  <v-autocomplete
                    chips
                    deletable-chips
                    multiple
                    small-chips
                    solo
                    :items="productos"
                    item-text="nombreProducto"
                    item-value="id_producto"
                    label="Agregar producto"
                    v-model="productoPromo"
                    @change="alert"
                  ></v-autocomplete>
                </v-card-text>
              </v-card>
              <v-btn @click="e1 = 1" text> Regresar </v-btn>

              <v-btn color="primary" @click="guardar"> Guardar </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </template>
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
import { mapGetters } from 'vuex'
import axios from 'axios'
import env from '../../../config/env'

export default {
  name: 'NuevaPromocion',
  layout: 'usuarioComercio',
  middleware: ['auth'],
  data: () => ({
    e1: 1,
    dialog: false,
    valid: true,
    error: false,
    error_msg: '',
    urlBanner: '',
    tipoPromo: null,
    nombre: '',
    nombreRules: [(v) => !!v || 'Nombre es requerido'],
    descripcion: '',
    descripcionRules: [(v) => !!v || 'Descripción es requerido'],

    fromDateMenuI: false,
    fromDateValI: null,
    fechaRulesI: [(v) => !!v || 'Fecha de Inicio es requerido'],
    fromTimeMenuI: false,
    fromTimeValI: null,
    horaRulesI: [(v) => !!v || 'Hora de inicio es requerido'],

    fromDateMenuF: false,
    fromDateValF: null,
    fechaRulesF: [(v) => !!v || 'Fecha de Fin es requerido'],

    fromTimeMenuF: false,
    fromTimeValF: null,
    horaRulesF: [(v) => !!v || 'Hora de fin es requerido'],

    valor: null,
    valorRules: [(v) => !!v || 'Valor es requerido'],

    condiciones: '',
    condicionesRules: [(v) => !!v || 'Condiciones es requerido'],
    file: null,
    url: '',
    picture: null,

    productos: null,
    productoPromo: null,
  }),
  async mounted() {
    const prd = await axios.get(
      env.endpoint + '/producto.php?id=' + this.loggedInUser.idComercio
    )

    this.productos = prd.data.data.filter((i) => i.estado === 1)
  },
  computed: {
    ...mapGetters(['getAux', 'loggedInUser']),
    fromDateDispI() {
      return this.fromDateValI
    },
    fromDateDispF() {
      return this.fromDateValF
    },
    fromTimeDispI() {
      return this.fromTimeValI
    },
    fromTimeDispF() {
      return this.fromTimeValF
    },
  },
  methods: {
    uploadImage(e) {
      if (this.file) {
        this.url = URL.createObjectURL(this.file)
      } else {
        this.url = ''
      }
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
    async registrar() {
      const json = {
        idComercio: this.loggedInUser.idComercio,
        urlBanner: this.picture,
        idTipoPromo: this.tipoPromo,
        nombrePromocion: this.nombre,
        descripcionPromocion: this.descripcion,
        fechaInicio: this.fromDateValI + ' ' + this.fromTimeValI,
        fechaFin: this.fromDateValF + ' ' + this.fromTimeValF,
        valor: this.valor,
        condiciones: this.condiciones,
      }

      const pr = await axios.post(env.endpoint + '/promocionComercio.php', json)

      this.error = true
      this.error_msg = pr.data.message

      if (pr.data.code === 200) {
        /* this.$router.push({
            path: '/comercio/promociones',
          }) */

        this.productoPromo.forEach(async (element) => {
          alert(element)
          const pp = await axios.post(env.endpoint + '/promoProducto.php', {
            idProducto: element,
            idPromocion: pr.data.data[0].id_promo,
          })

          this.error = true
          this.error_msg = pp.data.message

          if (pp.data.code === 200) {
            this.$router.push({
              path: '/comercio/promociones',
            })
          }
        })
      }
    },
    validar1() {
      this.$refs.form.validate()
      if (this.file) {
        if (this.valid) {
          this.e1 = 2
        }
      } else {
        this.error = true
        this.error_msg = 'Suba una imágen'
      }
    },
    alert() {
      alert(JSON.stringify(this.productoPromo))
    },

    guardar() {
      if (this.productoPromo === []) {
        this.error = true
        this.error_msg = 'Agregue al menos un producto'
      } else {
        const nombre = Date.now()
        /*eslint-disable */
        var storageRef = this.$fireStorageObj().ref().child(`promos/${nombre}`)

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
      }
    },
  },
}
</script>

<style></style>
