import Vue from 'vue';
import Vuex from 'vuex';
//import inventory from './modules/inventoryTable';
import orderStatus from './modules/orderStatus'
import orderDetails from './modules/orderDetails'
import copyProduct from './modules/copyProduct'
import upload from './modules/uploading'
import productDetails from './modules/productDetails'
//import * as actions from './actions';
Vue.use(Vuex);

export default new Vuex.Store({

   modules: {
      productDetails,
      orderStatus,
      orderDetails,
      copyProduct,
      upload

   }
});
