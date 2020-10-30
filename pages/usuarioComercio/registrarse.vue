<template>
  <v-app>
    <div>
      <v-container>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registro de usuario</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="nombre"
                      prepend-icon="mdi-account"
                      :rules="nombreRules"
                      label="Nombre"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cedula"
                      :counter="10"
                      prepend-icon="mdi-badge-account-horizontal"
                      :rules="cedulaRules"
                      label="Cedula"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="telefono"
                      :counter="10"
                      prepend-icon="mdi-cellphone"
                      :rules="telefonoRules"
                      label="Telefono"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-menu
                      v-model="fromDateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="Fecha de nacimiento"
                          readonly
                          prepend-icon="mdi-calendar"
                          :value="fromDateDisp"
                          :rules="fechaRules"
                          required
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="fromDateVal"
                        year-icon="mdi-calendar-blank"
                        prev-icon="mdi-skip-previous"
                        next-icon="mdi-skip-next"
                        locale="es-ES"
                        @input="fromDateMenu = false"
                      ></v-date-picker>
                    </v-menu>
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="correo"
                      :rules="correoRules"
                      label="Correo"
                      prepend-icon="mdi-email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      label="Contraseña"
                      prepend-icon="mdi-lock"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="error" class="mr-4" @click="reset"> Limpiar </v-btn>
            <v-btn color="success" @click="registrarse">Registrarse</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
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

import env from '../../config/env'

export default {
  name: 'Registrarse',

  data: () => ({
    valid: true,
    aux: null,
    nombre: '',
    nombreRules: [(v) => !!v || 'Nombre es requerido'],
    cedula: '',
    cedulaRules: [
      (v) => !!v || 'Cédula es requerido',
      (v) => (v || '').length === 10 || 'La cédula debe tener 10 caracteres',
    ],
    telefono: '',
    telefonoRules: [
      (v) => !!v || 'Telefono es requerido',
      (v) => /^([0-9])*$/.test(v) || 'El teléfono debe ser válido',
      (v) => (v || '').length === 10 || 'El teléfono debe tener 10 caracteres',
    ],
    fecha: '',
    fechaRules: [(v) => !!v || 'Fecha de nacimiento es requerido'],
    fromDateMenu: false,
    fromDateVal: null,
    observaciones: '',
    // observacionesRules: [(v) => !!v || 'Observaciones es requerido'],
    correo: '',
    correoRules: [
      (v) => !!v || 'Correo es requerido',
      (v) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
    ],
    password: '',
    passwordRules: [(v) => !!v || 'Correo es requerido'],
    showPassword: false,
    error: false,
    error_msg: '',
    provincias: [],
    provincia: '',
    ciudades: [],
    ciudad: '',
  }),
  computed: {
    ...mapGetters(['getAux']),
    fromDateDisp() {
      return this.fromDateVal
    },
  },
  async created() {
    const data = await axios.get(env.endpoint + '/auxiliarComercio.php')
    this.aux = data.data.data[0]
    this.provincias = this.aux.provincia.filter(
      (m) => m.nombreProv !== 'No State'
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
    async registrarse() {
      this.validate()

      if (this.$refs.form.validate()) {
        const json = {
          nombre: this.nombre,
          cedula: this.cedula,
          correo: this.correo,
          telefono: this.telefono,
          fechaNac: this.fromDateVal,
          observaciones: this.observaciones,
          clave: this.password,
          ciudad: this.ciudad,
        }

        const data = await axios.post(
          `${env.endpoint}/usuarioComercio.php`,
          json
        )
        if (data.data.code === 200) {
          this.error = true
          this.error_msg = data.data.message
          this.$router.push({
            path: '/login',
          })
        } else {
          this.error = true
          this.error_msg = data.data.message
        }
      }
    },
    changeCiudad() {
      this.ciudades = this.aux.ciudad.filter(
        (m) => m.provincia === this.provincia
      )
    },
  },
}
</script>
