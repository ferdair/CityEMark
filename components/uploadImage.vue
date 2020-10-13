<template>
  <div>
    <div>
      <p>Logo</p>
      <input type="file" @change="previewImage" accept="image/*" />
    </div>
    <div>
      Progress: {{ uploadValue.toFixed() + '%' }}
      <v-progress-linear :value="uploadValue"></v-progress-linear>
    </div>
    <div v-if="imageData != null">
      <img class="preview" :src="picture" />
      <br />
      <button @click="onUpload">Upload</button>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'UploadImage',
  data: () => ({
    imageData: null,
    picture: null,
    uploadValue: 0,
  }),
  methods: {
    previewImage(event) {
      this.uploadValue = 0
      this.picture = null
      this.imageData = event.target.files[0]
    },
    async onUpload() {
      this.picture = null
      const storageRef = await firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData)
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url
          })
        }
      )
    },
  },
}
</script>
