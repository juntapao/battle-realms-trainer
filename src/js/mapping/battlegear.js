const sheet = 'Data_BattleGear';
const time = 'I';

const BATTLE_GEAR_ROWS_BY_CLAN = {
  '2': [51, 52, 53],
};

function getBattleGearRows(clan) {
  return BATTLE_GEAR_ROWS_BY_CLAN[clan] || [];
}

module.exports = {
  sheet,
  time,
  getBattleGearRows
};