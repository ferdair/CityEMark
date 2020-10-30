<template>
  <v-app id="inspire">
    <v-app-bar class="d-none d-lg-block">
      <img class="mr-3" :src="require('@/static/logo.png')" height="40" />
      <v-spacer></v-spacer>
      <v-btn
        depressed
        rounded
        text
        :to="link"
        link
        v-for="([texto, link], i) in items"
        :key="i"
      >
        {{ texto }}
      </v-btn>
      <v-spacer></v-spacer>

      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar>
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center" v-if="this.$auth.loggedIn">
              <v-btn depressed rounded text to="/usuarioComercio">
                Ir a la cuenta
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout">
                Cerrar Sesión
              </v-btn>
            </div>
            <div class="mx-auto text-center" v-else>
              <v-btn depressed rounded text to="/usuarioComercio">
                Iniciar Sesión
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-app-bar class="d-lg-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img class="mr-3" :src="require('@/static/logo.png')" height="40" />

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          v-if="this.$auth.loggedIn"
        >
          <v-list-item-avatar>
            <v-icon> mdi-account-circle </v-icon>
          </v-list-item-avatar>
          <v-list-item>
            <v-list-item-title>Ir a la cuenta</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
          v-else
        >
          <v-list-item-avatar>
            <v-icon> mdi-account-circle </v-icon>
          </v-list-item-avatar>
          <v-list-item>
            <v-list-item-title>Iniciar sesión</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>

        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            :to="link"
            link
            v-for="([texto, link], i) in items"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title>{{ texto }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
    </v-main>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading"
            >¡Conéctese con nosotros en las redes sociales!
          </strong>

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }}. Derechos Reservados. Desarrollado pow
          Qoowork Lab
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'UsuarioIndex',
  data: () => ({
    drawer: false,
    items: [
      ['Vitrinas en oferta', '#'],
      ['Paseo virtual', '#'],
      ['Tu franquicia', '#'],
      ['Entretenimiento', '#'],
      ['Qoowork Lab', '#'],
    ],
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-instagram'],
  }),
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
