<template>
<div v-if="!loading">
  <div v-if="!error">
  <v-card >
      <v-card-title>
       Orders
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
      class="order-table"
        :headers="headers"
        :items="orderItems.docs"
        :search="search"
         item-key="orderid"
         hide-actions
      >
        <template slot="items" slot-scope="props">

          <td><router-link :to="'/orderdetails/' + props.item.orderid"  >{{ props.item.orderid }}</router-link></td>
          <td>{{ props.item.sku }}</td>
          <td >{{ props.item.shippingtype }}</td>
          <td >{{ props.item.orderdate }}</td>
          <td >
             <div class="contact-details">
                <div>
                  {{ props.item.contactdetails.customername}}
                </div>

                <div>
                   {{ props.item.contactdetails.addressline1}},
                   {{ props.item.contactdetails.addressline2}},
                   {{ props.item.contactdetails.city}}, {{ props.item.contactdetails.state}},
                   {{ props.item.contactdetails.country}},
                   {{ props.item.contactdetails.zipcode}}
                </div>

             </div>
          </td>
          <td >
             <div class="tracking-details">
                <div>

                   <span :style="colorStatus(props.item.trackingdetails.status)">{{ props.item.trackingdetails.status}}</span>
                </div>

             </div>
          </td>

        </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination
        :length="pages"
        @input="nextOrder"
        v-model="pagination.page"
        circle
        ></v-pagination>
      </div>
    </v-card>
    </div>
    <div v-else-if="error"><p>There was some network error</p></div>
</div>
<div v-else>
   <rotate-square2></rotate-square2>
</div>

</template>
<script>
import axios from 'axios';
import {RotateSquare2} from 'vue-loading-spinner'
export default {
   name: 'Orders',
   data () {
    return {
      search: '',
      pagination: {},
      orderItems: [],
      loading: false,
      error: false,
      headers: [
        {
          text: 'Order Id',
          align: 'left',
          value: 'orderid'
        },
        {
          text: 'SKU',
          align: 'left',
          sortable: false,
          value: 'sku'
        },

        { text: 'Shipping Type', sortable: false, value: 'shippingtype' },
        { text: 'Order Date', value: 'orderdate' },
        { text: 'Customer Info', sortable: false, value: 'contactdetails' },
        { text: 'Status',  value: 'trackingdetails' },

      ],
    }
 },
 components: {
      RotateSquare2
    },
 computed: {
    // getOrders() {
    //   const state = this.$store.getters.orderLists;
    //   if(state[0]) {
    //     console.log('state: in orders ', state[0].prodDetails)
    //   return state[0];
    //   }

    // }
    pages () {

      //  console.log("TOTAL PAGE: ", this.orderItems.pages)
  return this.orderItems.pages
        // return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      nextOrder(page) {
        //console.log("page: ", page.pagination.page)
      //  console.log("page: ", page)
      this.loading = true;
        axios.get(this.$baseURL + 'order-details?limit=10&page='+ page.pagination.page)

      .then(resp => {
        this.loading = false;
        // console.log('axios resp: orderdetails', resp.data)

 this.orderItems = resp.data

      })
      .catch(err => {
        this.loading = false;
        this.error = true;
         console.log("error in geturl: ", err)
      })

      }
  },
  methods: {
     colorStatus(status) {
        switch(status) {
           case "Shipped":
           return {color: "green"}
           break;
           case "Order Received":
           return {color: "red"}
           break
           case "Delivered":
           return {color: "blue"}
           break
           default:
           return {color: "black"}
        }
     },
    //  detailsPage(id) {
    //    console.log('here i am')
    //   //  this.$store.dispatch('getOrderDetails', id);
    //  }
  }
}
</script>
<style scoped>
.v-card {
  min-width: 100%;
}
.order-table{
   font-size: 12px;
}
.spinner {
 top: 50%;
}
</style>
