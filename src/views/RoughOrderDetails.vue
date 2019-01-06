<template>
<v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>
<v-flex xs12>
   <h3 style="text-align: center; margin-bottom: 20px;">Order Details</h3>

   <v-data-table
        :headers="orderHeaders"
        :items="getOrderSummary"

         item-key="id"

         hide-actions
      >
        <template slot="items" slot-scope="props">

          <td>{{ props.item.orderid }}</td>

          <td >{{ props.item.orderdate }}</td>
          <td >{{ props.item.sku }}</td>
          <td >{{ props.item.shippingtype }}</td>
          <td >{{ props.item.productquantity }}</td>

          <!-- <tr v-if="props.item.show" class="tr-sub" ><td colspan="10">description: {{ props.item.description.toString() }}</td></tr> -->

        </template>


      </v-data-table>
</v-flex>

            <v-flex xs12 class="table-style">
              <v-card  >
                <v-layout>
                  <v-flex xs5>
                    Customer name
                  </v-flex>
                  <v-flex xs7>
                    {{getOrderSummary[0].contactdetails.customername}}<br>

                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs5>
                    Address
                  </v-flex>
                  <v-flex xs7>
                    {{getOrderSummary[0].contactdetails.addressline1}}, {{getOrderSummary[0].contactdetails.addressline2}}, {{getOrderSummary[0].contactdetails.city}}, {{getOrderSummary[0].contactdetails.state}}, {{getOrderSummary[0].contactdetails.country}}
                  </v-flex>
                </v-layout>
                 <v-layout>
                  <v-flex xs5>
                     Email Address
                  </v-flex>
                  <v-flex xs7>
                     {{getOrderSummary[0].contactdetails.email}}
                  </v-flex>
               </v-layout>
               <v-layout>
                  <v-flex xs5>
                     Mobile Number
                  </v-flex>
                  <v-flex xs7>
                     {{getOrderSummary[0].contactdetails.mobileno}}
                  </v-flex>
               </v-layout>

              </v-card>
            </v-flex>
            <v-flex xs12 class="table-style" >
              <v-card  >
                <v-layout>
                  <v-flex xs5>
                    <h3>Tracking Details</h3>
                  </v-flex>
                  <v-flex xs7>

                  </v-flex>
                </v-layout>
               <v-layout>
                  <v-flex xs5>
                     Tracking ID
                  </v-flex>
                  <v-flex xs7>
                     <v-text-field
            label="tracking id"
            v-model="getOrderSummary[0].trackingdetails.trackingid"
            solo
          ></v-text-field>

                  </v-flex>
               </v-layout>
               <v-layout>
                  <v-flex xs5>
                     Provider
                  </v-flex>
                  <v-flex xs7>
                     <v-text-field
            label="tracking provider"
            v-model="getOrderSummary[0].trackingdetails.provider"
            solo
          ></v-text-field>

                  </v-flex>
               </v-layout>
                <v-layout>
                  <v-flex xs5>
                     Status
                  </v-flex>
                  <v-flex xs7>
                     <v-select
          :items="status"
          solo
          label="status"
          v-model="selectedStatus"
        ></v-select>

                  </v-flex>
               </v-layout>
                <v-layout>
                  <v-flex xs5>
                     Expected shipping date
                  </v-flex>
                  <v-flex xs7>
                    <v-menu
        ref="menu2"
        :close-on-content-click="false"
        v-model="menu2"
        :nudge-right="40"

        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
      <v-text-field
          slot="activator"
          v-model="dateFormatted"
          hint="MM/DD/YYYY format"
          persistent-hint
          prepend-icon="event"
          readonly
          @blur="date = parseDate(dateFormatted)"
        ></v-text-field>
                    <v-date-picker no-title @input="menu2 = false" v-model="date" color="green lighten-1"></v-date-picker>
                     <!-- {{getOrderSummary[0].trackingdetails.expectedshipdate}} -->

                    </v-menu>

                  </v-flex>
               </v-layout>
              </v-card>
            </v-flex>
<v-flex xs7>
   <v-btn color="primary" @click="saveOrderDetails">Save</v-btn>
</v-flex>
          </v-layout>
        </v-container>



</template>
<script>
export default {
   name: 'Orderdetails',
   data(){
      return {
        date: null,
         dateFormatted: null,
         menu2: false,
         orderHeaders: [
        {
          text: 'Order ID',
          align: 'left',
         sortable: false,
          value: 'id'
        },
        {
           text: 'Order Date',

         sortable: false,
          value: 'orderdate'
        },

        { text: 'SKU',sortable: false, value: 'sku' },
        { text: 'Shipping Type', sortable: false, value: 'shippingtype' }

      ],
      customerHeaders: [
        {
          text: 'Customer Name',
          align: 'left',
         sortable: false,
          value: 'customername'
        },
        {
           text: 'Order Date',

         sortable: false,
          value: 'orderdate'
        },

        { text: 'SKU',sortable: false, value: 'sku' },
        { text: 'Shipping Type', sortable: false, value: 'shippingtype' }

      ],
      productDetailArray: [
    {
        "contactdetails": {
            "customername": "Gaurav",
            "mobileno": "+919620272105",
            "email": "govind84@gmail.com",
            "addressline1": "Geetha Govindakrishna",
            "addressline2": "SBI Colony,Palappuram",
            "landmark": "near AM motors",
            "city": "Ottapalam",
            "state": "Kerala",
            "country": "India",
            "zipcode": "679103"
        },
        "trackingdetails": {
            "trackingid": "NA",
            "status": "Returned",
            "provider": "DHS",
            "expectedshipdate": "2018-09-15"
        },
        "paymentdetails": {
            "paymenttype": "CARD",
            "paymentstatus": "COMPLETE"
        },
        "sku": "1234567",
        "shippingtype": "Standard",
        "orderdate": "2018-09-07T02:27:06.673Z",
        "orderid": "FJRII-1188126",
        "__v": 0
    }
],
selectedStatus: 'Returned',
status: ['Returned', 'Delivered', 'Pick-up'],
trackingid: null,
provider: ''

      }
   },
   watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
        console.log("formatted: ", this.dateFormatted)
      },

    },
    created() {
      console.log('route id: ', this.$route.params.orderid)
      this.$store.dispatch('getOrderDetails', this.$route.params.orderid).then(response => {
            console.log("respone in dispatch: ", response.data[0].trackingdetails.expectedshipdate)
            this.date = response.data[0].trackingdetails.expectedshipdate
        }, error => {
            console.error("Got nothing from server. Prompt user to check internet connection and try again")
        })
    },

   computed: {
       getOrderSummary() {
        console.log('inside computed: ',this.$store.getters.orderDetails )
        const state = this.$store.getters.orderDetails;
        console.log("state in computed: ", state)
        // this.date = state[0].trackingdetails.expectedshipdate
        // this.trackingid = state[0].trackingdetails.trackingid
        // this.provider = state[0].trackingdetails.provider
       return state;
      },

    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      saveOrderDetails() {
       var savedDetails = [{
          dateFormatted: this.dateFormatted,
          status: this.selectedStatus,
          provider: this.provider,
          trackingid: this.trackingid
        }]
        console.log("saved: ", savedDetails)
      }
    }
}
</script>
<style scoped>
.prod-width {
   min-width: 100%;
}
.container.grid-list-lg .layout:only-child{
   margin: 0;
}
.table-style {
   margin-top: 9px;
}
.v-input{
   font-size: 10px;
}
.layout {
  padding: 0 24px;
}
</style>
