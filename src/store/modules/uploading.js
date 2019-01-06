import axios from 'axios'

 const state =  {


        policy: null

};
const mutations = {
    FETCH_ALL_SIGN_AND_POLICY() {
        console.log('Fetching all Signature and Policy...')
    },
    FETCH_ALL_SIGN_AND_POLICY_SUCCESS(state, data) {
       console.log('fetch all sign policy success data: ', data)
        state.policy = data;
        console.log("state.policy.upload_url: ", state.policy.upload_url)
    },
    FETCH_ALL_SIGN_AND_POLICY_FAILURE(state, error) {
        console.error(error);
    },

    UPLOADING_FILE() {
        console.log('Uploading File...')
    },
    UPLOADING_FILE_SUCCESS(state, data) {
        state.file = state.policy.upload_url + '/' + state.policy.key;
        state.key = state.policy.key;
        state.response = data;
        console.log("upload success: ", state)
    },
    UPLOADING_FILE_FAILURE(state, error) {
        console.log(error);
    },
};
const actions = {
    async fetchSignatureAndPolicy({ state, commit }, payload) {
        try {
           console.log('in action policy')
            commit('FETCH_ALL_SIGN_AND_POLICY')
            let { data } = await axios.get(`https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/s3-signed-url?filename=${payload.name}`);
            commit('FETCH_ALL_SIGN_AND_POLICY_SUCCESS', data)
        } catch (error) {
            commit('FETCH_ALL_SIGN_AND_POLICY_FAILURE', error)
        }
    },
    async upload({ state, commit }, payload) {
        try {
            commit('UPLOADING_FILE')

            let  data  = await axios.post(`${state.policy.upload_url}`, payload)
            console.log("data in post: ",  data )
            // if(data.status === 204){
            //     commit('UPLOADING_FILE_SUCCESS', data, payload)
            // }
            commit('UPLOADING_FILE_SUCCESS', data, payload)
        } catch (error) {
            commit('UPLOADING_FILE_FAILURE', error)
        }
    },

}
const getters= {
   getImageUrl: state => {

      return state.file;
   }
}
export default {
    state,
    mutations,
    actions,
    getters
 }
