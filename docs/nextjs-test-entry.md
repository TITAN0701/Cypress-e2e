This is a minimal, practical example of a "test entry" for Next.js so Cypress can
seed data without clicking through deep UI.

中文說明
這是一個最小可行的 Next.js「測試入口」範例，讓 Cypress 可以直接建立測試資料，
避免在 UI 裡一層層點擊，速度更快也更穩定。

Goal
Make a test-only API endpoint, call it from Cypress, then test the UI.

目的
建立一個「只給測試用」的 API，Cypress 先呼叫它建立資料，再進頁面驗證 UI。

App Router example (Next.js 13+)
Create a file at `app/api/test/seed/route.js`:

App Router 範例（Next.js 13+）
建立檔案 `app/api/test/seed/route.js`：

```js
export async function POST(request) {
    if (process.env.NEXT_PUBLIC_TEST_MODE !== "1") {
        return new Response("Not Found", { status: 404 });
    }

    const body = await request.json();

    // Example: insert data using your own DB or service.
    // await db.orders.create({ data: body.order });

    return Response.json({ ok: true });
}
```

Cypress usage:

Cypress 用法：

```js
describe("order flow", () => {
    it("loads seeded data", () => {
        cy.request("POST", "/api/test/seed", {
            order: { id: "demo-1", total: 100 }
        });

        cy.visit("/orders/demo-1");
        cy.contains("demo-1").should("be.visible");
    });
});
```

How to enable test mode
Set this env var only for tests:

如何啟用測試模式
只在測試時設定這個環境變數：

```
NEXT_PUBLIC_TEST_MODE=1
```

Notes
- This avoids deep UI clicks and makes tests faster and more stable.
- Keep the seed endpoint disabled in production by default.

注意事項
- 避免深層 UI 點擊，測試會更快、更穩定。
- 預設要在正式環境關閉這個測試入口。
