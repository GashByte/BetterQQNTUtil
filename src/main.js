const { BrowserWindow, ipcMain, shell} = require("electron");
const fs = require('fs');
const path = require('path');

function onLoad(_) {
    ipcMain.handle('BetterQQ.getConfig', (_, dataPath) => {
        let configPath = path.join(dataPath, 'config.json');
        if (!fs.existsSync(configPath)) {
            if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });

            fs.writeFileSync(configPath, JSON.stringify(getDefaultConfigData()));
        }

        return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    });

    ipcMain.handle('BetterQQ.setConfig', (_, dataPath, config) => {
        fs.writeFileSync(path.join(dataPath, 'config.json'), JSON.stringify(config));
    });

    ipcMain.handle('BetterQQ.getEnums', () => {
        let enumsPath = `${path.dirname(require.resolve('./main.js'))}\\defaultConfig\\enums.json`;
        if (!fs.existsSync(enumsPath)) return {};
        return JSON.parse(fs.readFileSync(enumsPath, 'utf-8'));
    });

    ipcMain.handle('BetterQQ.getAllLang', () => {
        let enumsPath = `${path.dirname(require.resolve('./main.js'))}\\translateConfig\\data.json`;
        if (!fs.existsSync(enumsPath)) return {};
        return JSON.parse(fs.readFileSync(enumsPath, 'utf-8'));
    });

    ipcMain.handle('BetterQQ.sendMessage', (_, message) => {
    });

    ipcMain.handle('BetterQQ.openURL', (_, url) => {
        shell.openExternal(url);
    });
}

function getDefaultConfigData() {
    let configDir = `${path.dirname(require.resolve('./main.js'))}\\defaultConfig`;
    let configPath = `${configDir}\\config.json`;
    if (!fs.existsSync(configDir) || !fs.existsSync(configPath)) {
        return {};
    }

    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

module.exports = {
    onLoad,
}