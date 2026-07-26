const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('excelApi', {
  pickFile: () => ipcRenderer.invoke('excel:pick-file'),
  applyTrainerSettings: (payload) => ipcRenderer.invoke('excel:apply-trainer-settings', payload)
});
