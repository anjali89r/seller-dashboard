<template>
  <v-app>
    <!-- <app-header
    :auth="auth"
    :authenticated="authenticated"/>
    <router-view
    :auth="auth"
    :authenticated="authenticated"
    /> -->
    <app-header/>
    <router-view />
  </v-app>
</template>
<script>
//import AuthService from './auth/AuthService'
import NavHeader from './components/NavHeader.vue';
// const auth = new AuthService()
// const { login, logout, authenticated, authNotifier } = auth
export default {
  components: {
    'app-header': NavHeader
  },
   created() {
    this.$store.dispatch('initStocks');
  }
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

