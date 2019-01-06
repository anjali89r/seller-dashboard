
 <template>

          <v-container
            fluid
            grid-list-md
          >
            <v-layout row wrap >
              <v-flex xs3
                v-for="card in getOrderStatus"

                :key="card.status"
              >
                <v-card>
                   <v-card-text>
                   <v-layout style="margin-bottom: 20px">
                      <v-flex xs5>
                        <template v-if="card.status === 'Shipped'">
                           <v-chip text-color="white" color="primary" style="font-weight:600">
                              <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
                             {{card.status}}</v-chip>
                        </template>
                        <template v-if="card.status === 'Order Received'">
                           <v-chip text-color="white" color="red" style="font-weight:600">
                             <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
                             {{card.status}}</v-chip>
                        </template>
                        <template v-if="card.status === 'Picked Up'">
                           <v-chip text-color="white" color="secondary" style="font-weight:600">
                             <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
                             {{card.status}}</v-chip>
                        </template>
                        <template v-if="card.status === 'Delivered'">
                           <v-chip text-color="white" color="green" style="font-weight:600">
                             <v-avatar>
          <v-icon>check_circle</v-icon>
        </v-avatar>
                             {{card.status}}</v-chip>
                        </template>
                      </v-flex>



                   </v-layout>


                  <v-layout style="margin-top: 20px">
                     <v-flex xs12>


                         <h4 class="total-order" >Total Order <br> {{card.ordercount}}</h4>

                     </v-flex>
                  </v-layout>
               </v-card-text>

                </v-card>
              </v-flex>
            </v-layout>
          </v-container>

 </template>
 <script>
 export default {
    name: 'DashboardCard',
    // data() {
    //    return {
    //       cards: [
    //   { title: 'Orders-Received', flex: 3, color: 'secondary' },
    //   { title: 'Orders-Shipped', color: 'primary', flex: 3 },
    //   { title: 'Orders-Pickedup', color: 'red', flex: 3 },
    //   { title: 'Orders-Delivered', color: 'primary', flex: 3 }
    // ]
    //    }
    // }
    computed: {
      getOrderStatus() {
        const state = this.$store.getters.orderStatus;
       return state;
      }
    }
 }
 </script>
<style scoped>
.order-sec {
   text-align: center
}
.total-order{
  color:#2d717ade
}
</style>
