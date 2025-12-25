# 規格：Cypress POM 框架

## 背景與目的
本專案建立 Cypress 的 Page Object Model (POM) 測試框架，提供可擴充的頁面物件結構、測試範例、測試產物與報告整合，讓團隊能快速開始並保持一致性。

## 目標
- 提供清楚的 POM 結構與範例。
- 支援以環境變數切換測試站點。
- 產出測試截圖、錄影與 Allure 報告。
- 提供一致的本機與 CI 使用方式。

## 範圍
### 內含
- Cypress 設定與資料夾規範。
- POM 基底與範例頁面物件。
- 範例測試規格（spec）。
- Allure 報告整合與腳本。
- 基本文檔與 SOP。

### 不含
- 被測系統（AUT）本身。
- 真實業務流程與完整測試案例。
- 進階測試資料生成或資料庫種子流程。

## 使用者/角色
- QA/測試工程師。
- 開發者（撰寫或維護自動化測試）。
- CI 維護者（負責測試執行與報告產物）。

## 功能需求
- FR-1：以 `tests/pages/` 管理 Page Objects。
- FR-2：以 `tests/e2e/` 管理測試規格（`*.cy.js`）。
- FR-3：支援 `CYPRESS_BASE_URL` 切換測試站點。
- FR-4：產生測試截圖與錄影。
- FR-5：產生 Allure 結果檔並可生成報告。
- FR-6：提供 `scripts/dev.ps1` 與 `scripts/test.ps1` 作為一致入口。

## 非功能需求
- NFR-1：檔案與目錄使用 `kebab-case`。
- NFR-2：程式碼縮排 4 空格。
- NFR-3：文件可在 Windows/macOS/Linux 皆可使用。

## 驗收標準
- AC-1：執行 `./scripts/test.ps1` 可產生 `tests/artifacts/screenshots/` 與 `tests/artifacts/videos/`。
- AC-2：執行 `npm run allure:generate` 產生 `tests/artifacts/allure-report/`。
- AC-3：`tests/e2e/` 內的範例 spec 可執行且成功。
