const sheet = 'Data_BattleGear';
const time = 'I';
const riceCost = 'B';
const waterCost = 'C';

const BATTLE_GEAR_ROWS_BY_CLAN = {
  '2': [51, 52, 53],
  '5': [95, 100],
};

function getBattleGearRows(clan) {
  return BATTLE_GEAR_ROWS_BY_CLAN[clan] || [];
}

module.exports = {
  sheet,
  time,
  riceCost,
  waterCost,
  getBattleGearRows
};