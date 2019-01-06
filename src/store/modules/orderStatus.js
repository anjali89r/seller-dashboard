import axios from 'axios';
import Vue from 'vue';
const state = {
   orderStatus: []
}

const mutations = {

   'GET_ORDER_STATUS': (state, data) => {
    console.log('mutated state ')
      data.splice(-1,1);
      state.orderStatus = data
      //console.log('state : ', state.posts)
   }

};
const actions = {

   initOrderStatus :({commit}) => {

      axios.get(Vue.prototype.$baseURL + 'order-status')

      .then(resp => {
        // console.log('axios resp: ', resp.data)
        console.log("status resp: ", resp.data)
         const orderStatus = resp.data

         commit('GET_ORDER_STATUS', orderStatus)

      })
      .catch(err => {
         console.log("error in geturl: ", err)
      })

   }

};

const getters = {
   orderStatus: state => {

      return state.orderStatus;
   }
}
export default {
   state,
   mutations,
   actions,
   getters
}
