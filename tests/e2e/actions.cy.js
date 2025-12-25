const HomePage = require("../pages/home-page");
const ActionsPage = require("../pages/actions-page");

describe("Actions page", () => {
    const homePage = new HomePage();
    const actionsPage = new ActionsPage();

    it("navigates to Actions via the home page", () => {
        homePage.visit();
        homePage.openActions();
        actionsPage.assertLoaded();
    });
});
