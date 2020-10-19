<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-simple-table dark>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nombre Producto</th>
                  <th class="text-left">Descripcion</th>
                  <th class="text-left">Tipo de producto</th>
                  <th class="text-left">PVP</th>
                  <!-- <th class="text-left">Precio por mayor</th>
                  <th class="text-left">Minimo por mayor</th>
                  <th class="text-left">precio vendedores</th> -->
                  <th class="text-left">Cantidad disponible</th>
                  <!--                   <th class="text-left">Tiempo entrega</th>
 -->
                  <th class="text-left">
                    <v-row justify="center">
                      <v-dialog v-model="dialog" persistent max-width="800px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            Nuevo
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Producto</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                              >
                                <v-row>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Nombre"
                                      required
                                      v-model="nuevoP.nombreProducto"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Descripción"
                                      required
                                      v-model="nuevoP.descripcion"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-autocomplete
                                      v-model="nuevoP.tipoProducto"
                                      :items="tipoProducto"
                                      item-text="nombreTipoProducto"
                                      item-key="id_tipoProducto"
                                      item-value="id_tipoProducto"
                                      label="Tipo de producto"
                                      required
                                    >
                                      ></v-autocomplete
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="PVP"
                                      hint="Ejemplo: 4.20"
                                      v-model="nuevoP.precioPVP"
                                      type="number"
                                      persistent-hint
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <!--  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="precio Por Mayor*"
                                      hint="Ejemplo: 4.00"
                                      v-model="nuevoP.precioPorMayor"
                                      persistent-hint
                                      required
                                      type="number"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Minimo Por Mayor"
                                      hint="Para ninguno = 0"
                                      v-model="nuevoP.minimoPorMayor"
                                      persistent-hint
                                      required
                                      type="number"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="precio Vendedores"
                                      hint="Ejemplo: 4.00"
                                      v-model="nuevoP.precioVendedores"
                                      persistent-hint
                                      required
                                      type="number"
                                    ></v-text-field>
                                  </v-col> -->
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="cantidad Disponible"
                                      hint="Ejemplo: 100"
                                      v-model="nuevoP.cantDisponible"
                                      persistent-hint
                                      required
                                      type="number"
                                    ></v-text-field>
                                  </v-col>
                                  <!--    <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="tiempo de Entrega"
                                      hint="En horas"
                                      v-model="nuevoP.tiempoEntregaHoras"
                                      persistent-hint
                                      required
                                      type="number"
                                    ></v-text-field>
                                  </v-col> -->
                                  <v-col cols="12" sm="6" md="4">
                                    <p>Logo</p>
                                    <input
                                      @change="uploadImage"
                                      type="file"
                                      accept="image/*"
                                    />
                                  </v-col>
                                </v-row>
                              </v-form>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="esconder">
                              Cerrar
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="subirImagen"
                            >
                              Guardar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in productos" :key="item.id_producto">
                  <td>{{ item.nombreProducto }}</td>
                  <td>{{ item.descripcion }}</td>
                  <td>{{ item.nombreTipoProducto }}</td>
                  <td>{{ item.precioPVP }}</td>
                  <!--   <td>{{ item.precioPorMayor }}</td>
                  <td>{{ item.minimoPorMayor }}</td>
                  <td>{{ item.precioVendedores }}</td> -->
                  <td>{{ item.cantDisponible }}</td>
                  <!--                   <td>{{ item.tiempoEntregaHoras }}</td>
 -->
                  <td>
                    <v-btn-toggle>
                      <v-btn @click="editar(item.id_producto)"
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      >
                      <v-btn
                        ><v-icon @click="borrar(item.id_producto)"
                          >mdi-delete</v-icon
                        ></v-btn
                      >
                    </v-btn-toggle>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

import env from '../../../config/env'

