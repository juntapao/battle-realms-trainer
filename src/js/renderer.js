const form = document.getElementById('update-form');
const pickFileButton = document.getElementById('pick-file-btn');
const filePathInput = document.getElementById('file-path');
const outputPathInput = document.getElementById('output-path');
const statusEl = document.getElementById('status');

function setStatus(message, tone = 'info') {
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
}

pickFileButton.addEventListener('click', async () => {
  const result = await window.excelApi.pickFile();

  if (!result.canceled && result.filePath) {
    filePathInput.value = result.filePath;
    if (!outputPathInput.value) {
      outputPathInput.value = result.filePath;
    }
    setStatus('Excel file selected. Fill the other fields and click Update Cell.', 'success');
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    filePath: String(formData.get('filePath') || '').trim(),
    outputPath: String(formData.get('outputPath') || '').trim(),
    sheetName: String(formData.get('sheetName') || '').trim(),
    cellAddress: String(formData.get('cellAddress') || '').trim().toUpperCase(),
    value: String(formData.get('value') || '')
  };

  if (!payload.filePath || !payload.cellAddress) {
    setStatus('File path and cell address are required.', 'error');
    return;
  }

  setStatus('Updating workbook...', 'info');

  const result = await window.excelApi.updateCell(payload);

  if (result.ok) {
    setStatus(`Updated ${result.sheetName} and saved to ${result.outputPath}`, 'success');
    return;
  }

  setStatus(result.error || 'Failed to update workbook.', 'error');
});
