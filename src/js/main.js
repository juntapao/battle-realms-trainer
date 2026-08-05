const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const XLSX = require('xlsx');
require('dotenv').config({ quiet: true });

const EXCEL_PATH_ENV_KEY = 'FILE_PATH';

function getExcelPathFromEnv() {
  const value = process.env[EXCEL_PATH_ENV_KEY];
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  return trimmed;
}

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

ipcMain.handle('excel:get-default-file-path', async () => {
  return {
    filePath: getExcelPathFromEnv(),
    source: 'env',
    envKeys: [EXCEL_PATH_ENV_KEY]
  };
});

ipcMain.handle('excel:apply-trainer-settings', async (_event, payload) => {
  const {
    createBackupInDirectory,
    setInstantPeasantGeneration,
    setHighCapacityPeasant,
    setTownSquareYinYangMultiplier,
    setFastBuild,
    setCheapTraining,
    setFastTraining,
    setThirdTierYinYangDamageMultiplier,
    setHeroYinYangDamageMultiplier,
    setDoubleInitialResources,
    setCheapBuildings,
    setHighStaminaUnits,
    setHighHealthUnits,
    setHighHealthRecoveryRate,
  } = require('./functions');

  try {
    const {
      clan,
      instantPeasantGeneration,
      highCapacityPeasant,
      townSquareYinYangMultiplier,
      fastBuild,
      cheapTraining,
      fastTraining,
      thirdTierYinYangDamageMultiplier,
      heroYinYangDamageMultiplier,
      doubleInitialResources,
      cheapBuildings,
      highStaminaUnits,
      highHealthUnits,
      highHealthRecoveryRate,
    } = payload || {};
    const filePath = getExcelPathFromEnv();

    if (!filePath || !clan) {
      throw new Error(`clan is required and file path must be provided via env (${EXCEL_PATH_ENV_KEY}).`);
    }

    createBackupInDirectory(filePath);

    const workbook = XLSX.readFile(filePath);

    if (instantPeasantGeneration) {
      setInstantPeasantGeneration(workbook, clan);
    }

    if (highCapacityPeasant) {
      setHighCapacityPeasant(workbook, clan);
    }

    if (townSquareYinYangMultiplier) {
      setTownSquareYinYangMultiplier(workbook, clan);
    }

    if (fastBuild) {
      setFastBuild(workbook, clan);
    }

    if (cheapTraining) {
      setCheapTraining(workbook, clan);
    }

    if (fastTraining) {
      setFastTraining(workbook, clan);
    }

    if (thirdTierYinYangDamageMultiplier) {
      setThirdTierYinYangDamageMultiplier(workbook, clan);
    }

    if (heroYinYangDamageMultiplier) {
      setHeroYinYangDamageMultiplier(workbook, clan);
    }

    if (doubleInitialResources) {
      setDoubleInitialResources(workbook, clan);
    }

    if (cheapBuildings) {
      setCheapBuildings(workbook, clan);
    }

    if (highStaminaUnits) {
      setHighStaminaUnits(workbook, clan);
    }

    if (highHealthUnits) {
      setHighHealthUnits(workbook, clan);
    }

    if (highHealthRecoveryRate) {
      setHighHealthRecoveryRate(workbook, clan);
    }

    XLSX.writeFile(workbook, filePath);

    return {
      ok: true,
      clan,
      instantPeasantGeneration: Boolean(instantPeasantGeneration),
      highCapacityPeasant: Boolean(highCapacityPeasant),
      townSquareYinYangMultiplier: Boolean(townSquareYinYangMultiplier),
      fastBuild: Boolean(fastBuild),
      cheapTraining: Boolean(cheapTraining),
      fastTraining: Boolean(fastTraining),
      thirdTierYinYangDamageMultiplier: Boolean(thirdTierYinYangDamageMultiplier),
      heroYinYangDamageMultiplier: Boolean(heroYinYangDamageMultiplier),
      doubleInitialResources: Boolean(doubleInitialResources),
      cheapBuildings: Boolean(cheapBuildings),
      highStaminaUnits: Boolean(highStaminaUnits),
      highHealthUnits: Boolean(highHealthUnits),
      highHealthRecoveryRate: Boolean(highHealthRecoveryRate),
      outputPath: filePath,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
});
