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

function setTownSquareYinYangMultiplier(workbook, clan) {
  const {
    sheet,
    townSquareYinYangMultiplier,
    getClanRows
  } = require('./mapping/clans');
  const modMultiplier = 10;
  const worksheet = workbook.Sheets[sheet];
  const [row] = getClanRows(clan);

  const currentTownSquareYinYangMultiplier = getCellValue(worksheet, townSquareYinYangMultiplier, row);

  setCellValue(worksheet, townSquareYinYangMultiplier, row, currentTownSquareYinYangMultiplier * modMultiplier);
}

function setFastBuild(workbook, clan) {
  const {
    sheet,
    buildTime,
    getBuildingRows
  } = require('./mapping/buildings');
  const modDivisor = 10;
  const worksheet = workbook.Sheets[sheet];
  const rows = getBuildingRows(clan);

  for (const row of rows) {
    const currentBuildTime = getCellValue(worksheet, buildTime, row);
    setCellValue(worksheet, buildTime, row, currentBuildTime / modDivisor);
  }
}

function setCheapTraining(workbook, clan) {
  const {
    sheet,
    riceTrainCost,
    waterTrainCost,
    getUnitRows,
    getHeroUnitRows,
  } = require('./mapping/units');
  const {
    sheet: battleGearSheet,
    riceCost,
    waterCost,
    getBattleGearRows
  } = require('./mapping/battlegear');
  const modDivisor = 10;
  const worksheet = workbook.Sheets[sheet];
  const rows = getUnitRows(clan);
  const setTrainCost = (worksheet, riceTrainCost, waterTrainCost, row, modDivisor) => {
    const currentRiceTrainCost = getCellValue(worksheet, riceTrainCost, row);
    const currentWaterTrainCost = getCellValue(worksheet, waterTrainCost, row);
    setCellValue(worksheet, riceTrainCost, row, Math.round(currentRiceTrainCost / modDivisor));
    setCellValue(worksheet, waterTrainCost, row, Math.round(currentWaterTrainCost / modDivisor));
  }

  for (const row of rows) {
    setTrainCost(worksheet, riceTrainCost, waterTrainCost, row, modDivisor);
  }

  const heroRows = getHeroUnitRows(clan);
  for (const row of heroRows) {
    setTrainCost(worksheet, riceTrainCost, waterTrainCost, row, modDivisor);
  }

  const battleGearWorksheet = workbook.Sheets[battleGearSheet];
  const battleGearRows = getBattleGearRows(clan);
  for (const row of battleGearRows) {
    const currentRiceCost = getCellValue(battleGearWorksheet, riceCost, row);
    const currentWaterCost = getCellValue(battleGearWorksheet, waterCost, row);
    setCellValue(battleGearWorksheet, riceCost, row, Math.round(currentRiceCost / modDivisor));
    setCellValue(battleGearWorksheet, waterCost, row, Math.round(currentWaterCost / modDivisor));
  }
}

function setFastTraining(workbook, clan) {
  const {
    sheet,
    unitTrainingTime1,
    unitTrainingTime2,
    unitTrainingTime3,
    unitTrainingTime4,
    dockingTrainingTime,
    getBuildingRows,
    getBuildingWithDockingRows
  } = require('./mapping/buildings');
  const {
    sheet: battleGearSheet,
    time: battleGearTrainingTime,
    getBattleGearRows
  } = require('./mapping/battlegear');
  const modValue = 1;
  const worksheet = workbook.Sheets[sheet];

  const rows = getBuildingRows(clan);
  for (const row of rows) {
    setCellValue(worksheet, unitTrainingTime1, row, modValue);
    setCellValue(worksheet, unitTrainingTime2, row, modValue);
    setCellValue(worksheet, unitTrainingTime3, row, modValue);
    setCellValue(worksheet, unitTrainingTime4, row, modValue);
  }

  const dockingRows = getBuildingWithDockingRows(clan);
  for (const row of dockingRows) {
    setCellValue(worksheet, dockingTrainingTime, row, modValue);
  }

  const battleGearWorksheet = workbook.Sheets[battleGearSheet];
  const battleGearRows = getBattleGearRows(clan);
  for (const row of battleGearRows) {
    setCellValue(battleGearWorksheet, battleGearTrainingTime, row, modValue);
  }
}

function setThirdTierYinYangDamageMultiplier(workbook, clan) {
  const {
    sheet,
    yinYangDamageIncrementor,
    getThirdTierUnitRows
  } = require('./mapping/units');
  const modMultiplier = 10;
  const worksheet = workbook.Sheets[sheet];
  const rows = getThirdTierUnitRows(clan);

  for (const row of rows) {
    const currentYinYangDamageIncrementor = getCellValue(worksheet, yinYangDamageIncrementor, row);
    setCellValue(worksheet, yinYangDamageIncrementor, row, (currentYinYangDamageIncrementor * modMultiplier) || 0.1);
  }
}

function setHeroYinYangDamageMultiplier(workbook, clan) {
  const {
    sheet,
    yinYangDamageIncrementor,
    getHeroUnitRows
  } = require('./mapping/units');
  const modMultiplier = 10;
  const worksheet = workbook.Sheets[sheet];
  const rows = getHeroUnitRows(clan);

  for (const row of rows) {
    const currentYinYangDamageIncrementor = getCellValue(worksheet, yinYangDamageIncrementor, row);
    setCellValue(worksheet, yinYangDamageIncrementor, row, (currentYinYangDamageIncrementor * modMultiplier) || 0.1);
  }
}

function setDoubleInitialResources(workbook, clan) {
  const {
    sheet,
    initialRiceCapacity,
    initialRiceDefault,
    riceCapacityPerHut,
    initialWaterCapacity,
    initialWaterDefault,
    waterCapacityPerHut,
    getClanRows
  } = require('./mapping/clans');
  const modMultiplier = 2;
  const worksheet = workbook.Sheets[sheet];
  const [row] = getClanRows(clan);

  const currentInitialRiceCapacity = getCellValue(worksheet, initialRiceCapacity, row);
  const currentRiceCapacityPerHut = getCellValue(worksheet, riceCapacityPerHut, row);
  const currentInitialWaterCapacity = getCellValue(worksheet, initialWaterCapacity, row);
  const currentWaterCapacityPerHut = getCellValue(worksheet, waterCapacityPerHut, row);

  setCellValue(worksheet, initialRiceCapacity, row, currentInitialRiceCapacity * modMultiplier);
  setCellValue(worksheet, initialRiceDefault, row, currentInitialRiceCapacity * modMultiplier);
  setCellValue(worksheet, riceCapacityPerHut, row, currentRiceCapacityPerHut * modMultiplier);
  setCellValue(worksheet, initialWaterCapacity, row, currentInitialWaterCapacity * modMultiplier);
  setCellValue(worksheet, initialWaterDefault, row, currentInitialWaterCapacity * modMultiplier);
  setCellValue(worksheet, waterCapacityPerHut, row, currentWaterCapacityPerHut * modMultiplier);
}

module.exports = {
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
};
