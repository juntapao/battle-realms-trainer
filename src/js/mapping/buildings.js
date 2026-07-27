const sheet = 'Data_Buildings';
const buildTime = 'AX';
const unitTrainingTime1 = 'Y';
const unitTrainingTime2 = 'AC';
const unitTrainingTime3 = 'AG';
const unitTrainingTime4 = 'AK';
const dockingTrainingTime = 'BL';
const riceCost = 'P';
const waterCost = 'Q';

const BUILDING_ROWS_BY_CLAN = {
  '0': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 86],
  '2': [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 87],
  '3': [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 98],
  '5': [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 112]
};

const BUILDING_WITH_DOCKING_ROWS_BY_CLAN = {
  '2': [28],
};

function getBuildingRows(clan) {
  return BUILDING_ROWS_BY_CLAN[clan] || [];
}

function getBuildingWithDockingRows(clan) {
  return BUILDING_WITH_DOCKING_ROWS_BY_CLAN[clan] || [];
}

module.exports = {
  sheet,
  buildTime,
  unitTrainingTime1,
  unitTrainingTime2,
  unitTrainingTime3,
  unitTrainingTime4,
  dockingTrainingTime,
  riceCost,
  waterCost,
  getBuildingRows,
  getBuildingWithDockingRows
};