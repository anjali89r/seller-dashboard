<template>

<v-container
          fluid
          grid-list-lg
        >
          <v-layout row wrap>

            <v-flex xs12 class="table-style">
              <v-card  >
                <v-layout>
                  <v-flex xs5>
                    <h3>Product Details</h3>
                  </v-flex>

                </v-layout>
                <v-layout>
                  <v-flex xs5>
                    Product Department
                  </v-flex>
                  <v-flex xs7>
                    {{getProductSummary[0].department}}<br>

                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs5>
                    Product Category
                  </v-flex>
                  <v-flex xs7>
                    {{getProductSummary[0].productcategory}}
                  </v-flex>
                </v-layout>
                 <v-layout>
                  <v-flex xs5>
                    Title
                  </v-flex>
                  <v-flex xs7>
                     {{getProductSummary[0].producttitle}}
                  </v-flex>
               </v-layout>
               <v-layout>
                  <v-flex xs5>
                     Product Description
                  </v-flex>
                  <v-flex xs7>
                     <ul>
                        <li v-for="(description, index) in getProductSummary[0].productdescription" :key="index">{{description.feature}}</li>
                     </ul>

                  </v-flex>
               </v-layout>

              </v-card>
            </v-flex>
            <v-flex xs12 class="table-style" >
              <v-card  >
                <v-layout>
                  <v-flex xs5>
                    <h3>Price Details</h3>
                  </v-flex>

                </v-layout>
               <v-layout>
                  <v-flex xs5>
                     Market Price
                  </v-flex>
                  <v-flex xs7>
                      {{getProductSummary[0].price.marketprice}}

                  </v-flex>
               </v-layout>
               <v-layout>
                  <v-flex xs5>
                     Sale Price
                  </v-flex>
                  <v-flex xs7>
                     {{getProductSummary[0].price.marketprice}}

                  </v-flex>
               </v-layout>
                <v-layout>
                  <v-flex xs5>
                     Discount Price
                  </v-flex>
                  <v-flex xs7>
                    {{getProductSummary[0].price.discountprice}}

                  </v-flex>
               </v-layout>
                <v-layout>
                  <v-flex xs5>
                     Discount Percentage
                  </v-flex>
                  <v-flex xs7>
                    {{getProductSummary[0].price.discountpercentage}}

                  </v-flex>
               </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs12 class="table-style" >

                <v-layout class="layout-padd">
                  <v-flex xs5>
                    <h3>Image Thumnails</h3>
                  </v-flex>

                </v-layout>
            </v-flex>

            <div class="grid">
              <div class="cell"
              v-for="(item, index) in getProductSummary[0].productimages"
              :key="index">
                <img :src="`https:${item.imagepath}`" width="150" height="150" class="responsive-image"/>
              </div>
            </div>

          </v-layout>

        </v-container>




</template>
<script>
import moment from 'moment';

export default {
   name: 'Productdetails',
    created() {
      console.log('route sku: ', this.$route.params.productsku)

      this.$store.dispatch('getProductDetails', this.$route.params.productsku).then(response => {

            console.log("respone after dispatch: ", response)
            //this.date = response.data[0].trackingdetails.expectedshipdate
        }, error => {
            console.error("Got nothing from server. Prompt user to check internet connection and try again")
        })
    },

   computed: {
       getProductSummary() {
        console.log('inside computed: ',this.$store.getters.productDetails )
        const state = this.$store.getters.productDetails;
        console.log("state in getProductSummary computed: ", state)
       return state;
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
.layout-padd {
  padding: 0px;
}
.responsive-image {
  max-width: 100%;
}
.cell img {
  display: block;
}
@media screen and (min-width: 600px) {
  .grid {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .cell {
    width: 50%;
  }
}
@media screen and (min-width: 1000px) {
  .cell {
    width: calc(100% / 3);
  }
}
.cell {
  margin: 1rem;
}
@media screen and (min-width: 600px) {
  .cell {
    width: calc(50% - 2rem);
  }
}

@media screen and (min-width: 1000px) {
  .cell {
    width: calc(33.3333% - 2rem);
  }
}
</style>