export default {
  name: 'EditarVitrina',
  layout: 'usuarioComercio',
  middleware: ['auth'],
  data: () => ({
    editedIndex: -1,
    eid: null,
    picture: '',
    valid: null,
    productos: null,
    dialog: false,
    tipoProducto: null,
    nuevoP: {
      nombreProducto: '',
      idComercio: 0,
      descripcion: '',
      tipoProducto: 0,
      precioPVP: 0,
      precioPorMayor: 0,
      minimoPorMayor: 0,
      precioVendedores: 0,
      cantDisponible: 0,
      tiempoEntregaHoras: 0,
    },
    file: '',
  }),
  async created() {
    const _id = this.$route.params.id
    const data = await axios.get(
      env.endpoint + '/producto.php?id=' + this.loggedInUser.idComercio
    )

    // estado en producto 1 es activo
    const filt = data.data.data.filter(
      (p) => String(p.vitrina) === String(_id) && p.estado === 1
    )
    this.productos = filt

    // estado 0 es activo
    const tp = await axios.get(env.endpoint + '/tipoProducto.php')
    this.tipoProducto = tp.data.data.filter((p) => p.estado === 0)
  },
  computed: {
    ...mapGetters(['getAux', 'loggedInUser']),
  },
  methods: {
    esconder() {
      this.dialog = false
      this.editedIndex = -1
    },
    reset() {
      this.$refs.form.reset()
    },
    validate() {
      this.$refs.form.validate()
    },

    resetValidation() {
      this.$refs.form.resetValidation()
    },
    uploadImage(e) {
      this.file = e.target.files[0]
    },
    subirImagen() {
      this.$refs.form.validate()
      if (this.editedIndex === -1) {
        const nombre = Date.now()
        /*eslint-disable */
        var storageRef = this.$fireStorageObj()
          .ref()
          .child(`productos/${nombre}`)

        var uploadTask = storageRef.put(this.file)
        /* eslint-enable */

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            /*eslint-disable */

            console.log('Upload is ' + progress + '% done')
            /* eslint-enable */
          },
          (error) => {
            /* this.error = true
          this.error_msg = JSON.stringify(error.message)

          */
            /*eslint-disable */

            console.log(error)
            /* eslint-enable */
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              /*eslint-disable */

              console.log('File available at', downloadURL)
              console.log(downloadURL)
              /* eslint-enable */

              this.picture = downloadURL
            })
          }
        )
      }
      this.registrar()
    },
    async registrar() {
      console.log(this.editedIndex)
      if (this.editedIndex === -1) {
        this.nuevoP.idComercio = this.loggedInUser.idComercio
        this.nuevoP.precioPVP = parseFloat(this.nuevoP.precioPVP)
        this.nuevoP.precioPorMayor = parseFloat(this.nuevoP.precioPorMayor)
        this.nuevoP.minimoPorMayor = parseFloat(this.nuevoP.minimoPorMayor)
        this.nuevoP.precioVendedores = parseFloat(this.nuevoP.precioVendedores)
        this.nuevoP.cantDisponible = parseFloat(this.nuevoP.cantDisponible)
        this.nuevoP.tiempoEntregaHoras = parseFloat(
          this.nuevoP.tiempoEntregaHoras
        )

        // nuevo producto
        const np = await axios.post(env.endpoint + '/producto.php', this.nuevoP)
        /*eslint-disable */

        /* eslint-enable */
        if (np.data.code === 200) {
          const _id = this.$route.params.id

          const im = {
            url_imgProducto: this.picture,
            idProducto: np.data.data[0].id_producto,
          }

          console.log(im)
          await axios.post(env.endpoint + '/imagenProducto.php', im)

          const pv = {
            idProducto: np.data.data[0].id_producto,
            idVitrina: _id,
          }
          await axios.post(env.endpoint + '/productoVitrina.php', pv)
          // eslint-disable-line no-unused-vars
          const a = this.productos.push(np.data.data[0])

          this.productos[a - 1].id_producto = np.data.data[0].id_producto
          this.productos[a - 1].nombreTipoProducto =
            np.data.data[0].nombreTipoProducto

          this.dialog = false
          this.reset()
        } else {
          alert('ERROR')
        }
      } else {
        this.nuevoP.idComercio = this.loggedInUser.idComercio
        this.nuevoP.precioPVP = parseFloat(this.nuevoP.precioPVP)
        this.nuevoP.precioPorMayor = parseFloat(this.nuevoP.precioPorMayor)
        this.nuevoP.minimoPorMayor = parseFloat(this.nuevoP.minimoPorMayor)
        this.nuevoP.precioVendedores = parseFloat(this.nuevoP.precioVendedores)
        this.nuevoP.cantDisponible = parseFloat(this.nuevoP.cantDisponible)
        this.nuevoP.tiempoEntregaHoras = parseFloat(
          this.nuevoP.tiempoEntregaHoras
        )
        const a = {
          id: this.eid,
          nombreProducto: this.nuevoP.nombreProducto,
          idComercio: this.loggedInUser.idComercio,
          descripcion: this.nuevoP.descripcion,
          tipoProducto: this.nuevoP.tipoProducto,
          observaciones: 'S/N',
          palabrasClave: 'S/N',
          estado: 1,
          orden: 1,
          precioPVP: this.nuevoP.precioPVP,
          precioPorMayor: this.nuevoP.precioPorMayor,
          minimoPorMayor: this.nuevoP.minimoPorMayor,
          precioReferidos: 0,
          precioVendedores: this.nuevoP.precioVendedores,
          cantDisponible: this.nuevoP.cantDisponible,
          tiempoEntregaHoras: this.nuevoP.tiempoEntregaHoras,
        }

        const b = {
          id_producto: this.editedIndex,
          nombreProducto: this.nuevoP.nombreProducto,
          idComercio: this.loggedInUser.idComercio,
          descripcion: this.nuevoP.descripcion,
          tipoProducto: this.nuevoP.tipoProducto,
          precioPVP: this.nuevoP.precioPVP,
          precioPorMayor: this.nuevoP.precioPorMayor,
          minimoPorMayor: this.nuevoP.minimoPorMayor,
          precioVendedores: this.nuevoP.precioVendedores,
          cantDisponible: this.nuevoP.cantDisponible,
          tiempoEntregaHoras: this.nuevoP.tiempoEntregaHoras,
        }

        const ed = await axios.put(env.endpoint + '/producto.php', a)

        if (ed.data.code === 200) {
          alert('Producto Actualizado')
          console.log(a)

          this.productos.splice(this.editedIndex, 1, b)
        } else {
          alert('Producto No se pudo actualizar')
        }

        this.editedIndex = -1
      }
    },
    async borrar(ide) {
      await axios.patch(env.endpoint + '/producto.php', {
        id: ide,
        campo: 'estado',
        dato: 2,
      })

      const pos = this.productos
        .map(function (e) {
          return e.id_producto
        })
        .indexOf(ide)
      this.productos.splice(pos, 1)
    },
    editar(ide) {
      const pos = this.productos
        .map(function (e) {
          return e.id_producto
        })
        .indexOf(ide)

      Object.assign(this.nuevoP, this.productos[pos])
      this.editedIndex = pos
      this.eid = ide

      this.dialog = true
    },
  },
}
</script>

<style></style>
