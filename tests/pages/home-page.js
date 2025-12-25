const BasePage = require("./base-page");

class HomePage extends BasePage {
    actionsLink() {
        return cy.get("a[href='/commands/actions']").filter(":visible").first();
    }

    openActions() {
        this.actionsLink().click();
    }
}

module.exports = HomePage;
