import { authenticationService } from '../_services';
import { router } from '../_helpers';

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

export const authentication = {
  namespaced: true,
  state: {
    username: username,
    status: {
      loggingIn: false,
      loggedIn: token !== null && username !== null
    }
  },
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', username);

      authenticationService.login(username, password)
          .then(
              user => {
                  commit('loginSuccess', user);
                  router.push('/');
              },
              error => {
                  commit('loginFailure', error);
                  dispatch('alert/error', error, { root: true });
              }
          );
    },
    logout({ commit }) {
        authenticationService.logout();
        commit('logout');
    }
  },
  mutations: {
    loginRequest(state) {
      state.status.loggingIn = true;
    },
    loginSuccess(state, user) {
        state.status.loggedIn = true;
        state.status.loggingIn = false;
        state.token = user.token;
        state.username = user.username;
    },
    loginFailure(state) {
        state.status.loggedIn = false;
        state.status.loggingIn = false;
        state.username = null;
    },        
    logout(state) {
      state.status.loggedIn = false;
      state.username = null;
    }
  }
};