# Win98 公會打王時間同步工具｜Cloudflare 多人版

這包檔案是「多人同步版」的起始包。

## 檔案內容

- `index.html`：你的 Win98 打王排班網頁
- `functions/api/state.js`：Cloudflare Pages Function，用來讀取 / 儲存共用資料
- `schema.sql`：建立 D1 資料表用
- `migrations/0001_schema.sql`：同一份 SQL，給 Wrangler migration 用
- `wrangler.toml.example`：Cloudflare 設定範例

## 它怎麼運作？

大家打開同一個網站時：

1. 網頁會讀 `/api/state`
2. 大家新增 ID、職業、時間後，會寫回 `/api/state`
3. `/api/state` 會把資料存進 Cloudflare D1
4. 其他人重新整理或等自動同步，就會看到同一份資料

## 注意

直接雙擊 `index.html` 開啟時，會進入「本機測試模式」。
要多人同步，一定要部署到 Cloudflare Pages，並且綁定 D1 資料庫。
