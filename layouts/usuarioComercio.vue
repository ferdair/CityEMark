<template>
  <div>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <!--  -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"> CityEMark </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.path"
            :target="item.target"
            nuxt
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :href="`http://cityemark.com/pdfTutorial/app/index.php?id=${this.loggedInUser.idComercio}`"
            target="_blank"
          >
            <v-list-item-icon>
              <v-icon>mdi-pdf-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Generador de catálogo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <img class="mr-3" :src="require('@/static/logo.png')" height="40" />
        <v-spacer></v-spacer>
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="brown" size="48">
                <span class="white--text headline">{{ user.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="white--text headline">{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn to="/usuarioComercio/editar" nuxt depressed rounded text
                  >Editar Cuenta
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="logout">
                  Cerrar Sesión
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-main>
        <Nuxt />
      </v-main>
    </v-app>
  </div>
</template>
<script>
// import axios from 'axios'
import { mapGetters } from 'vuex'

// import env from '../config/env'
export default {
  name: 'UsuarioComercio',

  data: () => ({
    drawer: false,
    user: {
      initials: '',
      fullName: '',
      email: '',
    },
    items: [
      {
        title: 'Inicio',
        icon: 'mdi-view-dashboard',
        path: '/usuarioComercio',
        target: '_self',
      },
      {
        title: 'Vitrinas',
        icon: 'mdi-store',
        path: '/comercio/vitrinas',
        target: '_self',
      },
      {
        title: 'Promociones',
        icon: 'mdi-piggy-bank',
        path: '/comercio/promociones',
        target: '_self',
      },
      /*  {
        title: 'Productos',
        icon: 'mdi-package-variant',
        path: '/comercio/productos',
      }, */
      {
        title: 'Estadísticas',
        icon: 'mdi-chart-areaspline-variant',
        path: '/comercio/estadisticas',
        target: '_self',
      },
      /*  {
        title: 'Generador de catálogo',
        icon: 'mdi-pdf-box',
        path: 'http://cityemark.com/pdfTutorial/app/index.php?id=48',
        target: '_blank	',
      }, */
      {
        title: 'Contactar a soporte',
        icon: 'mdi-help-box',
        path: '/comercio/soporte',
        target: '_self',
      },
    ],
    right: null,
  }),
  computed: {
    ...mapGetters(['getAux', 'loggedInUser']),
  },
  created() {
    this.user.fullName = this.loggedInUser.nombre + ' a'
    this.user.email = this.loggedInUser.correo
    const name = this.user.fullName.split(' ', 2)
    this.user.initials = `${name[0][0]} ${name[1][0]}`
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
<style scoped>
.account {
  right: 0;
}
</style>
