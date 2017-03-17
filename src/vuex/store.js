'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//初始状态
const state = {
	  indexActive: 0
};

//操作状态
const mutations = {
	 UPDATE (state, indexActive){
        state.indexActive = indexActive; 
	 }
};

export default new Vuex.Store({
    state,
    mutations
})