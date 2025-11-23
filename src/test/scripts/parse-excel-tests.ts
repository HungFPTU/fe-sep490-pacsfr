/**
 * Script to parse Excel test cases and generate test files
 * Usage: bun run src/test/scripts/parse-excel-tests.ts
 */

import { parseTestCasesFromExcel, generateTestFileContent } from '../utils/excel-parser';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const EXCEL_FILE_PATH = './docs/Report5_Test Report.xlsx';
const OUTPUT_DIR = './src/test/generated';

/**
 * Main function to parse and generate tests
 */
async function main() {
  try {
    console.log('📖 Parsing Excel test cases...');
    const testCases = await parseTestCasesFromExcel(EXCEL_FILE_PATH);

    if (testCases.length === 0) {
      console.warn('⚠️  No test cases found. Please ensure xlsx package is installed.');
      console.log('💡 To install: bun add -d xlsx @types/xlsx');
      return;
    }

    console.log(`✅ Found ${testCases.length} test cases`);

    // Group by module
    const modules = new Set(testCases.map((tc) => tc.module));

    console.log(`\n📦 Modules found: ${Array.from(modules).join(', ')}`);

    // Create output directory
    await mkdir(OUTPUT_DIR, { recursive: true });

    // Generate test files for each module
    for (const module of modules) {
      const moduleTestCases = testCases.filter((tc) => tc.module === module);
      const content = generateTestFileContent(moduleTestCases, module);

      const fileName = `${module.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.test.ts`;
      const filePath = join(OUTPUT_DIR, fileName);

      await writeFile(filePath, content, 'utf-8');
      console.log(`✅ Generated: ${filePath} (${moduleTestCases.length} test cases)`);
    }

    console.log('\n✨ Test files generated successfully!');
    console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('❌ Error parsing Excel file:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.main) {
  main();
}

export { main };

