# Feature Specification: Cypress POM 測試框架

**Feature Branch**: `001-cypress-pom-framework`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "建立 Cypress POM 測試框架，包含頁面物件範例、測試範例、Allure 報告、CI 執行流程"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 快速啟動與範例驗證 (Priority: P1)

作為測試工程師，我希望在完成安裝後能快速開啟 Cypress，並透過範例 POM + spec 驗證框架可用。

**Why this priority**: 這是使用者最先需要完成的基本驗證流程。

**Independent Test**: 只要執行 `./scripts/test.ps1` 或 `./scripts/dev.ps1` 即可完成。

**Acceptance Scenarios**:

1. **Given** 已完成 `npm install`，**When** 執行 `./scripts/test.ps1`，**Then** 範例 spec 應成功執行。
2. **Given** 已完成 `npm install`，**When** 執行 `./scripts/dev.ps1`，**Then** 可在 GUI 中看到範例 spec。

---

### User Story 2 - 產生 Allure 報告 (Priority: P2)

作為測試工程師，我希望在執行測試後能產生 Allure 報告，方便檢視結果。

**Why this priority**: 報告是團隊追蹤測試結果的重要依據。

**Independent Test**: 執行一次測試後使用 `npm run allure:generate` 產生報告即可驗證。

**Acceptance Scenarios**:

1. **Given** 已執行測試，**When** 執行 `npm run allure:generate`，**Then** 產出 `tests/artifacts/allure-report/`。
2. **Given** 已產生報告，**When** 執行 `npm run allure:open`，**Then** 可開啟報告頁面。

---

### User Story 3 - CI 一致執行與產物保存 (Priority: P3)

作為 CI 維護者，我希望在 CI 中使用一致的測試入口並保留測試產物。

**Why this priority**: CI 需要穩定且可追溯的測試結果與產物。

**Independent Test**: 在任一 CI/測試機執行 `npm run cy:run` 並驗證產物路徑。

**Acceptance Scenarios**:

1. **Given** CI 已安裝依賴，**When** 執行 `npm run cy:run`，**Then** 產生 `tests/artifacts/` 內的結果。
2. **Given** 有 Allure 結果檔，**When** 執行 `npm run allure:generate`，**Then** 產生可上傳的報告資料夾。

---

### Edge Cases

- `.env` 未設定 `CYPRESS_BASE_URL` 時，應使用預設站點。
- Java 未安裝時，`npm run allure:generate` 應提供可理解的錯誤提示。
- CI 環境未安裝瀏覽器時，測試應有明確失敗資訊。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統必須使用 `tests/pages/` 管理 Page Objects。
- **FR-002**: 系統必須使用 `tests/e2e/` 管理 Cypress spec（`*.cy.js`）。
- **FR-003**: 系統必須支援 `CYPRESS_BASE_URL` 切換測試站點。
- **FR-004**: 系統必須產生測試截圖與錄影至 `tests/artifacts/`。
- **FR-005**: 系統必須產生 Allure 結果檔至 `tests/artifacts/allure-results/`。
- **FR-006**: 系統必須提供報告產生與開啟指令（`allure:generate`、`allure:open`）。
- **FR-007**: 系統必須提供一致的測試入口（`./scripts/test.ps1`、`npm run cy:run`）。
- **FR-008**: 文件必須說明環境需求、操作流程與報告產出方式。

### Key Entities *(include if feature involves data)*

- **Page Object**: 封裝頁面元素與操作的類別。
- **Spec**: Cypress 測試規格檔（`*.cy.js`）。
- **Test Artifacts**: 測試產物（截圖、錄影、Allure 結果/報告）。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 新手可在 10 分鐘內完成安裝並跑完範例測試。
- **SC-002**: 每次執行測試後可產生 Allure 結果檔。
- **SC-003**: 在 CI 中可產生並上傳 Allure 報告產物。
- **SC-004**: POM 範例可被複用於新增測試案例。
