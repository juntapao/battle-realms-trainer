const sheet = 'Data_Clans';
const minTimeToCreatePeasant = 'AB';
const maxTimeToCreatePeasant = 'AC';
const peasantMaxRiceCapacity = 'D';
const peasantMaxWaterCapacity = 'E';
const townSquareYinYangMultiplier = 'AN';
const initialRiceCapacity = 'I';
const initialRiceDefault = 'J';
const riceCapacityPerHut = 'K';
const initialWaterCapacity = 'P';
const initialWaterDefault = 'Q';
const waterCapacityPerHut = 'R';

const CLAN_ROWS = {
  '0': [2],
  '2': [4],
  '3': [5],
  '5': [7]
};

function getClanRows(clan) {
  return CLAN_ROWS[String(clan)] || [];
}

module.exports = {
  sheet,
  minTimeToCreatePeasant,
  maxTimeToCreatePeasant,
  peasantMaxRiceCapacity,
  peasantMaxWaterCapacity,
  townSquareYinYangMultiplier,
  initialRiceCapacity,
  initialRiceDefault,
  riceCapacityPerHut,
  initialWaterCapacity,
  initialWaterDefault,
  waterCapacityPerHut,
  getClanRows,
};
