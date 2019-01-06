<template>
<v-app>
        <v-toolbar dark>
    <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
   <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat><router-link to="/">Dashboard</router-link> </v-btn>
      <v-btn flat><router-link to="/addproduct">Add Items</router-link></v-btn>
      <!-- <v-btn
      flat
      id="qsLoginBtn"
      v-if="!authenticated"
      @click="auth.login">
      Log In
      </v-btn>
      <v-btn
      flat
      id="qsLogoutBtn"
      v-if="authenticated"
      @click="auth.logout">
      Log Out
      </v-btn> -->
    </v-toolbar-items>
  </v-toolbar>
  <v-content>
    <router-view />
  </v-content>
   <v-navigation-drawer
      temporary
      v-model="drawer"

      light
      absolute
    >
      <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="//res.cloudinary.com/ddglp4e0g/image/upload/v1533171744/ekatva/ekatvasignature.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title><strong>Seller Portal</strong></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/addproduct">
        <v-list-tile-action>
          <v-icon>shopping_basket</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>Add Products</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/orders">
        <v-list-tile-action>
          <v-icon>poll</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>Orders</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
</v-app>
</template>
<script>
//   export default {
//   props: ['auth', 'authenticated']
// }
export default {
  data() {
    return {
      drawer: false
    }
  }
}
</script>
<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
