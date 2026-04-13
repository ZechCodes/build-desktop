const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('buildElectron', {
  getServerUrl: () => ipcRenderer.invoke('get-server-url'),
  setServerUrl: (url) => ipcRenderer.invoke('set-server-url', url),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  isElectron: true,
  platform: process.platform,
  onOpenSettings: (callback) => {
    ipcRenderer.on('open-settings', callback);
    return () => ipcRenderer.removeListener('open-settings', callback);
  },
});
