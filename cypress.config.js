const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
const {
    addMatchImageSnapshotPlugin,
} = require("@simonsmith/cypress-image-snapshot/plugin");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            allureCypress(on, config, {
                resultsDir: "tests/artifacts/allure-results",
            });
            addMatchImageSnapshotPlugin(on, {
                customSnapshotsDir: "tests/artifacts/visual/snapshots",
                customDiffDir: "tests/artifacts/visual/diff",
            });
            return config;
        },
        baseUrl: process.env.CYPRESS_BASE_URL || "https://example.cypress.io",
        specPattern: "tests/e2e/**/*.cy.js",
        supportFile: "tests/support/e2e.js",
        fixturesFolder: "tests/fixtures",
        screenshotsFolder: "tests/artifacts/screenshots",
        videosFolder: "tests/artifacts/videos",
    },
});
