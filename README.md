# battle-realms-trainer

Electron desktop app to modify Excel files (`.xlsx`, `.xlsm`, `.xls`, `.csv`).

## Features
- Pick an Excel file from a file dialog
- Select sheet (optional; defaults to the first sheet)
- Choose cell address (example: `B2`)
- Set a new value and save
- Save to a different output file or overwrite the original file

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variable for workbook path:
   - Copy `.env.example` to `.env`
   - Set `FILE_PATH` to your Battle Realms workbook path
3. Start the app:
   ```bash
   npm start
   ```

## How to use
1. Click **Browse** and choose an Excel file.
2. (Optional) Enter an output path. Leave blank to overwrite the selected file.
3. (Optional) Enter a sheet name. Leave blank to use the first sheet.
4. Enter the cell address and value.
5. Click **Update Cell**.

## Notes
- The app uses the `xlsx` package for workbook updates.
- Ensure the Excel file is closed while writing to avoid file lock errors on Windows.
