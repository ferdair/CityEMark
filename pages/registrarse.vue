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
                <v-text-field
                  v-model="nombre"
                  prepend-icon="mdi-account"
                  :rules="nombreRules"
                  label="Nombre"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="cedula"
                  :counter="10"
                  prepend-icon="mdi-badge-account-horizontal"
                  :rules="cedulaRules"
                  label="Cedula"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="telefono"
                  :counter="10"
                  prepend-icon="mdi-cellphone"
                  :rules="telefonoRules"
                  label="Telefono"
                  required
                ></v-text-field>

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
                    locale="en-in"
                    no-title
                    @input="fromDateMenu = false"
                  ></v-date-picker>
                </v-menu>

                <v-textarea
                  v-model="observaciones"
                  :rules="observacionesRules"
                  label="Observaciones"
                  prepend-icon="mdi-pencil"
                  required
                >
                </v-textarea>

                <v-text-field
                  v-model="correo"
                  :rules="correoRules"
                  label="Correo"
                  prepend-icon="mdi-email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="error" class="mr-4" @click="reset"> Limpiar </v-btn>
            <v-btn @click="registrarse" color="success">Registrarse</v-btn>
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
import env from '../config/env'

export default {
  name: 'Registrarse',
  data: () => ({
    valid: true,
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
      (v) => (v || '').length === 10 || 'La cédula debe tener 10 caracteres',
    ],
    fecha: '',
    fechaRules: [(v) => !!v || 'Fecha de nacimiento es requerido'],
    fromDateMenu: false,
    fromDateVal: null,
    observaciones: '',
    observacionesRules: [(v) => !!v || 'Observaciones es requerido'],
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
  }),
  computed: {
    fromDateDisp() {
      return this.fromDateVal
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    },
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
    registrarse() {
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
        }

        axios.post(`${env.endpoint}/usuarioComercio.php`, json).then((data) => {
          if (data.data.code === 200) {
            location.replace('/')
          } else {
            this.error = true
            this.error_msg = data.data.message + this.c
          }
        })
      }
    },
  },
}
</script>
