const ExcelJS = require('exceljs');
const path = require('node:path');

const workbook = new ExcelJS.Workbook();
const testCasesSheet = workbook.addWorksheet('Test Cases');
const testDataSheet = workbook.addWorksheet('Test Data');

const headerFill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: '1F4E78' },
};
const headerFont = { color: { argb: 'FFFFFF' }, bold: true };
const border = {
  top: { style: 'thin', color: { argb: 'D9E2F3' } },
  left: { style: 'thin', color: { argb: 'D9E2F3' } },
  bottom: { style: 'thin', color: { argb: 'D9E2F3' } },
  right: { style: 'thin', color: { argb: 'D9E2F3' } },
};

const testCases = [
  {
    id: 'TC-001',
    title: 'Place an order and verify order history',
    priority: 'High',
    type: 'Functional, end-to-end',
    preconditions: 'User account is active; product is available; test environment is reachable',
    steps: [
      'Open the application URL. The login page is displayed.',
      'Enter the registered email and password, then select Login. The product dashboard is displayed.',
      'Find ZARA COAT 3 and select Add To Cart. The product is added to the cart.',
      'Open the cart. ZARA COAT 3 is displayed in the cart.',
      'Select Checkout. The payment and order-review page is displayed.',
      'Enter the card number, expiry month 03, expiry date 02, CVV, and cardholder name. The values are accepted.',
      'Enter coupon rahulshettyacademy and select Apply Coupon. Coupon Applied is displayed.',
      'In the country field, enter ind, then select India from the suggestions. India is selected.',
      'Verify the displayed email. It matches dhaval.ghodasara@testmail.com.',
      'Select PLACE ORDER. The confirmation message Thankyou for the order. is displayed and an order ID is generated.',
      'Open the ORDERS page. The order history is displayed.',
      'Find the generated order ID and open its details. The displayed order ID matches the order ID generated at checkout.',
    ],
    passCriteria: 'All expected results are met and the order ID matches in the confirmation and order details.',
  },
  {
    id: 'TC-002',
    title: 'Reject invalid login',
    priority: 'High',
    type: 'Negative',
    preconditions: 'Login page is available',
    steps: [
      'Open the application URL.',
      'Enter an invalid email or password.',
      'Select Login.',
      'Verify that the user is not taken to the product dashboard and an appropriate login error is displayed.',
    ],
    passCriteria: 'The invalid login is rejected and the user remains unauthenticated.',
  },
  {
    id: 'TC-003',
    title: 'Validate missing payment information',
    priority: 'Medium',
    type: 'Negative',
    preconditions: 'User is logged in and has reached checkout with a product in the cart',
    steps: [
      'Leave one or more payment fields blank.',
      'Complete the remaining required checkout fields.',
      'Select PLACE ORDER.',
      'Verify that the order is not submitted and validation is shown for the missing field(s).',
    ],
    passCriteria: 'The order is blocked and the missing payment field(s) are clearly identified.',
  },
  {
    id: 'TC-004',
    title: 'Validate an invalid coupon',
    priority: 'Medium',
    type: 'Negative',
    preconditions: 'User is logged in and is on the checkout page',
    steps: [
      'Enter an invalid coupon code.',
      'Select Apply Coupon.',
      'Verify that the success message Coupon Applied is not displayed and invalid-coupon feedback is shown.',
      'Verify that checkout remains usable and no unintended discount is applied.',
    ],
    passCriteria: 'The invalid coupon is rejected without applying an unintended discount.',
  },
  {
    id: 'TC-005',
    title: 'Verify order history does not show an unrelated order',
    priority: 'Medium',
    type: 'Data integrity',
    preconditions: 'User is logged in and has access to the Orders page',
    steps: [
      'Open ORDERS.',
      'Search for an order ID belonging to a different user or an order that does not exist.',
      'Verify that no unrelated order details are opened or displayed.',
    ],
    passCriteria: 'Unrelated or nonexistent orders are not exposed to the current user.',
  },
];

const testCaseRows = testCases.map((testCase) => ({
  'Test Case ID': testCase.id,
  Title: testCase.title,
  Priority: testCase.priority,
  Type: testCase.type,
  Preconditions: testCase.preconditions,
  'Steps and Expected Results': testCase.steps.map((step, index) => `${index + 1}. ${step}`).join('\n'),
  'Pass Criteria': testCase.passCriteria,
}));

testCasesSheet.columns = [
  { header: 'Test Case ID', key: 'Test Case ID', width: 16 },
  { header: 'Title', key: 'Title', width: 42 },
  { header: 'Priority', key: 'Priority', width: 12 },
  { header: 'Type', key: 'Type', width: 24 },
  { header: 'Preconditions', key: 'Preconditions', width: 42 },
  { header: 'Steps and Expected Results', key: 'Steps and Expected Results', width: 85 },
  { header: 'Pass Criteria', key: 'Pass Criteria', width: 55 },
];
testCasesSheet.addRows(testCaseRows);

testDataSheet.columns = [
  { header: 'Field', key: 'Field', width: 24 },
  { header: 'Value', key: 'Value', width: 55 },
];
testDataSheet.addRows([
  { Field: 'Application', Value: 'https://rahulshettyacademy.com/client/' },
  { Field: 'User', Value: 'dhaval.ghodasara@testmail.com' },
  { Field: 'Product', Value: 'ZARA COAT 3' },
  { Field: 'Card number', Value: '1234 5678 5678 1234' },
  { Field: 'Expiry', Value: '03/02' },
  { Field: 'CVV', Value: '584' },
  { Field: 'Name on card', Value: 'Kriva' },
  { Field: 'Coupon', Value: 'rahulshettyacademy' },
  { Field: 'Country', Value: 'India' },
]);

for (const sheet of [testCasesSheet, testDataSheet]) {
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = border;
  });
  headerRow.height = 28;
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
  sheet.autoFilter = { from: 'A1', to: `${String.fromCharCode(64 + sheet.columnCount)}1` };
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'top', wrapText: true };
        cell.border = border;
      });
      row.height = sheet === testCasesSheet ? 150 : 24;
    }
  });
}

testCasesSheet.getColumn('Priority').eachCell((cell, rowNumber) => {
  if (rowNumber > 1) {
    cell.alignment = { vertical: 'top', horizontal: 'center', wrapText: true };
  }
});

testDataSheet.getRow(1).height = 28;

const outputPath = path.join(__dirname, '..', 'ClientApp_WithPO_manual_test_cases.xlsx');
workbook.xlsx.writeFile(outputPath).then(() => {
  console.log(`Created ${outputPath}`);
});
