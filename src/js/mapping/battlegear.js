const sheet = 'Data_BattleGear';
const time = 'I';
const riceCost = 'B';
const waterCost = 'C';

const BATTLE_GEAR_ROWS_BY_CLAN = {
  '0': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  '2': [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 55, 56, 57],
  '3': [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 88, 89],
  '5': [92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102],
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