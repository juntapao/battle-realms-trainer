const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('excelApi', {
  pickFile: () => ipcRenderer.invoke('excel:pick-file'),
  updateCell: (payload) => ipcRenderer.invoke('excel:update-cell', payload)
});
