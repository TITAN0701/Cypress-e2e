# Tasks: Cypress POM 測試框架

**Input**: Design documents from `/specs/001-cypress-pom-framework/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可並行（不同檔案、無依賴）
- **[Story]**: US1/US2/US3

---

## Phase 1: Setup（共用基礎）

- [x] T001 建立測試資料夾結構 `tests/e2e/`, `tests/pages/`, `tests/support/`, `tests/fixtures/`, `tests/artifacts/`
- [x] T002 建立腳本 `scripts/dev.ps1`, `scripts/test.ps1`
- [x] T003 [P] 初始化 `package.json`，加入 Cypress 與 scripts
- [x] T004 [P] 更新 `.gitignore`（忽略 `tests/artifacts/`, `.env`, `node_modules/`）

---

## Phase 2: Foundation（必要前置）

- [x] T005 設定 `cypress.config.js`（`specPattern`, `supportFile`, `fixturesFolder`, `baseUrl`）
- [x] T006 [P] 建立 `tests/support/e2e.js` 與 `tests/support/commands.js`
- [x] T007 [P] 建立範例 fixture `tests/fixtures/example.json`

---

## Phase 3: User Story 1 - 快速啟動與範例驗證 (P1)

**Goal**: 提供可執行的 POM 與範例 spec

**Independent Test**: `./scripts/test.ps1`

- [x] T008 [P] 建立 POM 基底 `tests/pages/base-page.js`
- [x] T009 [P] 建立頁面物件 `tests/pages/home-page.js`, `tests/pages/actions-page.js`
- [x] T010 建立範例 spec `tests/e2e/actions.cy.js`
- [x] T011 更新 `README.md` 的使用範例與快速開始

---

## Phase 4: User Story 2 - 產生 Allure 報告 (P2)

**Goal**: 整合 Allure 並可產出報告

**Independent Test**: `npm run allure:generate`

- [x] T012 設定 `cypress.config.js` 的 Allure plugin 與 `resultsDir`
- [x] T013 [P] 更新 `tests/support/e2e.js` 引入 `allure-cypress`
- [x] T014 [P] 更新 `package.json` 加入 `allure:*` scripts
- [x] T015 更新 `README.md` 的 Allure SOP 與產物說明

---

## Phase 5: User Story 3 - CI 一致執行與產物保存 (P3)

**Goal**: CI 可用一致入口並保存產物

**Independent Test**: `npm run cy:run` + `npm run allure:generate`

- [x] T016 更新 `README.md` 的 CI 環境與產物上傳說明
- [x] T017 建立 `.env.example` 並在文件說明 `CYPRESS_BASE_URL`

---

## Phase N: Cross-Cutting

- [x] T018 更新 `AGENTS.md` 的規範與 SOP（環境、Allure、Spec-Kit）
