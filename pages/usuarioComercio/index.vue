<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-col v-model="tienda">
          <v-card :color="tienda.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="tienda.nombre"
                ></v-card-title>
                <v-card-title
                  class="headline"
                  v-text="tienda.bloque"
                ></v-card-title>
                <v-card-subtitle v-text="tienda.eslogan"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    to="/comercio/editarComercio"
                    nuxt
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    >Editar Cuenta
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="tienda.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-img max-height="150" max-width="250" :src="tienda.img"></v-img>
        <v-col cols="12">
          <v-card>
            <v-card-title class="white--text orange darken-4">
              Pedidos
            </v-card-title>

            <v-divider></v-divider>

            <v-virtual-scroll :items="items" :item-height="50" height="300">
              <template v-slot="{ item }">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.fullName }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-row
                      ><v-btn>
                        Ver
                        <v-icon color="orange darken-4" right> mdi-eye </v-icon>
                      </v-btn>
                      <v-btn>
                        Despachar
                        <v-icon color="orange darken-4" right>
                          mdi-open-in-new
                        </v-icon>
                      </v-btn>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-col>
      </v-col>
      <v-col v-for="card in cards" :key="card" cols="4">
        <v-card>
          <v-subheader>{{ card }}</v-subheader>

          <v-list two-line>
            <template v-for="n in 6">
              <v-list-item :key="n">
                <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Message {{ n }}</v-list-item-title>

                  <v-list-item-subtitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nihil repellendus distinctio similique
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider v-if="n !== 6" :key="`divider-${n}`" inset></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import env from '../../config/env'
export default {
  name: 'Index',
  layout: 'usuarioComercio',
  middleware: ['auth', 'tiendaRed'],
  data: () => ({
    cards: ['Hoy'],
    drawer: null,
    tienda: {
      color: '#1F7087',
      src: '',
      nombre: '',
      eslogan: '',
      bloque: '',
    },
    colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5'],
    names: ['Pedido'],
    surnames: ['(Nuevo)', '(Procesando)'],
  }),
  computed: {
    items() {
      const namesLength = this.names.length
      const surnamesLength = this.surnames.length
      const colorsLength = this.colors.length
      return Array.from({ length: 10 }, (k, v) => {
        const name = this.names[this.genRandomIndex(namesLength)]
        const surname = this.surnames[this.genRandomIndex(surnamesLength)]
        return {
          color: this.colors[this.genRandomIndex(colorsLength)],
          fullName: `${name} ${surname}`,
          initials: `${name[0]} ${surname[0]}`,
        }
      })
    },
    ...mapGetters(['loggedInUser']),
  },

  methods: {
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1))
    },
  },

  async created() {
    const comercio = await axios.get(
      env.endpoint + '/datosComercio.php?id=' + this.loggedInUser.idComercio
    )
    this.tienda.src = comercio.data.data[0].imagenLogo
    this.tienda.nombre =
      comercio.data.data[0].nombre + ' ' + comercio.data.data[0].id
    this.tienda.eslogan = comercio.data.data[0].eslogan

    const bloq =
      comercio.data.data[0].numeroLocal > 100 &&
      comercio.data.data[0].numeroLocal < 200
        ? 'Bloque A - Local ' + comercio.data.data[0].numeroLocal
        : 'Bloque B - Local ' + comercio.data.data[0].numeroLocal

    this.tienda.bloque = bloq
  },
}
</script>
