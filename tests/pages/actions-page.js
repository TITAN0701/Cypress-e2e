const BasePage = require("./base-page");

class ActionsPage extends BasePage {
    assertLoaded() {
        cy.contains("h1", "Actions").should("be.visible");
    }
}

module.exports = ActionsPage;
