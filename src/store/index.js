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
      allSelect: false,
      cartItems: [],
      menuFilter: '',
      moneyLeft: 2000,
      order: 0,
      orderSuccess: [],
      selected: [],
      tab: 'east',
      drawer: false
    },

    getters: {
      cartItems (state) {
        return state.cartItems;
      },

      selected (state) {
        return state.selected;
      },

      selectedContents (state) {
        const res = [];
        let index;
        state.selected.forEach(el => {
          index = state.cartItems.findIndex(item => item.order === el);
          res.push(state.cartItems[index]);
        });
        return res;
      },

      totalCost (state) {
        if (state.selected.length === 0) {
          return 0;
        } else {
          let res = 0;
          let index;
          for (let i of state.selected) {
            index = state.cartItems.findIndex(cartItem => cartItem.order === i);
            res += state.cartItems[index].price * state.cartItems[index].number;
          }
          return res;
        }
      }
    },

    mutations: {
      allSelectMutate (state, payload) {
        state.allSelect = payload;
      },

      orderMutate (state) {
        state.order++;
      },
      cartMutate (state, payload) {
        if (payload.type === 'add') {
          this.commit('orderMutate');
          state.cartItems.push({ ...payload.value, order: state.order });
        } else if (payload.type === 'remove') {
          let index;
          for (let i of payload.value) {
            index = state.cartItems.findIndex(cartItem => cartItem.order === i);
            state.cartItems.splice(index, 1);
          }
        }
      },

      menuFilterMutate (state, payload) {
        state.menuFilter = payload;
      },

      moneyLeftMutate (state, payload) {
        state.moneyLeft += payload;
      },

      orderSuccessSend (state, payload) {
        state.orderSuccess.push(payload);
      },

      seletedMutate (state, payload) {
        state.selected = payload;
      },

      tabMutate (state, payload) {
        state.tab = payload;
      },

      drawerMutate (state, payload) {
        state.drawer = payload;
      }
    },

    actions: {
      cartAction ({ commit }, payload) {
        commit('cartMutate', payload);
      },

      selectedAction ({ commit }, payload) {
        commit('seletedMutate', payload);
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
