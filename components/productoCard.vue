<template>
  <v-card>
    <v-img :src="img" height="200px"></v-img>

    <v-card-title> {{ nombre }} </v-card-title>
    <v-divider></v-divider>

    <v-card-text> Stock: {{ stock }} </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProductoCard',
  props: {
    nombre: String,
    stock: Number,
    img: String,
  },
}
</script>

<style></style>
