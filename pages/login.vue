<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>Iniciar Sesión</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="login.correo"
            label="Correo"
            prepend-icon="mdi-account-circle"
            type="email"
          />
          <v-text-field
            v-model="login.clave"
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

        <v-btn color="info" @click="userLogin">Iniciar Sesión</v-btn>
      </v-card-actions>
    </v-card>
    <v-alert v-if="error" type="error">
      {{ error_msg }}
    </v-alert>
  </v-app>
</template>

<script>
/* import axios from 'axios'
import env from '../config/env'
 */ export default {
  name: 'Login',
  data() {
    return {
      login: {
        correo: '',
        clave: '',
      },
      error: false,
      error_msg: '',
      showPassword: false,
    }
  },
  methods: {
    async userLogin() {
      try {
        const {
          data: {
            data: [data],
          },
        } = await this.$auth.loginWith('local', {
          data: this.login,
        })

        this.$auth.setUser(data)
        this.$auth.$storage.setUniversal('user', data, true)
      } catch (error) {
        this.error = true
        this.error_msg = error.response.data.message
      }
    },
  },
}
</script>
