<template>
  <v-container fluid class="addSec">
     <template v-if="!submitForm">
       <div v-if="!error">
    <v-layout justify-center row>
      <v-flex xs12 lg6>
        <form>
        <v-layout row>
      <v-flex xs4>
        <v-subheader>Department</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select
          :items="dept"
          solo
          label="Select a department"
          v-model="selectedDept"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>Product Category</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          v-model="category"
          solo
          clearable
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>Product Title</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          v-model="title"
          name="title"
          solo
          v-validate="'required|min:3'"
          :error-messages="errors.collect('title')"
          data-vv-name="title"
          required
          max
          clearable
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>Seller</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          label="Seller Name"
          v-model="seller"
          solo
          clearable
        ></v-text-field>
      </v-flex>
    </v-layout>

  <v-layout row>
      <v-flex xs4>
        <v-subheader>Sizes</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-select
            v-model="sizeValue"
            :items="sizeOpt"
            chips
            label="Sizes"
            v-validate="'required'"
            :error-messages="errors.collect('select')"
            data-vv-name="select"
            required
            multiple
            clearable
            solo
          ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Color</v-subheader>
      </v-flex>
      <v-flex xs8>
        <template v-for="(item, index) in colors">
          <v-text-field
          :key="index"
          v-model="item.color"
          solo
          append-icon="note_add"
          append-outer-icon="delete"
          @click:append="addColorRow"
          @click:append-outer="() => delColorRow(index)"
          clearable
        >
        </v-text-field>
      </template>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Images</v-subheader>
      </v-flex>
      <v-flex xs8>
        <template v-for="(image, index) in images">
          <v-text-field
          :key="index"
          v-model="image.imagepath"
          solo
          append-icon="note_add"
          append-outer-icon="delete"
          @click:append="addImageRow"
          @click:append-outer="() => delImageRow(index)"
          clearable
        >
        </v-text-field>
      </template>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Description</v-subheader>
      </v-flex>
      <v-flex xs8>

        <template v-for="(row, index) in rows">
           <v-text-field
            v-model="row.feature"
            :key="index"
            solo
            append-icon="note_add"
            append-outer-icon="delete"
            @click:append="addRow"
            @click:append-outer="() => delRow(index)"
            clearable

          ></v-text-field>
        </template>


      </v-flex>
    </v-layout>
  <v-layout row>
      <v-flex xs4>
        <v-subheader>Market Price(Rs.)</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field class="price-field"
        v-model="marketPrice"
        solo

        >

        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Sale Price(Rs.)</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field class="price-field"
        v-model="salePrice"
        solo

        >

        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Quantity</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          label="quantity"
          type="number"
          solo
          v-model="qty"
        ></v-text-field>

      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex xs12>

      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex xs12 lg6>
        <v-btn color="success" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-flex>
    </v-layout>
    </form>
      </v-flex>

    </v-layout>
    </div>
    <div v-else>
      <error></error>
    </div>
   </template>
   <template v-else>
    <v-layout justify-center row>
      <rotate-square2></rotate-square2>
    </v-layout>
  </template>
  </v-container>

</template>
<script>
import axios from 'axios';
import Error from '../components/Error.vue';
import {RotateSquare2} from 'vue-loading-spinner'
export default {
  name: 'Copyproduct',
  data() {
    return {
      dept: [
        'Men',
        'Women',
        'Boy',
        'Girl'
      ],
      error: false,
      selectedDept: '',
      sizeOpt: ['Small', 'Medium', 'Large', 'XL'],
      sizeValue: [],
      category: '',
      title: '',
      qty: 0,
      seller: '',
      images: [{imagepath: ''}],
      marketPrice: 0,
      salePrice:  0,
      colors:[{color: ''}],
      rows: [{feature: ''}],
      sku: '',
      submitForm: false,
      dictionary: {

      custom: {
        title: {
          required: () => 'title can not be empty',
          max: 'The name field may not be greater than 10 characters'
          // custom messages
        },
        select: {
          required: 'Select field is required'
        }
      }
    }
    }

  },
 mounted () {
    this.$validator.localize('en', this.dictionary);
    console.log("in creataed copyProd")


  },
   components: {
      RotateSquare2,
      Error
    },
created(){
   console.log("created phase in copyProd.vue before dispatch")
   this.$store.dispatch('dataCopied', this.$route.params.sku)
   .then(resp => {
      console.log("dispatch resp: ", resp.data[0])

      const sharedData = resp.data[0]
      const sizeArray = sharedData.sizemap.map(item => {
         return item.size
      })
      console.log("sizeAray: ", sizeArray)
      this.selectedDept = sharedData.department;
      this.category = sharedData.productcategory;
      this.title = sharedData.producttitle;
      this.seller = sharedData.productseller;
      this.qty = sharedData.productquantity;
      this.sizeValue = sizeArray
      this.colors = sharedData.colormap;
      this.rows = sharedData.productdescription;
      this.images = sharedData.productimages;
      this.marketPrice = sharedData.price.marketprice;
      this.salePrice = sharedData.price.saleprice;

      })
},
computed: {
  getSharedData() {
     console.log('getters shared data')
      const stateCopyData = this.$store.getters.getDuplicateData;
      console.log("getters shared data: ", stateCopyData)
      return stateCopyData;
  }
},
  methods: {
    addRow() {
      this.rows.push({feature: ''});
    },
    delRow(index) {
      if (index !== 0){
        this.rows.splice(index, 1)
      }

    },
    addColorRow() {
      this.colors.push({color: ''});
    },
    delColorRow(index) {
      if (index !== 0){
        this.colors.splice(index, 1)
      }
    },
    addImageRow() {
      this.images.push({imagepath: ''});
    },
    delImageRow(index) {
      if (index !== 0){
        this.images.splice(index, 1)
      }
    },
      submit () {
      this.$validator.validateAll();
      this.submitForm = true;
      console.log("in response")
      const sizeData = [];
      for(let i = 0; i < this.sizeValue.length; i++) {
        sizeData.push({size: this.sizeValue[i].trim()})
      }


      const postData = {
        productcategory: this.category,
        department: this.selectedDept,
        producttitle: this.title,
        productseller: this.seller,
        productquantity: this.qty,
        sizemap: sizeData,
        colormap: this.colors,
        productdescription: this.rows,
        productimages: this.images,
        price: {
          marketprice: this.marketPrice,
          saleprice: this.salePrice
        }
      }

    //console.log(postData)
       axios.post(this.$baseURL + 'addproduct', postData)
        .then(resp => {
          this.submitForm = false;
console.log('body response in copy product.vue', resp);
console.log('body response.request copy product.vue', resp.request);
console.log('body response.status', resp.status);
          console.log('body response.data', resp.data);
          this.sku = resp.data.sku;

          this.$router.push("/addsuccess/"+this.sku);
          })
          .catch(err => {
            this.submitForm = false;
            this.error = true;
          })


    },
    clear() {
      this.selectedDept = '';
      this.sizeValue = [];
      this.category ='';
      this.title = '';
      this.qty = 0;
      this.salePrice = 0;
      this.marketPrice =0;
      this.seller = '';
      this.images = [{imagepath: ''}];
      this.rows = [{feature: ''}];
      this.$validator.reset();
    }

  }

}
</script>
<style scoped>
.addSec {
  margin-top: 20px;
}
.price-field input {
  padding-left: 5px!important;
}
</style>
