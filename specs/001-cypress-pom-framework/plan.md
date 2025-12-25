# 計畫：Cypress POM 框架

## 技術決策
- 測試框架：Cypress 13
- 報告整合：Allure（allure-cypress + allure-commandline）
- 腳本：PowerShell（Windows 友好）

## 實作步驟
1. 建立 `tests/` 資料夾結構（`e2e/`、`pages/`、`support/`、`fixtures/`）。
2. 建立 POM 基底與範例頁面物件。
3. 建立範例 spec 驗證 POM 流程。
4. 更新 `cypress.config.js`：
   - 設定 `baseUrl` 讀取 `CYPRESS_BASE_URL`。
   - 設定 `specPattern` 與資料夾路徑。
   - 設定 Allure `setupNodeEvents` 與 `resultsDir`。
5. 加入 Allure 支援檔與 scripts：
   - `tests/support/e2e.js` 引入 `allure-cypress`。
   - `package.json` 新增 `allure:*` 指令。
6. 撰寫 SOP 與環境需求文件。

## 檔案/目錄
- `cypress.config.js`
- `tests/pages/*.js`
- `tests/e2e/*.cy.js`
- `tests/support/e2e.js`
- `package.json`
- `README.md`
- `AGENTS.md`

## 驗收方式
- 執行 `./scripts/test.ps1`，確認測試可跑且產物生成。
- 執行 `npm run allure:generate`，確認報告可生成。
