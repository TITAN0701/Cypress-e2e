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

## 表格資料比對（UI vs API）
常見需求是「UI 表格要和 API 回傳一致」，可以先攔 API 再比對表格內容。

```javascript
// tests/e2e/orders-table.cy.js
describe("Orders table", () => {
    it("UI table matches API data", () => {
        cy.intercept("GET", "/api/orders").as("getOrders");
        cy.visit("/orders");

        cy.wait("@getOrders").then(({ response }) => {
            const apiRows = response.body.data.map((order) => [
                String(order.id),
                order.customerName,
                order.status,
                String(order.total),
            ]);

            cy.get("[data-test=orders-table] tbody tr").then(($rows) => {
                const uiRows = [...$rows].map((row) =>
                    [...row.querySelectorAll("td")].map((cell) =>
                        cell.innerText.trim()
                    )
                );

                expect(uiRows).to.deep.equal(apiRows);
            });
        });
    });
});
```

重點說明：
- `cy.intercept` 取得 API 回傳資料。
- 將 API 與 UI 都轉成相同的陣列結構再比對。
- 若 UI 有格式化（日期、金額），要在比對前先對齊格式。

## 表格前後狀態比對（更新前/後）
適合檢查「更新按鈕」或「資料刷新」是否真的改變內容。

```javascript
// tests/e2e/orders-table-refresh.cy.js
const getTableRows = () =>
    cy.get("[data-test=orders-table] tbody tr").then(($rows) =>
        [...$rows].map((row) =>
            [...row.querySelectorAll("td")].map((cell) =>
                cell.innerText.trim()
            )
        )
    );

describe("Orders table refresh", () => {
    it("table changes after refresh", () => {
        cy.visit("/orders");

        getTableRows().then((before) => {
            cy.wrap(before).as("beforeRows");
        });

        cy.get("[data-test=refresh]").click();

        getTableRows().then((after) => {
            cy.get("@beforeRows").should("not.deep.equal", after);
        });
    });
});
```

## 只比關鍵欄位（更穩定）
當 UI 會排序或有不穩定欄位時，只比重要欄位會更穩。

```javascript
// tests/e2e/orders-table-key-fields.cy.js
describe("Orders table key fields", () => {
    it("matches key columns only", () => {
        cy.get("[data-test=orders-table] tbody tr").then(($rows) => {
            const keyCols = [...$rows].map((row) => [
                row.querySelector("td[data-col=id]").innerText.trim(),
                row.querySelector("td[data-col=status]").innerText.trim(),
            ]);

            expect(keyCols).to.have.length.greaterThan(0);
        });
    });
});
```

## 進階但很有價值的做法
適合在專案穩定後逐步導入，能明顯提升測試穩定性與品質。

### 1) Testing Library（語意化選擇器）
用使用者角度找元素（role/label/text），比 `class` 更穩也更符合可近性。

用法（安裝後）：
```javascript
// tests/support/e2e.js
require("@testing-library/cypress/add-commands");
```
```javascript
// tests/e2e/login.cy.js
cy.findByRole("button", { name: "登入" }).click();
cy.findByLabelText("Email").type("user@example.com");
```

### 2) 視覺回歸（Image Snapshot）
透過截圖比對來防止 UI 退化，特別適合列表、表格、卡片牆等版面。

用法（安裝後）：
```javascript
// tests/support/e2e.js
require("@simonsmith/cypress-image-snapshot/command");
```
```javascript
// tests/e2e/product-visual.cy.js
cy.get("[data-test=product-list]").matchImageSnapshot("product-list");
```

### 3) 固定 viewport + 穩定資料
避免因版面尺寸或資料漂移造成測試不穩定。

用法：
```javascript
cy.viewport(1280, 720);
cy.intercept("GET", "/api/orders", { fixture: "orders.json" }).as("getOrders");
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
- 視覺基準圖：`tests/artifacts/visual/snapshots/`
- 視覺差異圖：`tests/artifacts/visual/diff/`

## 視覺回歸（Image Snapshot）
使用 `@simonsmith/cypress-image-snapshot` 做 UI 截圖比對，第一次會產生基準圖，之後會與基準圖做像素比對。

最小範例：
```javascript
// tests/e2e/product-visual.cy.js
describe("Product list visual", () => {
    it("matches baseline", () => {
        cy.visit("/products");
        cy.get("[data-test=product-list]").matchImageSnapshot("product-list");
    });
});
```

運作方式：
- `matchImageSnapshot("product-list")` 會截取指定區塊並用名稱建立/比對基準圖。
- 第一次跑測試：產生 baseline；之後跑測試：新截圖跟 baseline 比對。
- 差異超過閾值時測試會失敗，並輸出 diff 圖。

更新基準圖（擇一）：
- 刪除 `tests/artifacts/visual/snapshots/` 中對應的基準圖再重跑。
- 若你有啟用套件的更新旗標，也可用該旗標重新產生 baseline。
-
  也可用這個簡單流程：
  1) 刪除要更新的 baseline 檔案（或整個 `tests/artifacts/visual/snapshots/`）
  2) 重新執行對應的 spec

穩定性建議：
- 固定 viewport，避免動畫、時間、隨機資料影響截圖。
- 使用穩定測試資料或 mock，避免 UI 內容漂移。

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
