/**
 * Utility to parse test cases from Excel file
 * Note: This requires xlsx package to be installed
 */

export interface TestCase {
  id: string;
  name: string;
  description: string;
  module: string;
  type: 'unit' | 'integration' | 'e2e';
  priority: 'low' | 'medium' | 'high' | 'critical';
  steps: string[];
  expectedResult: string;
  actualResult?: string;
  status?: 'pass' | 'fail' | 'pending' | 'skip';
  tags?: string[];
}

/**
 * Parse Excel file and extract test cases
 * Requires xlsx package: bun add -d xlsx @types/xlsx
 */
export async function parseTestCasesFromExcel(
  filePath: string
): Promise<TestCase[]> {
  try {
    // Try to import xlsx - use require for Bun compatibility
    let XLSX: any;
    try {
      // Try ESM import first
      XLSX = await import('xlsx');
      // Handle default export
      if (XLSX.default) {
        XLSX = XLSX.default;
      }
    } catch (importError) {
      // Fallback to require for Bun
      try {
        // @ts-ignore - Bun supports require
        XLSX = require('xlsx');
      } catch (requireError) {
        console.warn('⚠️  xlsx package not found. Install with: bun add -d xlsx @types/xlsx');
        console.error('Import error:', importError);
        console.error('Require error:', requireError);
        return [];
      }
    }

    if (!XLSX || !XLSX.readFile) {
      console.warn('⚠️  xlsx package not properly loaded');
      return [];
    }

    // Read Excel file
    const workbook = XLSX.readFile(filePath);

    if (!workbook || !workbook.SheetNames || workbook.SheetNames.length === 0) {
      console.warn('⚠️  Excel file has no sheets');
      return [];
    }

    // List all sheets
    console.log('📑 Available sheets:', workbook.SheetNames.join(', '));

    // Try each sheet to find ALL sheets with test data
    const allTestCases: TestCase[] = [];

    for (const currentSheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[currentSheetName];
      if (!sheet) continue;

      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
      console.log(`\n🔍 Checking sheet "${currentSheetName}" (${range.e.r + 1} rows)`);

      let sheetData: any[] = [];
      let headerRow = 0;

      // Try to find header row by scanning rows
      for (let row = 0; row < Math.min(20, range.e.r + 1); row++) {
        const testData = XLSX.utils.sheet_to_json(sheet, {
          range: row,
          defval: '',
          raw: false,
        });

        if (Array.isArray(testData) && testData.length > 0) {
          const firstRow = testData[0] as any;
          const keys = Object.keys(firstRow);

          // Check if this looks like a header row with test case columns
          const hasTestId = keys.some(k =>
            k.toLowerCase().includes('test') && k.toLowerCase().includes('id')
          );
          const hasTestName = keys.some(k =>
            k.toLowerCase().includes('test') && k.toLowerCase().includes('name')
          );
          const hasModule = keys.some(k =>
            k.toLowerCase().includes('module') || k.toLowerCase().includes('feature')
          );

          if (hasTestId || (hasTestName && hasModule)) {
            headerRow = row;
            const fullData = XLSX.utils.sheet_to_json(sheet, {
              range: headerRow,
              defval: '',
              raw: false,
            });

            if (Array.isArray(fullData) && fullData.length > 0) {
              sheetData = fullData;
              console.log(`✅ Found test data in sheet "${currentSheetName}" starting at row ${headerRow + 1}`);
              break;
            }
          }
        }
      }

      // Convert sheet data to test cases
      if (sheetData.length > 0) {
        const testCases = sheetData.map((row: any) => convertToTestCase(row, currentSheetName));
        const validTestCases = testCases.filter((tc) => tc.id && tc.name && tc.module);
        allTestCases.push(...validTestCases);
        console.log(`   📝 Extracted ${validTestCases.length} test cases from "${currentSheetName}"`);
      }
    }

    if (allTestCases.length === 0) {
      console.warn('⚠️  No test data found in any sheet');
      return [];
    }

    const data = allTestCases;

    if (!Array.isArray(data) || data.length === 0) {
      console.warn('⚠️  No data found in Excel sheet');
      return [];
    }

    // data is already test cases at this point
    const testCases = data;

    // Debug: Show first converted test case
    if (testCases.length > 0) {
      console.log('\n🔍 Sample converted test case:', JSON.stringify(testCases[0], null, 2));
    }

    return testCases;
  } catch (error) {
    console.error('❌ Error parsing Excel file:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      if (error.message.includes('Cannot find module') || error.message.includes('MODULE_NOT_FOUND')) {
        console.warn('💡 Install xlsx package: bun add -d xlsx @types/xlsx');
      }
    }
    return [];
  }
}

