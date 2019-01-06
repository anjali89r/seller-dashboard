<template>
 <div class="container">
    <div class="large-12 medium-12 small-12 cell">

        <input type="file" id="file" ref="file" v-on:change="onFileChange()"/>

    </div>
  </div>
</template>
<script>
export default {
  props: ['files'],
  name: 'Upload',
  data () {
    return {
      file: ''
    }
  },
  methods: {
      onFileChange(){
        console.log("this.refs.file: ", this.$refs.file)
        this.file = this.$refs.file.files[0];
        console.log("this.file: ", this.file)
        const self = this.file
      if (this.file) {
         console.log("this.file: ", this.file)
          this.$store.dispatch('fetchSignatureAndPolicy', {
            name: this.file.name,
            type: this.file.type
          }).then(() => {
           let policy = this.$store.state.upload.policy
            console.log("policy: ", policy)
            var formData = new FormData()
            formData.append('key', policy.key)
            formData.append('acl', 'private')
            formData.append('Content-Type', this.file.type)
            formData.append('AWSAccessKeyId', policy.access_key);
            formData.append('policy', policy.encoded_policy)
            formData.append('signature', policy.signature);
            formData.append('file',this.file, this.file.name)
            console.log("payload: "+ formData)
            this.$store.dispatch('upload', formData).then((data) => {
              console.log("data afer upload success: ", data)
            })

          })
        }
      }
   },
}
</script>
