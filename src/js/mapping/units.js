const sheet = 'Data_Units';
const riceTrainCost = 'J';
const waterTrainCost = 'K';
const yinYangDamageIncrementor = 'T';
const initialFatigue = 'Q';
const maxFatigue = 'R';
const fatigueRecovery = 'S';

const UNIT_ROWS_BY_CLAN = {
  '0': [2, 3, 4, 5, 6, 7, 8, 9, 10, 118, 119, 120, 121],
  '2': [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 131, 132],
  '3': [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 143, 144, 145, 146],
  '5': [107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 155, 156]
};

const HERO_UNIT_ROWS_BY_CLAN = {
  '0': [11, 14, 17, 31, 32, 36, 88, 127, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
  '2': [16, 28, 35, 40, 41, 90, 143, 144],
  '3': [12, 30, 33, 34, 38, 39, 90, 140, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
  '5': [13, 15, 29, 37, 88, 128]
};

const THIRD_TIER_UNIT_ROWS_BY_CLAN = {
  '0': [9],
  '2': [51],
  '3': [73],
  '5': [108]
};

function getUnitRows(clan) {
  return UNIT_ROWS_BY_CLAN[clan] || [];
}

function getThirdTierUnitRows(clan) {
  return THIRD_TIER_UNIT_ROWS_BY_CLAN[clan] || [];
}

function getHeroUnitRows(clan) {
  return HERO_UNIT_ROWS_BY_CLAN[clan] || [];
}

module.exports = {
  sheet,
  riceTrainCost,
  waterTrainCost,
  yinYangDamageIncrementor,
  initialFatigue,
  maxFatigue,
  fatigueRecovery,
  getUnitRows,
  getThirdTierUnitRows,
  getHeroUnitRows
};