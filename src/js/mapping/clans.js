const sheet = 'Data_Clans';
const minTimeToCreatePeasant = 'AB';
const maxTimeToCreatePeasant = 'AC';
const peasantMaxRiceCapacity = 'D';
const peasantMaxWaterCapacity = 'E';
const townSquareYinYangMultiplier = 'AN';

const CLAN_ROWS = Object.freeze({
  '0': [2],
  '2': [4],
  '3': [5],
  '5': [7]
});

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
  getClanRows
};
