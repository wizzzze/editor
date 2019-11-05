import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editor : null,
    models : []
  },
  mutations: {
	mutationsEditor(state, editor) {
		return state.editor = editor;
    },
	mutationsModels(state, models) {
		return state.models = models;
    },
	mutationsModel(state, model) {
		return state.models.push(model);
    },
  },
  actions: {
	actionsEditor(context, editor){
		context.commit('mutationsEditor', editor);
	},
	actionsModels(context, models){
		context.commit('mutationsModels', models);	
	},
	actionsAddModel(context, model){
		context.commit('mutationsModel', model);	
	}
  },
  modules: {
  }
})
