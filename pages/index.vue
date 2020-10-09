<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Iniciar Sesión</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="correo"
            label="Correo"
            prepend-icon="mdi-account-circle"
            type="email"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn to="/registrarse" nuxt color="success">Registrarse</v-btn>

        <v-btn color="info" @click="login">Iniciar Sesión</v-btn>
      </v-card-actions>
    </v-card>
    <v-alert v-if="error" type="error">
      {{ error_msg }}
    </v-alert>
  </v-app>
</template>

<script>
import axios from 'axios'
import env from '../config/env'
export default {
  name: 'Index',
  data() {
    return {
      correo: '',
      password: '',
      error: false,
      error_msg: '',
      showPassword: false,
    }
  },
  methods: {
    login() {
      const json = {
        correo: this.correo,
        clave: this.password,
      }

      axios.post(`${env.endpoint}/login.php`, json).then((data) => {
        if (data.data.code === 200) {
          location.replace('/usuario')
        } else {
          this.error = true
          this.error_msg = data.data.message
        }
      })
    },
  },
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white',
  },
}
</script>
