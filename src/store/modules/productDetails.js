/* eslint-disable */
import Vue from 'vue'
import axios from 'axios';
const state = {
   productDetails: [] // [{contactdetails: {…}, trackingdetails:{...}}]

}

 const mutations = {

   'GET_PRODUCTDETAILS': (state, data) => {
      if(state.productDetails.length) {
         state.productDetails.splice(0)
      }
      state.productDetails.push(data);
      console.log('state in prodDetail.js : ', state.productDetails)
   }

};
const actions = {

//    getOrderDetails :({commit}, payload) => {
// console.log('commit actions')
//       axios.get(Vue.prototype.$baseURL +'order-details?orderid='+payload)
//       .then(resp => {
//         console.log('response actions: ', resp.data[0])
//         const apiOutput = resp.data[0]
//          commit('GET_ORDERDETAILS', apiOutput)

//       })
//       .catch(err => {
//          console.log("error in geturl in order details: ", err)
//       })

//    },
   getProductDetails({commit}, payload) {
      return new Promise((resolve, reject) => {
          console.log("payload: ", payload)
          axios.get(Vue.prototype.$baseURL +'products?sku='+payload).then(resp => {

              console.log("resp in getProductDetails action: ", resp)
              const apiOutput = resp.data[0]
         commit('GET_PRODUCTDETAILS', apiOutput)
              resolve(resp);  // Let the calling function know that http is done. You may send some data back
          }, error => {
              // http failed, let the calling function know that action did not work out
              reject(error);
          })
      })
  }

};

const getters = {
   productDetails: state => {
console.log("getters prodDetails: ", state.productDetails)
      return state.productDetails;
   }
}
export default {
   state,
   mutations,
   actions,
   getters

}
