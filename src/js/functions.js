const path = require('path');
const fs = require('fs');
const { getCellValue, setCellValue } = require('./global');

function createBackupInDirectory(sourceFilePath) {
  const { getBackupFileName } = require('./global');
  const backupFileName = getBackupFileName(sourceFilePath);
  const backupPath = path.join(path.dirname(sourceFilePath), backupFileName);

  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, sourceFilePath);
  } else {
    fs.copyFileSync(sourceFilePath, backupPath);
  }

  return backupPath;
}

function setInstantPeasantGeneration(workbook, clan) {
  const {
    sheet,
    minTimeToCreatePeasant,
    maxTimeToCreatePeasant,
    getClanRows
  } = require('./mapping/clans');
  const modMinimum = 1;
  const modMaximum = 2;
  const worksheet = workbook.Sheets[sheet];
  const [row] = getClanRows(clan);

  setCellValue(worksheet, minTimeToCreatePeasant, row, modMinimum);
  setCellValue(worksheet, maxTimeToCreatePeasant, row, modMaximum);
}

function setHighCapacityPeasant(workbook, clan) {
  const {
    sheet,
    peasantMaxRiceCapacity,
    peasantMaxWaterCapacity,
    getClanRows
  } = require('./mapping/clans');
  const modMultiplier = 10;
  const worksheet = workbook.Sheets[sheet];
  const [row] = getClanRows(clan);

  const currentPeasantMaxRiceCapacity = getCellValue(worksheet, peasantMaxRiceCapacity, row);
  const currentPeasantMaxWaterCapacity = getCellValue(worksheet, peasantMaxWaterCapacity, row);

  setCellValue(worksheet, peasantMaxRiceCapacity, row, currentPeasantMaxRiceCapacity * modMultiplier);
  setCellValue(worksheet, peasantMaxWaterCapacity, row, currentPeasantMaxWaterCapacity * modMultiplier);
}

module.exports = {
  createBackupInDirectory,
  setInstantPeasantGeneration,
  setHighCapacityPeasant
};