/**
 * Convert Excel row to TestCase
 * Handles various column name variations
 */
function convertToTestCase(row: any, sheetName?: string): TestCase {
  // Normalize column names (case-insensitive, handle spaces/underscores)
  const normalizeKey = (key: string) => key.toLowerCase().replace(/[\s_]/g, '');
  const getValue = (variations: string[]) => {
    for (const variation of variations) {
      const normalized = normalizeKey(variation);
      for (const key in row) {
        if (normalizeKey(key) === normalized) {
          const value = row[key];
          return value !== null && value !== undefined ? String(value).trim() : '';
        }
      }
    }
    return '';
  };

  const type = getValue(['Type', 'Test Type', 'Type of Test']) || 'unit';
  const priority = getValue(['Priority', 'Test Priority']) || 'medium';
  const status = getValue(['Status', 'Test Status', 'Result', 'Round 1', 'Round 2', 'Round 3']) || 'pending';

  // Extract module from sheet name if available (e.g., "Feature 1" -> "Feature 1")
  const module = getValue(['Module', 'Feature', 'Component', 'Area']) ||
    (sheetName && sheetName !== 'Test Cases' ? sheetName : '');

  // Get test case ID - try multiple variations
  const testId = getValue([
    'Test Case ID', 'Test ID', 'ID', 'TestCase ID', 'TC ID',
    'Test Case', 'Case ID'
  ]);

  // Get test name/description
  const testName = getValue([
    'Test Case Name', 'Test Name', 'Name', 'TestCase Name',
    'Test Case Description', 'Description', 'Test Description'
  ]);

  // Use Test Case ID as name if name is empty
  const finalName = testName || testId || '';

  return {
    id: testId || '',
    name: finalName,
    description: getValue(['Description', 'Test Case Description', 'Test Description', 'Desc']) || '',
    module: module || 'Unknown',
    type: (type.toLowerCase() as TestCase['type']) || 'unit',
    priority: (priority.toLowerCase() as TestCase['priority']) || 'medium',
    steps: parseSteps(getValue([
      'Test Case Procedure', 'Steps', 'Test Steps', 'Test Step',
      'Action', 'Procedure', 'Test Procedure'
    ]) || ''),
    expectedResult: getValue([
      'Expected Results', 'Expected Result', 'Expected',
      'Expected Outcome', 'Result'
    ]) || '',
    status: (status.toLowerCase() as TestCase['status']) || 'pending',
    tags: parseTags(getValue(['Tags', 'Tag', 'Category', 'Categories']) || ''),
  };
}

/**
 * Parse test steps from string
 */
function parseSteps(steps: string): string[] {
  if (!steps) return [];
  return steps
    .split(/[;\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Parse tags from string
 */
function parseTags(tags: string): string[] {
  if (!tags) return [];
  return tags
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/**
 * Generate test file content from test cases
 */
export function generateTestFileContent(
  testCases: TestCase[],
  moduleName: string
): string {
  const imports = `import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { createMockRestResponse, createMockPagedResponse } from '@/test/utils/test-helpers';
`;

  const testSuites = testCases
    .filter((tc) => tc.module === moduleName)
    .map((tc) => generateTestSuite(tc))
    .join('\n\n');

  return `${imports}\n\n${testSuites}`;
}

/**
 * Generate test suite for a test case
 */
function generateTestSuite(testCase: TestCase): string {
  const testName = testCase.name.replace(/[^a-zA-Z0-9]/g, '_');
  const description = testCase.description || testCase.name;

  // Build test steps comments
  const stepsComments = testCase.steps.length > 0
    ? testCase.steps.map((step, i) => `    // ${i + 1}. ${step}`).join('\n')
    : '    // TODO: Add test steps from Excel';

  // Build expected result
  const expectedResult = testCase.expectedResult || 'TODO - Define expected result';

  // Build pre-condition comment
  const preCondition = testCase.description
    ? `    // Pre-Condition: ${testCase.description}\n`
    : '';

  return `describe('${testCase.module} - ${testCase.name}', () => {
  it('${description}', async () => {
${preCondition}    // Test steps:
${stepsComments}
    
    // Expected: ${expectedResult}
    
    // TODO: Implement actual test logic
    // 1. Import necessary modules (API, Service, etc.)
    // 2. Setup mocks if needed
    // 3. Call the function with test data
    // 4. Assert the results
    
    expect(true).toBe(true); // Replace with actual test
  });
});`;
}

