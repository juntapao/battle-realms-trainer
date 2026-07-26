const form = document.getElementById('update-form');
const pickFileButton = document.getElementById('pick-file-btn');
const filePathInput = document.getElementById('file-path');
const statusEl = document.getElementById('status');

function setStatus(message, tone = 'info') {
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
}

window.addEventListener('DOMContentLoaded', async () => {
  const result = await window.excelApi.getDefaultFilePath();
  const defaultFilePath = typeof result?.filePath === 'string' ? result.filePath.trim() : '';

  if (defaultFilePath) {
    if (filePathInput) {
      filePathInput.value = defaultFilePath;
    }
    setStatus('Excel file path loaded from environment variable.', 'success');
    return;
  }

  setStatus('No default Excel file path found in environment variables.', 'info');
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    filePath: String(formData.get('filePath') || '').trim(),
    clan: String(formData.get('clan') || '').trim(),
    instantPeasantGeneration: formData.get('instantPeasantGeneration') === 'on'
  };

  if (!payload.clan) {
    setStatus('Please select a clan.', 'error');
    return;
  }

  setStatus('Applying trainer settings...', 'info');

  const result = await window.excelApi.applyTrainerSettings(payload);

  if (result.ok) {
    const modeText = result.instantPeasantGeneration ? 'ON' : 'OFF';
    setStatus(`Applied ${result.clan} settings (Instant Peasant Generation: ${modeText}) and saved to ${result.outputPath}. Backup: ${result.backupPath}`, 'success');
    return;
  }

  setStatus(result.error || 'Failed to apply trainer settings.', 'error');
});
