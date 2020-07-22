import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      cartItems: []
    },

    getters: {
      cartItems (state) {
        return state.cartItems;
      }
    },

    mutations: {
      cartMutate (state, payload) {
        const index = state.cartItems.findIndex(cartItem => cartItem.name === payload.value.name);
        if (payload.type === 'add') {
          if (index !== -1) {
            state.cartItems[index].number = state.cartItems + payload.value.number;
          } else {
            state.cartItems.push(payload.value);
          }
        } else if (payload.type === 'remove') {
          state.cartItems.splice(index, 1);
        }
        console.log(state.cartItems);
      }
    },

    actions: {
      cartAction ({ commit }, payload) {
        commit('cartMutate', payload);
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
