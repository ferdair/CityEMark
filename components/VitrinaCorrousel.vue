<template>
  <v-container fluid>
    <v-card
      :to="`../vitrina/editar/${id}`"
      nuxt
      link
      elevation="24"
      max-width="444"
      class="mx-auto"
    >
      <v-system-bar lights-out></v-system-bar>
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
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'VitrinaCorrousel',
  props: {
    id: Number,
    nombre: String,
    descripcion: String,
    imgs: Array,
  },
}
</script>

<style></style>
