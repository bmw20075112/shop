import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu'

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
      menu
      // example
    },
    state: {
      cartItems: [],
      order: 0
    },

    getters: {
      cartItems (state) {
        return state.cartItems;
      }
    },

    mutations: {
      orderMutate (state) {
        state.order++;
      },
      cartMutate (state, payload) {
        if (payload.type === 'add') {
          this.commit('orderMutate');
          console.log(this.$router);
          state.cartItems.push({ ...payload.value, order: state.order });
        } else if (payload.type === 'remove') {
          let index;
          for (let i of payload.value) {
            index = state.cartItems.findIndex(cartItem => cartItem.order === i);
            state.cartItems.splice(index, 1);
          }
        }
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
