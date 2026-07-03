/**
 * Roman Homes & Loans — sign-up form backend.
 *
 * Setup (see README.md for full step-by-step):
 * 1. Create a Google Sheet, open Extensions > Apps Script, paste this file in as Code.gs.
 * 2. Run setupSheet() once from the Apps Script editor to add the header row.
 * 3. Deploy > New deployment > Web app. Execute as "Me", Access "Anyone".
 * 4. Copy the deployment URL into SCRIPT_URL in index.html.
 */

var SHEET_NAME = 'Signups';

function setupSheet() {
  var sheet = getSheet_();
  var headers = [
    'Timestamp', 'First Name', 'Last Name', 'Phone', 'Email',
    'Buyer or Realtor', 'Working With Realtor', 'Timeline', 'Referral Source'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    if (sheet.getLastRow() === 0) {
      setupSheet();
    }

    sheet.appendRow([
      new Date(),
      data.firstName || '',
      data.lastName || '',
      data.phone || '',
      data.email || '',
      data.role || '',
      data.workingWithRealtor || '',
      data.timeline || '',
      data.referral || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
