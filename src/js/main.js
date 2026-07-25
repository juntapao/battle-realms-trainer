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

ipcMain.handle('excel:update-cell', async (_event, payload) => {
  try {
    const { filePath, sheetName, cellAddress, value, outputPath } = payload || {};

    if (!filePath || !cellAddress) {
      throw new Error('filePath and cellAddress are required.');
    }

    const workbook = XLSX.readFile(filePath);
    const targetSheetName = sheetName && workbook.SheetNames.includes(sheetName)
      ? sheetName
      : workbook.SheetNames[0];

    if (!targetSheetName) {
      throw new Error('Workbook does not contain any sheets.');
    }

    const worksheet = workbook.Sheets[targetSheetName];
    XLSX.utils.sheet_add_aoa(worksheet, [[value]], { origin: cellAddress });

    const destinationPath = outputPath && outputPath.trim() ? outputPath.trim() : filePath;
    XLSX.writeFile(workbook, destinationPath);

    return {
      ok: true,
      sheetName: targetSheetName,
      outputPath: destinationPath
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
});
