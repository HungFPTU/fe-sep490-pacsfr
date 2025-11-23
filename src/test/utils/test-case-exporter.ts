/**
 * Utility to export test cases from TypeScript test files to Excel
 * Parses JSDoc comments and test case structure to generate Excel report
 */

import type { TestCase } from './excel-parser';

export interface ParsedTestCase {
  id: string;
  description: string;
  descriptionVi: string;
  procedure: string;
  expectedResults: string;
  expectedResultsVi: string;
  preConditions: string;
  preConditionsVi: string;
  functionName: string;
  category?: string;
}

export interface TestFileMetadata {
  feature: string;
  functionName: string;
  preCondition: string;
  numberOfTCs: number;
}

/**
 * Parse test case from JSDoc comment and test function
 */
export function parseTestCaseFromCode(
  testFileContent: string,
  testFunctionName: string
): ParsedTestCase | null {
  // Find the test function in the file
  const testFunctionPattern = testFunctionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const testFunctionRegex = new RegExp(
    `it\\(['"]${testFunctionPattern}[^'"]*['"]`,
    's'
  );
  const match = testFileContent.match(testFunctionRegex);

  if (!match) return null;

  // Find the JSDoc comment before this match (look backwards)
  const matchIndex = testFileContent.indexOf(match[0]);
  const beforeMatch = testFileContent.substring(0, matchIndex);

  // Find the last JSDoc comment before the test function
  const jsdocMatches = Array.from(beforeMatch.matchAll(/\*\*[\s\S]*?\*\//g));
  if (jsdocMatches.length === 0) return null;

  const jsdoc = jsdocMatches[jsdocMatches.length - 1][0];

  // Extract Test Case ID (supports formats like TC-CASE-001, TC-CASE-CODE-001, etc.)
  const idMatch = jsdoc.match(/Test Case ID:\s*(TC-[A-Z0-9-]+)/i);
  const id = idMatch ? idMatch[1] : '';

  // Extract Function
  const functionMatch = jsdoc.match(/Function:\s*([^\n*]+)/i);
  const functionName = functionMatch ? functionMatch[1].trim() : '';

  // Extract Description (EN)
  const descEnMatch = jsdoc.match(/Test Case Description \(EN\):\s*([^\n*]+)/i);
  const description = descEnMatch ? descEnMatch[1].trim() : '';

  // Extract Description (VI)
  const descViMatch = jsdoc.match(/Test Case Description \(VI\):\s*([^\n*]+)/i);
  const descriptionVi = descViMatch ? descViMatch[1].trim() : '';

  // Extract Pre-conditions (EN)
  const preCondEnMatch = jsdoc.match(/Pre-conditions \(EN\):\s*([^\n*]+)/i);
  const preConditions = preCondEnMatch ? preCondEnMatch[1].trim() : '';

  // Extract Pre-conditions (VI)
  const preCondViMatch = jsdoc.match(/Pre-conditions \(VI\):\s*([^\n*]+)/i);
  const preConditionsVi = preCondViMatch ? preCondViMatch[1].trim() : '';

  // Extract Test Case Procedure
  const procedureMatch = jsdoc.match(/Test Case Procedure:([\s\S]*?)(?=Expected Results|Pre-conditions|$)/i);
  let procedure = '';
  if (procedureMatch) {
    procedure = procedureMatch[1]
      .split('\n')
      .map(line => line.replace(/^\s*\*\s*/, '').trim())
      .filter(line => line.length > 0 && !line.match(/^\d+\./))
      .join(' ')
      .trim();
  }

  // Extract Expected Results (EN)
  const expectedEnMatch = jsdoc.match(/Expected Results \(EN\):\s*([^\n*]+)/i);
  const expectedResults = expectedEnMatch ? expectedEnMatch[1].trim() : '';

  // Extract Expected Results (VI)
  const expectedViMatch = jsdoc.match(/Expected Results \(VI\):\s*([^\n*]+)/i);
  const expectedResultsVi = expectedViMatch ? expectedViMatch[1].trim() : '';

  // Extract category from FUNCTION comment
  const categoryMatch = beforeMatch.match(/\/\/\s*FUNCTION[^:]*:\s*([^\n]+)/i);
  const category = categoryMatch ? categoryMatch[1].trim() : '';

  return {
    id,
    description,
    descriptionVi,
    procedure,
    expectedResults,
    expectedResultsVi,
    preConditions,
    preConditionsVi,
    functionName,
    category,
  };
}

/**
 * Parse test file metadata from header comment
 */
export function parseTestFileMetadata(testFileContent: string): TestFileMetadata {
  const headerMatch = testFileContent.match(/\/\*\*[\s\S]*?\*\//);
  if (!headerMatch) {
    return {
      feature: '',
      functionName: '',
      preCondition: '',
      numberOfTCs: 0,
    };
  }

  const header = headerMatch[0];

  // Extract Feature
  const featureMatch = header.match(/Feature:\s*([^\n*]+)/i);
  const feature = featureMatch ? featureMatch[1].trim() : '';

  // Extract Function
  const functionMatch = header.match(/Function:\s*([^\n*]+)/i);
  const functionName = functionMatch ? functionMatch[1].trim() : '';

  // Extract Pre-condition
  const preConditionMatch = header.match(/Pre-condition:\s*([^\n*]+)/i);
  const preCondition = preConditionMatch ? preConditionMatch[1].trim() : '';

  // Extract Number of TCs
  const tcCountMatch = header.match(/Number of TCs:\s*(\d+)/i);
  const numberOfTCs = tcCountMatch ? parseInt(tcCountMatch[1], 10) : 0;

  return {
    feature,
    functionName,
    preCondition,
    numberOfTCs,
  };
}

/**
 * Extract all test cases from test file
 */
export function extractTestCasesFromFile(testFileContent: string): ParsedTestCase[] {
  const testCases: ParsedTestCase[] = [];

  // Find all test case IDs and their positions
  // Match: it('TC-XXX-001: ...') or it("TC-XXX-001: ...") or it('TC-CASE-CODE-001: ...')
  // Supports formats: TC-CASE-001, TC-CASE-CODE-001, TC-AUTH-LOGIN-001, etc.
  const testIdRegex = /it\(['"](TC-[A-Z0-9-]+):[^'"]*['"]/g;
  const matches = Array.from(testFileContent.matchAll(testIdRegex));

  for (const match of matches) {
    const testId = match[1]; // Extract TC-XXX-001
    const fullMatch = match[0]; // Full it('TC-XXX-001: ...')
    const matchIndex = match.index || 0;

    // Find JSDoc comment before this test function
    const beforeMatch = testFileContent.substring(0, matchIndex);

    // Find all JSDoc comments before this position
    const jsdocMatches = Array.from(beforeMatch.matchAll(/\*\*[\s\S]*?\*\//g));

    if (jsdocMatches.length > 0) {
      // Get the last JSDoc comment (closest to the test function)
      const jsdoc = jsdocMatches[jsdocMatches.length - 1][0];

      // Verify this JSDoc contains the test case ID
      if (jsdoc.includes(testId)) {
        const testCase = parseTestCaseFromJSDoc(jsdoc);
        if (testCase && testCase.id === testId) {
          // Extract category from FUNCTION comment
          const categoryMatch = beforeMatch.match(/\/\/\s*FUNCTION[^:]*:\s*([^\n]+)/i);
          if (categoryMatch) {
            testCase.category = categoryMatch[1].trim();
          }
          testCases.push(testCase);
        }
      }
    }
  }

  return testCases;
}

/**
 * Parse test case directly from JSDoc comment
 */
function parseTestCaseFromJSDoc(jsdoc: string): ParsedTestCase | null {
  // Extract Test Case ID (supports formats like TC-CASE-001, TC-CASE-CODE-001, etc.)
  const idMatch = jsdoc.match(/Test Case ID:\s*(TC-[A-Z0-9-]+)/i);
  const id = idMatch ? idMatch[1] : '';
  if (!id) return null;

  // Extract Function
  const functionMatch = jsdoc.match(/Function:\s*([^\n*]+)/i);
  const functionName = functionMatch ? functionMatch[1].trim() : '';

  // Extract Description (EN)
  const descEnMatch = jsdoc.match(/Test Case Description \(EN\):\s*([^\n*]+)/i);
  const description = descEnMatch ? descEnMatch[1].trim() : '';

  // Extract Description (VI)
  const descViMatch = jsdoc.match(/Test Case Description \(VI\):\s*([^\n*]+)/i);
  const descriptionVi = descViMatch ? descViMatch[1].trim() : '';

  // Extract Pre-conditions (EN)
  const preCondEnMatch = jsdoc.match(/Pre-conditions \(EN\):\s*([^\n*]+)/i);
  const preConditions = preCondEnMatch ? preCondEnMatch[1].trim() : '';

  // Extract Pre-conditions (VI)
  const preCondViMatch = jsdoc.match(/Pre-conditions \(VI\):\s*([^\n*]+)/i);
  const preConditionsVi = preCondViMatch ? preCondViMatch[1].trim() : '';

  // Extract Test Case Procedure with numbered steps and line breaks
  const procedureMatch = jsdoc.match(/Test Case Procedure:([\s\S]*?)(?=Expected Results|Pre-conditions|$)/i);
  let procedure = '';
  if (procedureMatch) {
    const procedureLines = procedureMatch[1]
      .split('\n')
      .map(line => {
        // Remove JSDoc comment markers (*) and trim
        const cleaned = line.replace(/^\s*\*\s*/, '').trim();
        return cleaned;
      })
      .filter(line => {
        // Filter out empty lines and lines that are just whitespace
        return line.length > 0 && !line.match(/^\s*$/);
      });

    // Format with numbered steps and line breaks
    // Keep existing numbers if present, otherwise add sequential numbers
    let stepNumber = 1;
    procedure = procedureLines
      .map((line) => {
        // Check if line already starts with a number (e.g., "1. Step", "2. Step")
        const numberMatch = line.match(/^(\d+)\.\s*(.+)$/);
        if (numberMatch) {
          // Line already has number, keep it and update stepNumber
          stepNumber = parseInt(numberMatch[1], 10) + 1;
          return line; // Keep original format: "1. Step"
        }
        // Line doesn't have number, add sequential number
        const numberedLine = `${stepNumber}. ${line}`;
        stepNumber++;
        return numberedLine;
      })
      .join('\n'); // Use newline for Excel line breaks (Excel will interpret as Alt+Enter)
  }

  // Extract Expected Results (EN)
  const expectedEnMatch = jsdoc.match(/Expected Results \(EN\):\s*([^\n*]+)/i);
  const expectedResults = expectedEnMatch ? expectedEnMatch[1].trim() : '';

  // Extract Expected Results (VI)
  const expectedViMatch = jsdoc.match(/Expected Results \(VI\):\s*([^\n*]+)/i);
  const expectedResultsVi = expectedViMatch ? expectedViMatch[1].trim() : '';

  return {
    id,
    description,
    descriptionVi,
    procedure,
    expectedResults,
    expectedResultsVi,
    preConditions,
    preConditionsVi,
    functionName,
  };
}

