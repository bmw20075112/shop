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
    },

    state: {
      allSelect: false, // drawer是否選取全部訂單
      cartItems: [], // 購物車裡的所有訂單(不管有無選取)
      currentPagination: 1, // 已完成訂單目前查看分頁
      drawer: false, // drawer是否打開,
      history: false, // drawer目前是否顯示為歷史紀錄
      menuFilter: '', // mobile專用篩選菜單細項
      moneyLeft: 2000, // 使用者餘額
      orderSuccess: [], // 已完成付費的訂單
      selected: [], // 未付費的已選取訂單
      sortWay: 'sortTimeDesc',
      tab: 'east' // 目前的菜單類別
    },

    getters: {
      selectedContents (state) {
        const temp = [];
        const res = {};
        let index;
        state.selected.forEach(el => {
          index = state.cartItems.findIndex(item => item.itemID === el);
          temp.push(state.cartItems[index]);
        });

        for (let i of temp) {
          if (i.id in res) {
            res[i.id].totalNumber = res[i.id].totalNumber + i.number;
          } else {
            res[i.id] = { ...i, totalNumber: i.number };
          }
        }
        return [...Object.values(res)];
      },

      totalCost (state) {
        if (state.selected.length === 0) {
          return 0;
        } else {
          let res = 0;
          let index;
          for (let i of state.selected) {
            index = state.cartItems.findIndex(cartItem => cartItem.itemID === i);
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

      cartMutate (state, payload) {
        if (payload.type === 'add') {
          state.cartItems.push({ ...payload.value });
        } else if (payload.type === 'remove') {
          let index;
          for (let i of payload.value) {
            index = state.cartItems.findIndex(cartItem => cartItem.itemID === i);
            state.cartItems.splice(index, 1);
          }
        }
      },

      drawerMutate (state, payload) {
        state.drawer = payload;
      },

      historyMutate (state, payload) {
        state.history = payload;
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

      paginationNext (state, payload) {
        state.currentPagination = payload;
      },

      seletedMutate (state, payload) {
        state.selected = payload;
      },

      sortWayMutate (state, payload) {
        state.sortWay = payload
      },

      tabMutate (state, payload) {
        state.tab = payload;
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
