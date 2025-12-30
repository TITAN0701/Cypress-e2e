const vscode = require("vscode");

function activate(context) {
    const commandId = "cypress-context-menu.openCypress";
    const disposable = vscode.commands.registerCommand(commandId, async () => {
        try {
            await vscode.commands.executeCommand(
                "workbench.action.tasks.runTask",
                "Open Cypress"
            );
        } catch (error) {
            vscode.window.showErrorMessage(
                'Failed to run task "Open Cypress". Check .vscode/tasks.json.'
            );
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
