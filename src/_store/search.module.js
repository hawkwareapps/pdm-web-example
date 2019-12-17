import { searchService } from '../_services';

export const search = {
  namespaced: true,
  state: {
    status: {
      searching: false,
      completed: false
    },
    items: []
  },
  actions: {
    search({ dispatch, commit }, text) {
      commit('searchRequest');
      searchService.search(text)
          .then(
              items => {
                  commit('searchSuccess', items);
              },
              error => {
                  commit('searchFailure');
                  dispatch('alert/error', error, { root: true });
              }
          );
    }
  },
  mutations: {
    searchRequest(state) {
      state.status.searching = true;
      state.status.completed = false;
    },
    searchSuccess(state, items) {
        state.status.searching = false;
        state.status.completed = true;
        state.items = items;
    },
    searchFailure(state) {
        state.status.searching = false;
        state.status.completed = true;
    }
  }
};