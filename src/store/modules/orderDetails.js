/* eslint-disable */
import Vue from 'vue'
import axios from 'axios';
const state = {
   orderDetails: [] // [{contactdetails: {…}, trackingdetails:{...}}]

}

 const mutations = {

   'GET_ORDERDETAILS': (state, data) => {
      if(state.orderDetails.length) {
         state.orderDetails.splice(0)
      }
      state.orderDetails.push(data);
      console.log('state : ', state.orderDetails)
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
   getOrderDetails({commit}, payload) {
      return new Promise((resolve, reject) => {
          // Do something here... lets say, a http call using vue-resource
          axios.get(Vue.prototype.$baseURL +'order-details?orderid='+payload).then(resp => {
              // http success, call the mutator and change something in state
              const apiOutput = resp.data[0]
         commit('GET_ORDERDETAILS', apiOutput)
              resolve(resp);  // Let the calling function know that http is done. You may send some data back
          }, error => {
              // http failed, let the calling function know that action did not work out
              reject(error);
          })
      })
  }

};

const getters = {
   orderDetails: state => {
console.log("getters order: ", state.orderDetails)
      return state.orderDetails;
   }
}
export default {
   state,
   mutations,
   actions,
   getters

}
