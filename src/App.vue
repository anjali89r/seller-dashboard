<template>
  <v-app>
    <app-header></app-header>
  </v-app>
</template>
<script>

import NavHeader from './components/NavHeader.vue';
//import Home from './views/Home.vue'
export default {
  components: {
    'app-header': NavHeader
  }
  //  created() {
  //   this.$store.dispatch('initStocks');
  //   //this.$store.dispatch('initOrderDetails');
  // }
  // data () {
  //   authNotifier.on('authChange', authState => {
  //     this.authenticated = authState.authenticated
  //   })
  //   return {
  //     auth,
  //     authenticated
  //   }
  // },
  // methods: {
  //   login,
  //   logout
  // }
}
</script>

