# cypress-pom-framework

一句話簡介：這個專案用來建立 Cypress 的 Page Object Model (POM) 測試框架。

## 特色
- POM 結構範例與可擴充的頁面物件
- 依 `tests/` 結構管理測試與頁面物件
- 支援以環境變數切換測試站點

## 必要環境
- Windows / macOS / Linux
- Node.js 20+、npm 9+
- Chrome 或 Edge
- Allure 報告需 Java 11+

## 快速開始
```powershell
npm install
Copy-Item .env.example .env   # 可選，設定測試站點
./scripts/dev.ps1             # 開啟 Cypress GUI
./scripts/test.ps1            # Headless 執行測試
```

備註：
- `.env` 設定 `CYPRESS_BASE_URL`，未設定時預設 `https://example.cypress.io`

## 常用指令
```powershell
./scripts/dev.ps1
./scripts/test.ps1
npm run cy:run -- --spec tests/e2e/actions.cy.js
```

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
specs/      # 規格/計畫/任務文件（Spec-Kit 最小化導入）
```

## 設定
- 請使用 `.env.example` 作為範本建立 `.env`
- `CYPRESS_BASE_URL`：測試站點 baseUrl

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
```powershell
./scripts/test.ps1
npm run allure:generate
npm run allure:open
```

## Spec-Kit（最小化導入）
- 只維護 `spec.md` / `plan.md` / `tasks.md`
- 新增功能：`specs/NNN-<feature-name>/`
- 完成後更新 `tasks.md`

## Spec-Kit CLI（可選）
需要完整流程才安裝，僅維持最小化導入可跳過。

```powershell
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify check
```

常用指令：
- `/speckit.constitution` `/speckit.specify` `/speckit.plan` `/speckit.tasks` `/speckit.implement`
- `specify init` / `specify check`

## 常見問題
- 找不到 spec：確認檔案在 `tests/e2e/` 且符合 `*.cy.js`
- baseUrl 未生效：確認 `.env` 存在且 `CYPRESS_BASE_URL` 設定正確

## 貢獻方式
- 請先閱讀 `AGENTS.md`
- PR 請附上說明與測試結果

## 授權
（請填寫，例如 MIT / Apache-2.0 / Proprietary）

## 聯絡資訊
（請填寫，例如：維護者姓名、Email、Discord/Slack）
