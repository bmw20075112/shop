# Quasar App (shop)

## 工作紀錄
1. firebase tree shake版本製作中(https://github.com/firebase/firebase-js-sdk/issues/2241)

## bug
1. mobile keyboard 在input focus時會壓縮大量空間 
1. q-interesection 和 GRID系統衝突而無作用

## 預定開發
1. 管理者介面
2. 餐點評論

## 已解決Bug
1. 購物車刪除選項無法控制數量
2. Vue Route Gate 無法結合Vuex(進入Checkout前)
3. Q-SELECT 搭配 i18n，綁定值沒有跟著翻譯
4. Filter菜單後，螢幕寬度>sm時要Reset filter
5. 合併相同食物數量(ref by refernce會改變原值數量，造成金額錯誤)

## 已完成功能
1.  TAB PANELS整合
2.  表單驗證
3.  付款表單
4.  MOBILE 下滑顯示回頂端的按鈕
5.  translate
6.  lt.sm的狀態，下拉選單選擇食物分類
7.  金額驗證(不得大於20000)
8.  儲值扣款系統
9.  History分頁
10. 合併訂單
11. 購買紀錄
12. History排序
13. 加入中文字體
14. 統一配色
15. 確認EMAIL是否被註冊過
16. 登入註冊Panel完成
17. 登入結合VUEX Action
18. 成交訂單紀錄上傳DB
19. 及時監聽DB
20. 語言、暗黑模式自動偵測
21. i18n校閱
22. DB 讀取、寫入規則加入
23. 裁減Checkout Layout，合併至mainLayout

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
