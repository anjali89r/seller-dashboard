/* eslint-disable */
//import Vue from 'vue'
// import router from '../../router'
import axios from 'axios';
const state = {
   inventory: []

}

const mutations = {

   'GET_STOCKS': (state, data) => {
      state.inventory.push(data);
      //console.log('state : ', state.posts)
   }

};

const actions = {

   initStocks :({commit}) => {

      axios.get( this.$baseURL + 'seller-products?limit=10&page=1')

      .then(resp => {
        // console.log('axios resp: ', resp.data.docs)
         const paginationDetails = [{totalItems: resp.data.total, pageLimit: resp.data.limit, totalPage: resp.data.pages, page: resp.data.page }]
         const inventoryList = {prodDetails: resp.data.docs, pageDetail: paginationDetails}
        // console.log('inventoryList: ', inventoryList.pageDetail)
         commit('GET_STOCKS', inventoryList)

      })
      .catch(err => {
         console.log("error in geturl: ", err)
      })

   }

};

const getters = {
   stockList: state => {

      return state.inventory;
   }
}
export default {
   state,
   mutations,
   actions,
   getters
}


import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Home from './views/Home.vue'
Vue.use(Router)
let baseURL ='https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/'

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: loadView('Home')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: loadView('Dashboard')
    },
    {
      path: '/addproduct',
      name: 'AddProduct',
      component: loadView('AddProduct')
    },
    {
      path: '/orders',
      name: 'Orders',

      component: loadView('Orders')
    },
    {
      path: '/product-details',
      name: 'Productdetails',
      component: loadView('ProductDetails')
    }

  ]
})
// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if(to.name == 'Dashboard') { // check if "to"-route is "callback" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.login()
    //console.log("auth: ", router.app.$auth)
  }
})
export default router
