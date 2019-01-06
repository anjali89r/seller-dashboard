
<template>
   <v-container fluid class="addSec">
      <v-layout justify-center row>
      <v-flex xs12>
        Product details have been successfully submitted. SKU is {{sku}}.
       <v-btn color="success" href="/dashboard">Dashboard</v-btn>
    <v-btn color="error" href="/addproduct">Add More Products</v-btn>
     <router-link :to="'/copyproduct/' + sku"><v-btn>Copy Product</v-btn></router-link>
      </v-flex>
    </v-layout>
   </v-container>
</template>

<script>
export default {
name: 'Successlink',
data() {
   return {
      sku: ''
   }
},
created() {
   this.sku = this.$route.params.sku
}
}
</script>

<style>

</style>

