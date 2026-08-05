const form = document.getElementById('update-form');
const pickFileButton = document.getElementById('pick-file-btn');
const filePathInput = document.getElementById('file-path');
const statusEl = document.getElementById('status');
const selectALlCheckbox = document.getElementById('select-all');
const highHealthUnitsCheckbox = document.getElementById('high-health-units');

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

selectALlCheckbox.addEventListener('change', () => {
  const isChecked = selectALlCheckbox.checked;
  const checkboxes = form.querySelectorAll('input[type="checkbox"]:not(#select-all)');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    filePath: String(formData.get('filePath') || '').trim(),
    clan: String(formData.get('clan') || '').trim(),
    instantPeasantGeneration: formData.get('instantPeasantGeneration') === 'on',
    highCapacityPeasant: formData.get('highCapacityPeasant') === 'on',
    townSquareYinYangMultiplier: formData.get('townSquareYinYangMultiplier') === 'on',
    fastBuild: formData.get('fastBuild') === 'on',
    cheapTraining: formData.get('cheapTraining') === 'on',
    fastTraining: formData.get('fastTraining') === 'on',
    thirdTierYinYangDamageMultiplier: formData.get('thirdTierYinYangDamageMultiplier') === 'on',
    heroYinYangDamageMultiplier: formData.get('heroYinYangDamageMultiplier') === 'on',
    doubleInitialResources: formData.get('doubleInitialResources') === 'on',
    cheapBuildings: formData.get('cheapBuildings') === 'on',
    highStaminaUnits: formData.get('highStaminaUnits') === 'on',
    highHealthUnits: formData.get('highHealthUnits') === 'on',
    highHealthRecoveryRate: formData.get('highHealthRecoveryRate') === 'on',
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
