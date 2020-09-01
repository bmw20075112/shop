import { auth, db } from '../api/firebase/firebase.js';
import menu from './menu'
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
      menu
    },

    state: {
      allSelect: false, // drawer是否選取全部訂單
      cartItems: [], // 購物車裡的所有訂單(不管有無選取)
      currentPagination: 1, // 已完成訂單目前查看分頁
      depositOpen: false, // 儲值系統是否打開
      drawer: false, // drawer是否打開,
      history: false, // drawer目前是否顯示為歷史紀錄
      identityDialog: false, // 是否打開登入/註冊表單
      isLogin: false, // 目前是否登入
      menuFilter: '', // mobile專用篩選菜單細項
      orderSuccess: [], // 已完成付費的訂單
      selected: [], // 未付費的已選取訂單
      sortWay: 'sortTimeDesc', // 已完成付費訂單的排序方法
      tab: 'east', // 目前的菜單類別,
      unsubscribe: null, // 解除onsnapshot的監聽
      userInfo: {}, // 從firebase接下來的個人資料(姓名、餘額)
      userSetting: false // userSetting表單是否打開
    },

    getters: {
      accounts (state) {
        if (state.isLogin) {
          return state.userInfo.accounts;
        } else {
          return 0;
        }
      },

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

        for (let i in res) {
          delete res[i].number;
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

      depositOpenMutate (state, payload) {
        state.depositOpen = payload;
      },

      drawerMutate (state, payload) {
        state.drawer = payload;
      },

      historyMutate (state, payload) {
        state.history = payload;
      },

      identityMutate (state, payload) {
        state.identityDialog = payload;
      },

      isLoginMutate (state, payload) {
        state.isLogin = payload;
      },

      menuFilterMutate (state, payload) {
        state.menuFilter = payload;
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
      },

      userGet (state, payload) {
        state.userInfo = payload;
      },

      userSettingMutate (state, payload) {
        state.userSetting = payload;
      },

      orderSuccessGet (state, payload) {
        state.orderSuccess = payload;
      },

      unsubscribe (state, payload) {
        if (payload) {
          state.unsubscribe = payload;
        } else {
          state.unsubscribe();
        }
      }
    },

    actions: {
      userGet ({ commit }) { // 監聽DB資料
        let unsubscribe = db.collection('users').doc(auth.currentUser.uid)
          .onSnapshot(snapshot => {
            let { history, ...userInfo } = snapshot.data();
            commit('userGet', userInfo);
            commit('orderSuccessGet', history);
          });
        commit('unsubscribe', unsubscribe);
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
