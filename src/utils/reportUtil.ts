import fs from "fs";

const REPORT_PATH = "src/reports/json/results.json";

/**
 * Reads and returns the latest Playwright JSON report.
 */
function readReport() {
  const data = fs.readFileSync(REPORT_PATH, "utf8");
  return JSON.parse(data);
}

/**
 * Returns overall execution statistics.
 */
export function getStats() {
  return readReport().stats;
}

/**
 * Returns all test suites.
 */
export function getSuites() {
  return readReport().suites;
}

/**
 * Returns total execution duration.
 */
export function getExecutionTime() {
const report = readReport();
  return report.stats.duration;
// return (report.stats.duration / 1000).toFixed(2);

}

/**
 * Returns total expected (passed + failed) tests.
 */
export function getTotalTests() {
  const report = readReport();
  let total = 0;

  for (const suite of report.suites) {
    for (const spec of suite.specs) {
      total += spec.tests.length;
    }
  }

  return total;
}

/**
 * Returns skipped tests count.
 */
export function getSkippedTests() {
  const report = readReport();
  let skipped = 0;

  for (const suite of report.suites) {
    for (const spec of suite.specs) {
      for (const test of spec.tests) {
        if (test.status === "skipped") {
          skipped++;
        }
      }
    }
  }

  return skipped;
}

/**
 * Returns failed tests count.
 */
export function getFailedTests() {
  const report = readReport();
  let failed = 0;

  for (const suite of report.suites) {
    for (const spec of suite.specs) {
      for (const test of spec.tests) {
        if (test.status === "unexpected") {
          failed++;
        }
      }
    }
  }

  return failed;
}

/**
 * Returns flaky tests count.
 */
export function getFlakyTests() {
  const report = readReport();
  let flaky = 0;

  for (const suite of report.suites) {
    for (const spec of suite.specs) {
      for (const test of spec.tests) {
        if (test.status === "flaky") {
          flaky++;
        }
      }
    }
  }

  return flaky;
}

/**
 * Returns passed tests count.
 */
export function getPassedTests() {
  const report = readReport();
  let passed = 0;

  for(const suite of report.suites){
    for(const spec of suite.specs){
        for(const test of spec.tests){
            if(test.status === 'expected'){
                passed++;
            }
        }
    }
  }

  return passed;
}

/**
 * Prints execution summary.
 */
export function printSummary() {
  console.log("\n========== Playwright Test Summary ==========");
  console.log(`Total Tests     : ${getTotalTests()}`);
  console.log(`Passed Tests    : ${getPassedTests()}`);
  console.log(`Failed Tests    : ${getFailedTests()}`);
  console.log(`Skipped Tests   : ${getSkippedTests()}`);
  console.log(`Flaky Tests     : ${getFlakyTests()}`);
  console.log(`Execution Time  : ${getExecutionTime()} ms`);
  console.log("=============================================\n");
}