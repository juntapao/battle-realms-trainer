const path = require('path');

function getBackupFileName(sourceFilePath) {
  const addName = 'backup';
  const parsed = path.parse(sourceFilePath);
  return `${parsed.name}.${addName}.${parsed.ext}`;
}

function getCellValue(worksheet, column, row) {
  const col = String(column || '').trim().toUpperCase();
  const rowNumber = Number(row);

  if (!/^[A-Z]+$/.test(col)) {
    throw new Error('Invalid column. Use letters like A, B, AB.');
  }

  if (!Number.isInteger(rowNumber) || rowNumber < 1) {
    throw new Error('Invalid row. Row must be a positive integer.');
  }

  const address = col + rowNumber;
  const cell = worksheet[address];
  return cell ? cell.v : null;
}

function setCellValue(worksheet, column, row, value) {
  const col = String(column || '').trim().toUpperCase();
  const rowNumber = Number(row);

  if (!/^[A-Z]+$/.test(col)) {
    throw new Error('Invalid column. Use letters like A, B, AB.');
  }

  if (!Number.isInteger(rowNumber) || rowNumber < 1) {
    throw new Error('Invalid row. Row must be a positive integer.');
  }

  const address = col + rowNumber;

  if (value === null || value === undefined) {
    delete worksheet[address];
    return address;
  }

  let type = 's';
  if (typeof value === 'number' && Number.isFinite(value)) type = 'n';
  else if (typeof value === 'boolean') type = 'b';

  worksheet[address] = { t: type, v: value };
  return address;
}


module.exports = {
  getBackupFileName,
  getCellValue,
  setCellValue
};
