# Quasar App (shop)

## bug
1. q-interesection 和 GRID系統衝突而無作用

## 預定開發
1. 語言自動偵測
2. 配色
3. 首頁
4. 考慮是否導入SSR
5. 金額驗證(不得大於10000)
6. 儲值系統

## 已解決Bug
1. 購物車刪除選項無法控制數量
2. Vue Route Gate 無法結合Vuex(進入Checkout前)
3. Q-SELECT 搭配 i18n，綁定值沒有跟著翻譯
4. Filter菜單後，螢幕寬度>sm時要Reset filter

## 已完成功能
1. TAB PANELS整合
2. 表單驗證
3. 付款表單
4. MOBILE 下滑顯示回頂端的按鈕
5. translate
6. lt.sm的狀態，下拉選單選擇食物分類

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
