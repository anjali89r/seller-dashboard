<template>
  <div class="dashboard-width">
    <DashboardCard />

    <template v-if="!tableloading">
   <v-card style="margin-top: 25px">
      <v-card-title>
       Inventory
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
        :headers="headers"
        :items="stockItems.docs"
        :search="search"
         item-key="sku"

         hide-actions
      >
        <template slot="items" slot-scope="props">

          <td><router-link :to="'/productdetails/' + props.item.sku"  >{{ props.item.sku }}</router-link></td>
          <td ><img :src=props.item.productimages[0].imagepath width="90px"></td>
          <td >{{ props.item.producttitle }}</td>
          <td >{{ props.item.price.marketprice }}</td>
          <td >{{ props.item.price.saleprice }}</td>
          <td >{{ props.item.productquantity }}</td>

          <!-- <tr v-if="props.item.show" class="tr-sub" ><td colspan="10">description: {{ props.item.description.toString() }}</td></tr> -->

        </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
       <div class="text-xs-center pt-2">
        <v-pagination
        :length="pages"
        @input="next"
        v-model="pagination.page"
        circle
        ></v-pagination>
      </div>
    </v-card>
</template>
<template v-else>
  <rotate-square2></rotate-square2>

</template>

  </div>

</template>
<script>

import DashboardCard from '../components/DashboardCard.vue'
import axios from 'axios';
import {RotateSquare2, DoubleBounce} from 'vue-loading-spinner'

/* eslint-disable */
export default {
  name: 'Dashboard',
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'home' })
    })
  },
 data () {
    return {
      loading: false,
      tableloading: false,
      search: '',
      pagination: {},
    stockItems: [],
      headers: [
        {
          text: 'SKU',
          align: 'left',

          value: 'sku'
        },

        { text: 'Image',sortable: false, value: 'image' },
        { text: 'Name', value: 'producttitle' },
        { text: 'Market Price (Rs)', value: 'price.marketprice' },
        { text: 'Sale Price (Rs)', value: 'price.saleprice' },
        { text: 'Qty', value: 'productquantity' }
      ],
    }
 },
 components: {

   DashboardCard,
   RotateSquare2,
   DoubleBounce
 },
created() {
  console.log('created')

    this.$store.dispatch('initOrderStatus')
    .then(resp => {

    });
    //this.$store.dispatch('initOrderDetails');
  },
 computed: {

    pages () {
        // if (this.pagination.rowsPerPage == null ||
        //   this.pagination.totalItems == null
        // ) return 0
        //console.log("totalpage ",this.$store.getters.stockList[0].pageDetail[0].totalPage)
        //console.log("TOTAL PAGE: ", this.stockItems.pages)
  return this.stockItems.pages
        // return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      next(page) {
       // console.log("page: ", page.pagination.page)
      //  console.log("page: ", page)
      this.tableloading = true;
        if (!page.pagination.page){
          var pageNum = 1
        }
        else{
           pageNum = page.pagination.page
        }
        axios.get( this.$baseURL + 'seller-products?limit=10&page='+ pageNum)

      .then(resp => {
        this.tableloading = false;
        // console.log('axios resp: ', resp.data)

 this.stockItems = resp.data
        //  const paginationDetails = [{totalItems: resp.data.total, pageLimit: resp.data.limit, totalPage: resp.data.pages, page: resp.data.page }]
        //  const inventoryList = {prodDetails: resp.data.docs, pageDetail: paginationDetails}
        //  console.log('inventoryList: ', inventoryList.pageDetail)
        //  commit('GET_STOCKS', inventoryList)

      })
      .catch(err => {
         console.log("error in geturl: ", err)
      })

      }
  },
  // methods: {
  //   routerLink() {
  //     this.$router.push({ path: '/productdetails' });
  // }
    //}
  }

</script>
<style scoped>
.v-card {
  min-width: 100%;
}
.dashboard-width {
  min-width: 100%;
}
.spinner {
  left: 50%;
  margin-top: 50px;
}
</style>
