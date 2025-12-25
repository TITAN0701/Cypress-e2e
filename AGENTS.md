# Repository Guidelines（儲存庫指南）

此儲存庫目前僅包含本指南；請將其視為隨著程式碼庫成長而沉澱約定的地方。

## 專案結構與模組組織
- 將應用/原始碼放在 `src/`，按領域劃分子目錄（例如 `src/orders/`、`src/auth/`）。
- 測試放在 `tests/`，路徑與 `src/` 對應（例如 `tests/orders/`）。
- 靜態資源放在 `assets/`，文件放在 `docs/`。
- 腳本放在 `scripts/`，避免在儲存庫根目錄放臨時腳本。

## 建置、測試與開發命令
尚未提交建置工具。新增後請提供單一且有文件說明的入口，並保持命令一致。範例模式：
- `./scripts/dev.ps1` — 本機執行應用
- `./scripts/test.ps1` — 執行完整測試套件
- `./scripts/spec-kit-gui.ps1` — Spec-Kit 檢查後開啟 Cypress GUI
- `./scripts/build.ps1` — 產出發行產物

## 程式碼風格與命名約定
- 優先使用空格縮排；程式碼 4 空格，JSON/YAML 2 空格。
- 函式/變數用 `camelCase`，型別/類別用 `PascalCase`，檔案與目錄用 `kebab-case`。
- 及早加入格式化與 lint 工具（如 `prettier`、`eslint`、`ruff`），設定檔放在儲存庫根目錄。

## 環境架設摘要
- 必要環境：Windows/macOS/Linux、Node.js 20+、npm 9+、安裝依賴 `npm install`。
- 站點設定：`.env` 設定 `CYPRESS_BASE_URL`。
- 測試執行：Chrome/Edge。
- Allure 報告：Java 11+，`npm run allure:generate` 產出。
- Windows 腳本權限：PowerShell ExecutionPolicy 設為 `RemoteSigned`（CurrentUser）。

## Spec-Kit 最小化導入規範
- 僅維護三份文件：`spec.md`、`plan.md`、`tasks.md`。
- 每個功能建立新資料夾：`specs/NNN-<feature-name>/`。
- 實作完成後同步更新 `tasks.md` 勾選狀態。

## Spec-Kit CLI（可選）
- 本專案不強制安裝 CLI；若要走完整 Spec-Kit 流程才需要。
- 先備條件：Python 3.11+、uv、Git。
- 安裝：`uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`
- 產生資料夾：`.specify/`（規格模板）與 `.codex/`（代理資料，已加入 `.gitignore`）。

## Spec-Kit 使用流程摘要
- 檢查工具：`specify check`。
- 依序執行：`/speckit.constitution` → `/speckit.specify` → `/speckit.plan` → `/speckit.tasks`。
- 產出位置：`.specify/memory/` 與 `.specify/specs/`。

## Spec-Kit 指令速查
- 聊天指令：`/speckit.constitution`、`/speckit.specify`、`/speckit.plan`、`/speckit.tasks`、`/speckit.implement`。
- 可選指令：`/speckit.clarify`、`/speckit.analyze`、`/speckit.checklist`。
- CLI 指令：`specify init`、`specify check`。

## 測試指南
- 單元與整合測試放在 `tests/`。
- 測試命名統一使用 `*.test.*` 或 `*_test.*`。
- 覆蓋重點放在公開 API 與關鍵路徑，而非單純追求覆蓋率比例。

## Allure 整合 SOP
- 安裝依賴：確認 `package.json` 含 `allure-cypress` 與 `allure-commandline`。
- 設定外掛：在 `cypress.config.js` 的 `setupNodeEvents` 呼叫 `allureCypress` 並設定 `resultsDir` 為 `tests/artifacts/allure-results/`。
- 載入支援：在 `tests/support/e2e.js` 引入 `allure-cypress`。
- 報告腳本：提供 `allure:generate`、`allure:open`、`allure:serve` 三個 scripts。
- 驗收標準：`./scripts/test.ps1` 產生 `tests/artifacts/allure-results/`，`npm run allure:generate` 產生 `tests/artifacts/allure-report/`。

## 提交與拉取請求規範
- 目前無 Git 歷史；建議採用 Conventional Commits（例如 `feat: add orders model`）。
- PR 需包含簡要說明、關聯 Issue（如有）與測試證據；UI 變更需附截圖。

## 安全與設定
- 禁止提交金鑰；用 `.env.example` 記錄必要設定。
