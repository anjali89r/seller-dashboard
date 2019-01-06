import Vue from 'vue'
import axios from 'axios';
/* eslint-disable */
const state = {
   copiedData: []
}

const mutations = {

   'DUPLICATE_COPY': (state, data) => {
    //console.log('mutated state ')
if(state.copiedData.length) {
   state.copiedData.splice(0)
}
      state.copiedData.push(data)
      console.log('state in copy prod: ', state.copiedData)
   }

};
const actions = {

   dataCopied :({commit}, payload) => {
      console.log('in action after dispatch')
      return new Promise((resolve, reject) => {
         // Do something here... lets say, a http call using vue-resource
         axios.get(Vue.prototype.$baseURL +'products?sku='+payload).then(resp => {
            console.log('axios resp in action dataCopied: ', resp.data[0])
         const sharedData = resp.data[0]
        console.log('sharedData: ', sharedData)
         commit('DUPLICATE_COPY', sharedData)
             resolve(resp);  // Let the calling function know that http is done. You may send some data back
         }, error => {
             // http failed, let the calling function know that action did not work out
             reject(error);
         })
     })

   }

};

const getters = {
   getDuplicateData: state => {
console.log("in getters dupli: ",state.copiedData )
      return state.copiedData[0];
   }
}
export default {
   state,
   mutations,
   actions,
   getters
}
