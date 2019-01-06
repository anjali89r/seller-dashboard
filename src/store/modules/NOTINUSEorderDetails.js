/* eslint-disable */
//import Vue from 'vue'
import axios from 'axios';
const state = {
   orderList: []

}

const mutations = {

   'GET_ORDERS': (state, data) => {
      state.orderList.push(data);
      //console.log('state : ', state.posts)
   }

};
const actions = {

   initOrderDetails :({commit}) => {

      axios.get('https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/order-details?limit=10&page=1')

      .then(resp => {
        // console.log('axios respin order dEtails: ', resp.data.docs)
         const paginationDetails = [{totalItems: resp.data.docs.total, pageLimit: resp.data.docs.limit, totalPage: resp.data.docs.pages, page: resp.data.docs.page }]
         const orderList = {prodDetails: resp.data.docs, pageDetail: paginationDetails}
         //console.log('inventoryList: ', inventoryList.prodDetails)
         commit('GET_ORDERS', orderList)

      })
      .catch(err => {
         console.log("error in geturl in order details: ", err)
      })

   }

};

const getters = {
   orderLists: state => {
//console.log("getters order: ", state.orderList)
      return state.orderList;
   }
}
export default {
   state,
   mutations,
   actions,
   getters
}
