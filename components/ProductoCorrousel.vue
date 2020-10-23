<template>
  <v-card
    :to="`../producto/editar/${id}`"
    nuxt
    link
    elevation="24"
    max-width="200"
    class="mx-auto"
  >
    <!--     <v-system-bar lights-out></v-system-bar>
 -->
    <v-carousel cycle :show-arrows="false" height="300">
      <v-carousel-item
        v-for="(img, i) in imgs"
        :key="i"
        :src="img.url_imagen"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ nombre }}</v-list-item-title>
          <v-list-item-subtitle>{{ descripcion }}</v-list-item-subtitle>
          <v-list-item-subtitle>precio: {{ precio }}</v-list-item-subtitle>
          <v-list-item-subtitle>stock: {{ stock }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'ProductoCorrousel',
  props: {
    id: Number,
    nombre: String,
    descripcion: String,
    imgs: Array,
    precio: Number,
    stock: Number,
  },
}
</script>

<style></style>
