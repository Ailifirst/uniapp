import { getField, updateField } from 'vuex-map-fields'
const state ={
	currentUser:"测试",
	form:{
		account:"测试acc",
		info:{
			test:"test"
		}
	}
}

const getters = {
    getField,
}

const mutations = {
    updateField,
    
}

const actions = {
	go({commit,state},router,path){		
		router.push({
			name:'error',
			params:{
				id:12
			}
		})
	}
}

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
