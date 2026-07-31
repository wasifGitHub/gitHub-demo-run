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

- …or push an existing repository from the command line
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

## JSON Reporter
- With a JSON reporter, Playwright generates a file containing details such as:
Test names
Test status
Duration
Errors
Stack traces
Retry information
- This file can then be consumed by dashboards, CI/CD tools, or custom scripts.
1. Step 1: Configure the JSON Reporter
reporter: [
  ['html'],
  ['json', {
    outputFile: 'src/reports/results.json'
  }]
]

2. Step 2: Run Tests
- You'll get a folder like: reports/resultsjson
- Json contains:
{
  "config": {},
  "suites": [],
  "errors": [],
  "stats": {}
}
(a) config :
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

(b) suites:
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

(c) errors
- If Playwright crashes before executing tests, you'll find those errors here.

(d) stats
- Contains summary information.
{
  "expected": 10,
  "unexpected": 2,
  "flaky": 1,
  "skipped": 0
}
This is useful for quickly seeing the outcome of a test run.

3. Step 3: Open the JSON File
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

- Interview Questions
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