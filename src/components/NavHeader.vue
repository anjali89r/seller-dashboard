
<template>
  <v-app id="inspire">
    <v-navigation-drawer
    class="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">

          <v-list-tile  :key="item.text" :to="item.path" @click="orderApiDispatch(item.path)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Ekatva</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div>

  <!-- <img :src="$auth.user.picture" width="30" height="30">
        <span class="text-muted font-weight-light px-2">{{$auth.user.name}}</span> -->
        <button type="button" class="btn btn-outline-secondary btn-sm" @click="$auth.logout()"> <font-awesome-icon icon="sign-out-alt" />Sign out</button>


      </div>

    </v-toolbar>
    <v-content>

      <v-container fluid >
        <v-layout justify-center >
          <router-view />
        </v-layout>
      </v-container>
    </v-content>


  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'dashboard', text: 'Dashboard', path: '/dashboard' },
        { icon: 'shopping_basket', text: 'Add Products', path: '/addproduct' },
        { icon: 'poll', text: 'Orders', path: '/orders' },

      ]
    }),
    // props: {
    //   source: String
    // },

    methods: {
      orderApiDispatch(path) {
        if(path === "/orders"){
         // console.log("inside path")
          this.$store.dispatch('initOrderDetails')
          .then(data => console.log(data));
        }
      }
    }
  }
</script>
<style scoped>
.drawer .v-list{
  margin-top: 20px;
}
</style>
