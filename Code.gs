/**
 * Roman Homes & Loans — sign-up form backend.
 *
 * Paste this into Extensions > Apps Script from within this spreadsheet:
 * https://docs.google.com/spreadsheets/d/1dKB-Eu9xi1Vo-0-Djo7csRJSZ4L4liCGn1YApyJSwe0/edit
 *
 * Then Deploy > New deployment > Web app (Execute as "Me", Access "Anyone"),
 * and paste the resulting /exec URL into SCRIPT_URL in index.html.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([
    new Date(),
    e.parameter.firstName,
    e.parameter.lastName,
    e.parameter.phone,
    e.parameter.email,
    e.parameter.role,
    e.parameter.workingWithRealtor,
    e.parameter.timeline,
    e.parameter.referral
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
