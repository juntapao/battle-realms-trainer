const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const XLSX = require('xlsx');

function createWindow() {
  const win = new BrowserWindow({
    width: 920,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, '..', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('excel:pick-file', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select an Excel file',
    filters: [
      { name: 'Excel Files', extensions: ['xlsx', 'xlsm', 'xls', 'csv'] }
    ],
    properties: ['openFile']
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { canceled: true };
  }

  return { canceled: false, filePath: result.filePaths[0] };
});

ipcMain.handle('excel:apply-trainer-settings', async (_event, payload) => {
  const { createBackupInDirectory, setInstantPeasantGeneration } = require('./functions');

  try {
    const { filePath, clan, instantPeasantGeneration } = payload || {};

    if (!filePath || !clan) {
      throw new Error('filePath and clan are required.');
    }

    createBackupInDirectory(filePath);

    const workbook = XLSX.readFile(filePath);

    const dataClansSheetName = 'Data_Clans';
    if (!workbook.SheetNames.includes(dataClansSheetName)) {
      throw new Error('Data_Clans sheet was not found in workbook.');
    }

    setInstantPeasantGeneration(workbook, clan);

    XLSX.writeFile(workbook, filePath);

    return {
      ok: true,
      clan,
      instantPeasantGeneration: Boolean(instantPeasantGeneration),
      sheetName: dataClansSheetName,
      outputPath: filePath,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
});
