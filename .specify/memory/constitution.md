# 專案憲章（Constitution）

本文件定義本專案的核心原則，用於規範測試品質、命名規範、POM 結構、報告與 CI 流程。

## 測試品質原則
- 測試必須可重現、可獨立執行，不依賴前序測試狀態。
- 優先使用穩定的定位策略（如 `data-cy`），避免依賴脆弱的 CSS 結構。
- 禁止使用硬式等待（`cy.wait(1000)`），改用可觀察的條件等待（`should`）。
- 測試名稱需清楚描述行為與結果，避免含糊用語。
- 覆蓋重點放在關鍵路徑與公開行為，不追求純覆蓋率。

## 命名與結構規範
- 目錄與檔案使用 `kebab-case`。
- 函式/變數使用 `camelCase`，型別/類別使用 `PascalCase`。
- 程式碼縮排 4 空格。
- 測試檔案放在 `tests/e2e/`，命名使用 `*.cy.js`。
- 頁面物件放在 `tests/pages/`。

## POM（Page Object Model）原則
- 每個頁面/功能模組對應一個 Page Object。
- Page Object 僅封裝「定位、動作、斷言」，避免混入測試情境邏輯。
- 重要行為要以方法封裝（例：`login(email, password)`）。
- 以 `BasePage` 提供共用操作（例如 `visit`）。
- 避免在 Page Object 中直接使用斷言以外的測試流程控制（保持可重用）。

## 報告與產物原則（Allure）
- 測試結果輸出至 `tests/artifacts/allure-results/`。
- 報告輸出至 `tests/artifacts/allure-report/`。
- 在需要時添加 Allure 標籤、描述與附檔，提升可追蹤性。

## CI 原則
- CI 必須使用一致入口（`npm run cy:run` 或 `./scripts/test.ps1`）。
- 必須保留測試產物（Allure 報告、截圖、錄影）作為 artifact。
- 測試站點一律透過 `CYPRESS_BASE_URL` 管理，不寫死 URL。
- 禁止在 CI 中寫入或提交任何敏感資訊。
