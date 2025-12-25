const BasePage = require("./base-page");

class HomePage extends BasePage {
    actionsLink() {
        return cy.contains("a", "Actions");
    }

    openActions() {
        this.actionsLink().click();
    }
}

module.exports = HomePage;
