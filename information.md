## Check if git is installed in your mac
1. git -v // return verison
2. if it returns version in terminal then git is installed in you system. If not them got to page "https://git-scm.com/" and install it.

## Create New Repository on you gitHub
1. Git will give some suggestuon after creating repository.
- …or create a new repository on the command line
echo "# gitHub-demo-run" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/wasifGitHub/gitHub-demo-run.git
git push -u origin main

- or push an existing repository from the command line
git remote add origin https://github.com/wasifGitHub/gitHub-demo-run.git
git branch -M main
git push -u origin main

## CICD
1. Go to doc - https://playwright.dev/docs/ci-intro
2. Create folders .github and workflows
3. Then create a .yml file. It have any name like playwright.yml
4. Then define yml file.
5. To have some extra insights on failure on github Actions use below in playwright.config.ts
reporter: [['html'],['github']],
It will show extra insights in Annotations

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
### Types of reporter
Day 1: JSON Reporter
Day 2: JUnit Reporter
Day 3: Allure Reporter (most important)
Day 4: Extent Report

///////////////////////////////////////////////////////////
## Module 1: JSON Reporter
- The JSON reporter provides structured execution data, including test suites, test titles, statuses, durations, retries, worker information, errors, stdout, stderr, attachments, and overall execution statistics. Since it's machine-readable, it's commonly used to build custom reports, dashboards, and notifications.
- With a JSON reporter, Playwright generates a file containing details such as:
Test names
Test status
Duration
Errors
Stack traces
Retry information
- This file can then be consumed by dashboards, CI/CD tools, or custom scripts.
# 1. Step 1: Configure the JSON Reporter
reporter: [
  ['html'],
  ['json', {
    outputFile: 'src/reports/results.json'
  }]
]

# 2. Step 2: Run Tests
- You'll get a folder like: reports/resultsjson
- Json contains:
{
  "config": {},
  "suites": [], 
  "errors": [],
  "stats": {}
}

# (a) config : Contains Playwright configuration.
. Contains the Playwright configuration used during the test run.
"config": {
  "workers": 4,
  "retries": 1,
  "timeout": 30000
}
. It tells you:
How many workers ran
Retry count
Timeout
Browser
Projects
Reporter configuration

# (b) suites: Contains details of every suite, spec, and test.
- It contains all your:
Test files
Test suites
Test cases
Status
Duration
Errors

- Exxample
{
  "title": "Login Tests",
  "specs": [
    {
      "title": "Valid Login",
      "tests": [
        {
          "status": "passed",
          "duration": 2500
        }
      ]
    }
  ]
}

- Here you can see:
Test name
Pass/Fail
Execution time

# (c) errors : Contains execution-level errors, not the complete summary.
- If Playwright crashes before executing tests, you'll find those errors here.

# (d) stats
- Contains summary information.
{
  "expected": 10,
  "unexpected": 2,
  "flaky": 1,
  "skipped": 0
}
This is useful for quickly seeing the outcome of a test run.

# 3. Step 3: Open the JSON File
- Why JSON?
Imagine your manager asks: "How many tests passed yesterday?"
Instead of opening the HTML report manually, a CI/CD pipeline can read results.json and automatically create a dashboard or send a Slack notification.
Suppose your suite has:
150 tests
145 passed
5 failed

A custom Node.js script can read results.json and produce:
Total Tests : 150
Passed      : 145
Failed      : 5
Skipped     : 0
or even email that summary to the team.

# - Interview Questions
Q1. Why do we use a JSON reporter?
Answer:
- JSON Reporter generates test results in a structured format that can be consumed by other applications, dashboards, CI/CD pipelines, or custom scripts.
- Read results.json
- Count passed and failed tests
- Send a Slack notification
- Send an email
- Update a dashboard
- Upload results to another tool

Q2. Real Project Example
Answer:
- Instead of opening the HTML report, you can read results.json.
const report = require("./reports/results.json");
console.log(report.stats);

 - This is how dashboards and automation tools process test results.

Q3. Does the JSON Reporter create an HTML report?
Answer:
No. It only generates a JSON file. If you need an HTML report, you should configure the HTML reporter separately.

Q4. If your manager asks, "How many tests passed?" would you parse suites or use stats?
Answer:
I would first check the stats section because it provides the overall execution summary. If I needed details about which specific tests passed or failed, I would then inspect the suites section.
This is exactly how many reporting tools work:
They use stats for dashboards and summaries.
They use suites for detailed drill-down information.

