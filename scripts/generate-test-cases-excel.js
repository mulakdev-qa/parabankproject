const XLSX = require('xlsx');
const path = require('path');

const baseUrl = 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC';

const testCases = [
  {
    testCaseId: 'TC_SIGN_001',
    feature: 'Sign In Page',
    scenario: 'Register new user',
    automationFile: 'features/sign-in-page.feature',
    testDataFile: 'test-data/register-kavya.json',
    tag: '@sign-in',
    steps: [
      { stepNo: 1, action: 'Navigate to ParaBank sign-in page', testData: baseUrl, expectedResult: 'Sign-in page is displayed' },
      { stepNo: 2, action: 'Click Register link', testData: 'N/A', expectedResult: 'Registration page is displayed' },
      { stepNo: 3, action: 'Enter First Name', testData: 'Kavya', expectedResult: 'First Name field is populated' },
      { stepNo: 4, action: 'Enter Last Name', testData: 'Patil', expectedResult: 'Last Name field is populated' },
      { stepNo: 5, action: 'Enter Address', testData: 'Viman nagar', expectedResult: 'Address field is populated' },
      { stepNo: 6, action: 'Enter City', testData: 'Pune', expectedResult: 'City field is populated' },
      { stepNo: 7, action: 'Enter State', testData: 'Maharashtra', expectedResult: 'State field is populated' },
      { stepNo: 8, action: 'Enter Zip Code', testData: '11110', expectedResult: 'Zip Code field is populated' },
      { stepNo: 9, action: 'Enter Phone Number', testData: '776567898', expectedResult: 'Phone Number field is populated' },
      { stepNo: 10, action: 'Enter SSN', testData: '212', expectedResult: 'SSN field is populated' },
      { stepNo: 11, action: 'Enter Username', testData: 'Kavya', expectedResult: 'Username field is populated' },
      { stepNo: 12, action: 'Enter Password', testData: 'Mulak@1996', expectedResult: 'Password field is populated' },
      { stepNo: 13, action: 'Enter Confirm Password', testData: 'Mulak@1996', expectedResult: 'Confirm Password field is populated' },
      { stepNo: 14, action: 'Click Register button', testData: 'N/A', expectedResult: 'Account successfully created' },
      { stepNo: 15, action: 'Capture screenshot', testData: 'screenshots/successful-registration.png', expectedResult: 'Registration success screenshot saved' },
    ],
  },
  {
    testCaseId: 'TC_LOGIN_001',
    feature: 'Login',
    scenario: 'Login with valid credentials',
    automationFile: 'features/login.feature',
    testDataFile: 'test-data/login-kavya.json',
    tag: '@login',
    steps: [
      { stepNo: 1, action: 'Navigate to ParaBank sign-in page', testData: baseUrl, expectedResult: 'Sign-in page is displayed' },
      { stepNo: 2, action: 'Enter Username', testData: 'Kavya', expectedResult: 'Username field is populated' },
      { stepNo: 3, action: 'Enter Password', testData: 'Mulak@1996', expectedResult: 'Password field is populated' },
      { stepNo: 4, action: 'Click Log In button', testData: 'N/A', expectedResult: 'User is logged in successfully' },
      { stepNo: 5, action: 'Verify Accounts Overview page', testData: 'N/A', expectedResult: 'Accounts Overview page is displayed' },
      { stepNo: 6, action: 'Capture screenshot', testData: 'screenshots/successful-login.png', expectedResult: 'Login success screenshot saved' },
    ],
  },
  {
    testCaseId: 'TC_BAL_001',
    feature: 'Account Balance',
    scenario: 'Verify account balance after login',
    automationFile: 'features/account-balance.feature',
    testDataFile: 'test-data/login-kavya.json',
    tag: '@balance',
    steps: [
      { stepNo: 1, action: 'Navigate to ParaBank sign-in page', testData: baseUrl, expectedResult: 'Sign-in page is displayed' },
      { stepNo: 2, action: 'Enter Username', testData: 'Kavya', expectedResult: 'Username field is populated' },
      { stepNo: 3, action: 'Enter Password', testData: 'Mulak@1996', expectedResult: 'Password field is populated' },
      { stepNo: 4, action: 'Click Log In button', testData: 'N/A', expectedResult: 'User is logged in successfully' },
      { stepNo: 5, action: 'Verify Accounts Overview heading', testData: 'N/A', expectedResult: 'Accounts Overview page is displayed' },
      { stepNo: 6, action: 'Print account number and balance', testData: 'Account number and $ amount', expectedResult: 'Balance details printed (e.g. 14232 / $5150.50)' },
      { stepNo: 7, action: 'Verify balance format', testData: 'N/A', expectedResult: 'Balance displayed in $X.XX format' },
      { stepNo: 8, action: 'Highlight balance table area', testData: 'N/A', expectedResult: 'Balance area highlighted on screen' },
      { stepNo: 9, action: 'Capture screenshot', testData: 'screenshots/account-balance-highlighted.png', expectedResult: 'Highlighted balance screenshot saved' },
    ],
  },
];

const testCaseRows = [
  [
    'Test Case ID',
    'Feature',
    'Scenario',
    'Tag',
    'Automation File',
    'Test Data File',
    'Step No',
    'Action',
    'Test Data',
    'Expected Result',
  ],
];

for (const testCase of testCases) {
  for (const step of testCase.steps) {
    testCaseRows.push([
      testCase.testCaseId,
      testCase.feature,
      testCase.scenario,
      testCase.tag,
      testCase.automationFile,
      testCase.testDataFile,
      step.stepNo,
      step.action,
      step.testData,
      step.expectedResult,
    ]);
  }
}

const summaryRows = [
  ['Test Case ID', 'Feature', 'Scenario', 'Total Steps', 'Run Command'],
  ['TC_SIGN_001', 'Sign In Page', 'Register new user', 15, 'npm run test:sign-in-page'],
  ['TC_LOGIN_001', 'Login', 'Login with valid credentials', 6, 'npm run test:login'],
  ['TC_BAL_001', 'Account Balance', 'Verify account balance after login', 9, 'npm run test:balance'],
];

const testDataRows = [
  ['Test Case ID', 'Field', 'Value'],
  ['TC_SIGN_001', 'First Name', 'Kavya'],
  ['TC_SIGN_001', 'Last Name', 'Patil'],
  ['TC_SIGN_001', 'Address', 'Viman nagar'],
  ['TC_SIGN_001', 'City', 'Pune'],
  ['TC_SIGN_001', 'State', 'Maharashtra'],
  ['TC_SIGN_001', 'Zip Code', '11110'],
  ['TC_SIGN_001', 'Phone Number', '776567898'],
  ['TC_SIGN_001', 'SSN', '212'],
  ['TC_SIGN_001', 'Username', 'Kavya'],
  ['TC_SIGN_001', 'Password', 'Mulak@1996'],
  ['TC_SIGN_001', 'Confirm Password', 'Mulak@1996'],
  ['TC_LOGIN_001', 'Username', 'Kavya'],
  ['TC_LOGIN_001', 'Password', 'Mulak@1996'],
  ['TC_BAL_001', 'Username', 'Kavya'],
  ['TC_BAL_001', 'Password', 'Mulak@1996'],
];

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(summaryRows), 'Summary');
XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(testCaseRows), 'Test Cases');
XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(testDataRows), 'Test Data');

const outputPath = path.join(__dirname, '../test-data/ParaBank_Test_Cases.xlsx');
XLSX.writeFile(workbook, outputPath);

console.log(`Excel file created: ${outputPath}`);
