# cypress-pom-framework

一句話簡介：這個專案用來建立 Cypress 的 Page Object Model (POM) 測試框架。

## 特色
- POM 結構範例與可擴充的頁面物件
- 依 `tests/` 結構管理測試與頁面物件
- 支援以環境變數切換測試站點

## 需求
- 作業系統：Windows / macOS / Linux
- 語言/執行環境：Node.js 20+
- 套件管理：npm 9+
- 瀏覽器：Chrome 或 Edge（Cypress 可用內建瀏覽器，也可指定系統瀏覽器）
- 產生 Allure 報告：Java 11+（如 `allure` 指令執行失敗再安裝）
  - `allure` CLI 由 `allure-commandline` 提供（`npm install` 後可用 `npx allure` 或 `npm run allure:*`）

## 安裝

```powershell
# 安裝依賴
npm install
```

## 環境架設（整合版）
以下為目前專案「完整」環境需求與設定項目，請依使用情境準備：

### 必要環境（所有情境都需要）
1. 作業系統：Windows / macOS / Linux。
2. Node.js 20+（建議 LTS）。
3. npm 9+（隨 Node.js 一併安裝）。
4. 安裝專案依賴：`npm install`。
5. 設定站點：
   - 建立 `.env`，設定 `CYPRESS_BASE_URL` 指向測試站點。
   - 未設定時預設為 `https://example.cypress.io`。

### 測試執行環境（本機或測試機）
1. 瀏覽器：Chrome 或 Edge。
2. 執行測試：`./scripts/test.ps1` 或 `npm run cy:run`。

### Allure 報告環境
1. Java 11+（Allure 產報告需要）。
2. 報告指令：
   - 產生報告：`npm run allure:generate`
   - 開啟報告：`npm run allure:open`
   - 即時產生並開啟：`npm run allure:serve`
3. 產物路徑：
   - 結果：`tests/artifacts/allure-results/`
   - 報告：`tests/artifacts/allure-report/`

### Windows PowerShell 腳本權限（若遇到無法執行）
1. 以管理員身分開啟 PowerShell。
2. 執行：`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`。

### CI 環境（如 GitHub Actions）
1. Node.js 20+。
2. 安裝依賴：`npm install`。
3. 執行測試：`npm run cy:run`（或 `./scripts/test.ps1`）。
4. 需要報告時：
   - 安裝 Java 11+。
   - 執行 `npm run allure:generate`。
   - 上傳 `tests/artifacts/allure-report/` 作為產物。

## 使用方式

```powershell
# 本機啟動
./scripts/dev.ps1

# 執行測試
./scripts/test.ps1
```

## 快速開始
1. 先在專案根目錄執行 `npm install`。
2. 如需改測試站點，建立 `.env` 並設定 `CYPRESS_BASE_URL`。
3. 執行 `./scripts/dev.ps1` 開啟 Cypress GUI，或 `./scripts/test.ps1` 直接跑測試。

## 專案結構

```
src/        # 應用/原始碼
tests/      # 單元與整合測試
  e2e/      # Cypress spec
  pages/    # Page Objects
  support/  # Cypress support
  fixtures/ # Cypress fixtures
docs/       # 文件
assets/     # 靜態資源
scripts/    # 開發/建置腳本
```

## 設定
- 請使用 `.env.example` 作為範本建立 `.env`。
- `CYPRESS_BASE_URL`：測試站點 baseUrl，預設為 `https://example.cypress.io`。

## 撰寫 Page Object（POM）
建議在 `tests/pages/` 內以頁面或功能模組建立檔案，檔名採 `kebab-case`：

```javascript
// tests/pages/login-page.js
class LoginPage {
    emailInput() {
        return cy.get("[data-cy=email]");
    }

    passwordInput() {
        return cy.get("[data-cy=password]");
    }

    submitButton() {
        return cy.get("[data-cy=login-submit]");
    }

    login(email, password) {
        this.emailInput().type(email);
        this.passwordInput().type(password);
        this.submitButton().click();
    }
}

module.exports = LoginPage;
```

## 撰寫測試（Spec）
測試放在 `tests/e2e/`，檔名建議使用 `*.cy.js`：

```javascript
const LoginPage = require("../pages/login-page");

describe("Login", () => {
    const loginPage = new LoginPage();

    it("should login successfully", () => {
        cy.visit("/login");
        loginPage.login("user@example.com", "password");
        cy.contains("h1", "Dashboard").should("be.visible");
    });
});
```

## 自訂命令（Commands）
若有共用操作可放在 `tests/support/commands.js`：

```javascript
Cypress.Commands.add("loginByApi", (email, password) => {
    cy.request("POST", "/api/login", { email, password });
});
```

## 測試產物
- 截圖：`tests/artifacts/screenshots/`
- 錄影：`tests/artifacts/videos/`
- Allure 結果：`tests/artifacts/allure-results/`
- Allure 報告：`tests/artifacts/allure-report/`

## Allure 報告
1. 先執行測試產生結果檔：
   - `./scripts/test.ps1`
2. 產生報告：
   - `npm run allure:generate`
3. 開啟報告：
   - `npm run allure:open`

補充：
- 想快速產生並開啟報告，可用 `npm run allure:serve`。
- 結果輸出路徑可在 `cypress.config.js` 的 `resultsDir` 調整。

## Allure 整合 SOP
以下為整合 Allure 到 Cypress 的標準流程（新專案或維護時請遵循）：
1. 安裝依賴：
   - `npm install`
   - 確認 `package.json` 有 `allure-cypress` 與 `allure-commandline`。
2. 設定 Cypress 外掛：
   - 在 `cypress.config.js` 的 `setupNodeEvents` 內呼叫 `allureCypress(on, config, { resultsDir })`。
   - 結果路徑統一為 `tests/artifacts/allure-results/`。
3. 載入支援檔：
   - 在 `tests/support/e2e.js` 引入 `allure-cypress`。
4. 建立報告腳本：
   - 確認 `package.json` scripts 有：
     - `allure:generate`
     - `allure:open`
     - `allure:serve`
5. 產出與驗收：
   - 執行 `./scripts/test.ps1` 應產生 `tests/artifacts/allure-results/`。
   - 執行 `npm run allure:generate` 應產生 `tests/artifacts/allure-report/`。
6. 環境需求：
   - `allure` 指令若無法執行，請安裝 Java 11+ 後再重試。

## 常見問題
- 找不到 spec：確認檔案在 `tests/e2e/` 且符合 `*.cy.js` 命名。
- baseUrl 未生效：確認 `.env` 存在且 `CYPRESS_BASE_URL` 設定正確。
  - 或直接修改 `cypress.config.js` 的 `baseUrl`。

## 開發與測試
- 建議在 `AGENTS.md` 中維護團隊一致的貢獻規範與命令。
- 可列出常用指令，例如：
  - `./scripts/dev.ps1` — 本機執行應用
  - `./scripts/test.ps1` — 執行完整測試套件
  - `./scripts/build.ps1` — 產出發行產物

## 貢獻方式
- 請先閱讀 `AGENTS.md` 的貢獻規範。
- PR 請附上說明、測試結果與必要的截圖。

## 授權
（請填寫，例如 MIT / Apache-2.0 / Proprietary）

## 聯絡資訊
（請填寫，例如：維護者姓名、Email、Discord/Slack）