///////////////////////////////////////////////////////////
## Module 2: JUnit Reporter ⭐⭐⭐⭐
# What is JUnit Reporter?
1. A JUnit reporter generates an XML file containing the test execution results.
Unlike the HTML report, which is meant for humans, the JUnit report is primarily intended for CI/CD tools.
2. Example:
Jenkins ✅
Azure DevOps ✅
GitLab CI ✅
CircleCI ✅
GitHub Actions (through additional integrations)
These tools can parse XML and display test results in a dashboard.

3. Why do we need JUnit when we already have HTML?
HTMl - Used by Humans
JSON - Used by custom scripts, dashboards, APIs
Junit (XML) - CI/CD tools
JUnit XML is structured specifically for machines.

# Step 1: Configure JUnit
1. Open your playwright.config.ts.
Currently you have:
reporter: [
  ['html', {
    outputFolder: 'src/reports/html'
  }],
  ['github'],
  ['json', {
    outputFile: 'src/reports/json/results.json'
  }]
]
Add JUnit:
reporter: [
  ['html', {
    outputFolder: 'src/reports/html'
  }],
  ['github'],
  ['json', {
    outputFile: 'src/reports/json/results.json'
  }],
  ['junit', {
    outputFile: 'src/reports/junit/results.xml'
  }]
]

Add it in yml file:
- uses: actions/upload-artifact@v4
  if: ${{ !cancelled() }}
  with:
    name: junit-report
    path: src/reports/junit/results.xml
    retention-days: 30

# Step 2: Run the tests
Now you should see:
src/
└── reports/
    ├── html/
    ├── json/
    └── junit/
         └── results.xml

# Step 3: Open results.xml
You will see XML similar to this:
<testsuites>
  <testsuite name="login.spec.ts" tests="2" failures="1">
    <testcase
      name="Verify valid login"
      classname="login.spec.ts"
      time="1.25"
    />
    <testcase
      name="Verify invalid login"
      classname="login.spec.ts"
      time="0.80"
    >
      <failure message="Expected element to be visible">
        ...
      </failure>
    </testcase>
  </testsuite>
</testsuites>

///////////////////////////////////////////////////////////
## Module 3: Allure Report ⭐⭐⭐⭐
# What is Allure?
Allure is an advanced reporting framework that provides:
Beautiful UI
Screenshots
Videos
Trace links
Test history
Categories
Environment details
Steps
Attachments
Trend analysis

# Understand how Allure works because it's different from the other reporters.
1. With HTML:
Playwright -> HTML Report
2. With JSON:
Playwright -> results.json
3. With JUnit:
Playwright -> results.xml
4. But Allure works in two steps.
Playwright -> allure-results/ -> Allure CLI -> Beautiful Report

5. This is one of the most common interview questions:
Notice that Playwright does not directly generate the HTML report.
Instead, it first generates raw result files.
Then the Allure CLI converts those files into the final report.

# Why do companies prefer Allure?
| Feature          | HTML | JSON    | JUnit   | Allure |
| ---------------- | ---- | ------- | ------- | ------ |
| Human readable   | ✅    | ❌       | ❌       | ✅      |
| Machine readable | ❌    | ✅       | ✅       | ✅      |
| Screenshots      | ❌    | Limited | ❌       | ✅      |
| Videos           | ❌    | ❌       | ❌       | ✅      |
| Trace            | ❌    | ❌       | ❌       | ✅      |
| Categories       | ❌    | ❌       | ❌       | ✅      |
| History          | ❌    | ❌       | CI only | ✅      |
| Trends           | ❌    | ❌       | CI only | ✅      |

# Folder structure
After running Playwright you'll get:
allure-results/
    xxxxx-result.json
    xxxxx-container.json
    environment.properties

# Steps 1:
1. Install the required packages:
npm install -D allure-playwright

2. Install the Allure command-line tool:
npm install -D allure-commandline

# Steps 2: Configure Playwright
1. Open your playwright.config.ts.
reporter: [
  ['html', {
    outputFolder: 'src/reports/html'
  }],
  ['github'],
  ['json', {
    outputFile: 'src/reports/json/results.json'
  }],
  ['junit', {
    outputFile: 'src/reports/junit/results.xml'
  }],
  ['allure-playwright', {
    outputFolder: 'allure-results'
  }]
]

# Step 3: Generate the HTML report
1. npx allure generate allure-results --clean -o allure-report

# step 4: Open it:
npx allure open allure-report

# Interview Question ⭐⭐⭐⭐⭐
Q1. Why use Allure if Playwright already has an HTML report?
Answer:
Playwright HTML reports are excellent for basic execution results, but Allure provides richer reporting features such as custom steps, screenshots, videos, traces, environment information, categories, and historical trends. These features make debugging and reporting much more effective, especially in enterprise projects.