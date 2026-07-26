const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('excelApi', {
  pickFile: () => ipcRenderer.invoke('excel:pick-file'),
  getDefaultFilePath: () => ipcRenderer.invoke('excel:get-default-file-path'),
  applyTrainerSettings: (payload) => ipcRenderer.invoke('excel:apply-trainer-settings', payload)
});
