/**
 * Export test cases from TypeScript test files to Excel
 * Format matches the Excel template structure
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { readdirSync } from 'fs';
import {
    extractTestCasesFromFile,
    parseTestFileMetadata,
    type ParsedTestCase,
} from '../utils/test-case-exporter';

// Try to import xlsx
let XLSX: any;
try {
    XLSX = await import('xlsx');
    if (XLSX.default) {
        XLSX = XLSX.default;
    }
} catch {
    try {
        // @ts-ignore - Bun supports require
        XLSX = require('xlsx');
    } catch {
        console.error('❌ xlsx package not found. Install with: bun add -d xlsx @types/xlsx');
        process.exit(1);
    }
}

interface ExcelTestCaseRow {
    'Test Case ID': string;
    'Test Case Description': string;
    'Test Case Procedure': string;
    'Expected Results': string;
    'Pre-conditions': string;
    'Round 1': string;
    'Test date': string;
    'Tester': string;
    'Round 2': string;
    'Test date.1': string;
    'Tester.1': string;
    'Round 3': string;
    'Test date.2': string;
    'Tester.2': string;
    'Note': string;
}

/**
 * Create Excel workbook with test cases
 */
function createTestReportExcel(
    feature: string,
    functionName: string,
    preCondition: string,
    numberOfTCs: number,
    testCases: ParsedTestCase[]
): any {
    const workbook = (XLSX as any).utils.book_new();

    // Prepare worksheet data
    const wsData: any[][] = [];

    // Row 1: Empty
    wsData.push([]);

    // Row 2-4: Summary Section
    wsData.push(['Feature', feature]);
    wsData.push(['Test requirement', '<Brief description about requirements which are tested in this sheet>']);
    wsData.push(['Number of TCs', numberOfTCs]);

    // Row 5: Testing Round Headers
    wsData.push(['Testing Round', 'Passed', 'Failed', 'Pending', 'N/A']);

    // Row 6-8: Testing Rounds (default values)
    wsData.push(['Round 1', 0, 0, 0, 0]);
    wsData.push(['Round 2', 0, 0, 0, 0]);
    wsData.push(['Round 3', 0, 0, 0, 0]);

    // Row 9: Empty
    wsData.push([]);

    // Row 10: Column Headers
    wsData.push([
        'Test Case ID',
        'Test Case Description',
        'Test Case Procedure',
        'Expected Results',
        'Pre-conditions',
        'Round 1',
        'Test date',
        'Tester',
        'Round 2',
        'Test date',
        'Tester',
        'Round 3',
        'Test date',
        'Tester',
        'Note',
    ]);

    // Group test cases by category
    const categorizedCases = new Map<string, ParsedTestCase[]>();
    testCases.forEach((tc) => {
        const category = tc.category || 'General';
        if (!categorizedCases.has(category)) {
            categorizedCases.set(category, []);
        }
        categorizedCases.get(category)!.push(tc);
    });

    // Add test cases grouped by category
    let rowIndex = 11;
    categorizedCases.forEach((cases, category) => {
        // Add category header row
        wsData.push([category, '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
        rowIndex++;

        // Add test cases in this category
        cases.forEach((tc) => {
            // Prefer English over Vietnamese for all fields
            const description = tc.description || tc.descriptionVi || '';
            const procedure = tc.procedure || '1. [To be filled]';
            const expectedResults = tc.expectedResults || tc.expectedResultsVi || '';
            const preConditions = tc.preConditions || tc.preConditionsVi || '';

            wsData.push([
                tc.id, // Test Case ID
                description, // Test Case Description
                procedure, // Test Case Procedure (with line breaks)
                expectedResults, // Expected Results
                preConditions, // Pre-conditions
                'Pending', // Round 1
                '', // Test date
                '', // Tester
                'Pending', // Round 2
                '', // Test date
                '', // Tester
                'Pending', // Round 3
                '', // Test date
                '', // Tester
                '', // Note
            ]);
            rowIndex++;
        });
    });

    // Create worksheet
    const worksheet = (XLSX as any).utils.aoa_to_sheet(wsData);

    // Enable text wrapping for Procedure column (column C, index 2)
    // Set cell style for procedure column to wrap text
    for (let row = 10; row < wsData.length; row++) {
        const cellAddress = (XLSX as any).utils.encode_cell({ r: row, c: 2 }); // Column C (Procedure)
        if (worksheet[cellAddress]) {
            worksheet[cellAddress].s = {
                ...worksheet[cellAddress].s,
                alignment: {
                    wrapText: true,
                    vertical: 'top',
                },
            };
        }
    }

    // Set column widths
    worksheet['!cols'] = [
        { wch: 15 }, // Test Case ID
        { wch: 50 }, // Test Case Description
        { wch: 60 }, // Test Case Procedure
        { wch: 50 }, // Expected Results
        { wch: 40 }, // Pre-conditions
        { wch: 12 }, // Round 1
        { wch: 12 }, // Test date
        { wch: 15 }, // Tester
        { wch: 12 }, // Round 2
        { wch: 12 }, // Test date
        { wch: 15 }, // Tester
        { wch: 12 }, // Round 3
        { wch: 12 }, // Test date
        { wch: 15 }, // Tester
        { wch: 30 }, // Note
    ];

    // Style header row (Row 10)
    const headerRow = 10;
    for (let col = 0; col < 15; col++) {
        const cellAddress = (XLSX as any).utils.encode_cell({ r: headerRow - 1, c: col });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = {
            fill: { fgColor: { rgb: '2E7D32' } }, // Green background
            font: { color: { rgb: 'FFFFFF' }, bold: true }, // White bold text
            alignment: { horizontal: 'center', vertical: 'center' },
        };
    }

    // Style category rows (light blue background)
    let currentRow = 11;
    categorizedCases.forEach((cases) => {
        const categoryRow = currentRow - 1;
        const cellAddress = (XLSX as any).utils.encode_cell({ r: categoryRow, c: 0 });
        if (worksheet[cellAddress]) {
            worksheet[cellAddress].s = {
                fill: { fgColor: { rgb: 'B3E5FC' } }, // Light blue
                font: { bold: true },
            };
        }
        currentRow += cases.length + 1; // +1 for category row, +cases.length for test cases
    });

    // Add worksheet to workbook
    const sheetName = feature || functionName || 'Test Cases';
    (XLSX as any).utils.book_append_sheet(workbook, worksheet, sheetName);

    return workbook;
}

/**
 * Main export function
 */
async function exportTestFilesToExcel() {
    try {
        console.log('📤 Exporting test cases to Excel...\n');

        // Find all test files in generated folder
        const generatedDir = join(process.cwd(), 'src/test/generated');
        const allFiles = readdirSync(generatedDir);
        const testFiles = allFiles
            .filter((file) => file.endsWith('-complete.test.ts'))
            .map((file) => join('src/test/generated', file));

        if (testFiles.length === 0) {
            console.warn('⚠️  No test files found in src/test/generated/');
            return;
        }

        console.log(`📁 Found ${testFiles.length} test file(s):\n`);

        // Process each test file
        for (const testFile of testFiles) {
            console.log(`📄 Processing: ${testFile}`);

            const filePath = join(process.cwd(), testFile);
            const fileContent = readFileSync(filePath, 'utf-8');

            // Parse metadata
            const metadata = parseTestFileMetadata(fileContent);
            console.log(`   Feature: ${metadata.feature}`);
            console.log(`   Function: ${metadata.functionName}`);
            console.log(`   Number of TCs: ${metadata.numberOfTCs}`);

            // Extract test cases
            const testCases = extractTestCasesFromFile(fileContent);
            console.log(`   Extracted ${testCases.length} test cases\n`);

            if (testCases.length === 0) {
                console.warn(`   ⚠️  No test cases found in ${testFile}`);
                continue;
            }

            // Create Excel workbook
            const workbook = createTestReportExcel(
                metadata.feature,
                metadata.functionName,
                metadata.preCondition,
                metadata.numberOfTCs,
                testCases
            );

            // Generate output filename with timestamp to avoid conflicts
            const featureName = metadata.feature
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const outputPath = join(
                process.cwd(),
                'docs/test-reports',
                `test-report-${featureName}-${timestamp}.xlsx`
            );

            // Write Excel file
            try {
                (XLSX as any).writeFile(workbook, outputPath);
                console.log(`   ✅ Exported to: ${outputPath}\n`);
            } catch (writeError: any) {
                if (writeError.code === 'EBUSY') {
                    console.warn(`   ⚠️  File is locked (may be open in Excel/Sheets). Skipping...\n`);
                    console.warn(`   💡 Close the Excel file and try again, or use: ${outputPath}\n`);
                } else {
                    throw writeError;
                }
            }
        }

        console.log('✨ Export completed successfully!');
    } catch (error) {
        console.error('❌ Error exporting test cases:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        process.exit(1);
    }
}

// Run if executed directly
if (import.meta.main) {
    await exportTestFilesToExcel();
}

