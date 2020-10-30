<template>
  <v-card class="mx-auto my-12" :to="`/promociones/editar/${id}`">
    <v-img :src="img"></v-img>

    <v-card-title>{{ nombre }}</v-card-title>

    <v-card-text>
      <div class="my-4 subtitle-1">{{ valorDescuento }}</div>

      <div>
        {{ descripcion }}
      </div>
      <div>
        {{ fechaFin }}
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'ProductoCard',
  props: {
    id: Number,
    nombre: String,
    descripcion: String,
    fechaFin: String,
    valorDescuento: String,
    img: String,
  },
}
</script>

<style></style>
