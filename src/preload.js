const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('BetterQQ', {
    getConfig: (dataPath) => ipcRenderer.invoke('BetterQQ.getConfig', dataPath),
    setConfig: (dataPath, config) => ipcRenderer.invoke('BetterQQ.setConfig', dataPath, config),
    getEnums: () => ipcRenderer.invoke('BetterQQ.getEnums'),
    getAllLang: () => ipcRenderer.invoke('BetterQQ.getAllLang'),
    sendMessage: (message) => ipcRenderer.invoke('BetterQQ.sendMessage', message),
    openURL: (url) => ipcRenderer.invoke('BetterQQ.openURL', url),
});
