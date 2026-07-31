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
// With a JSON reporter, Playwright generates a file containing details such as:
Test names
Test status
Duration
Errors
Stack traces
Retry information
// This file can then be consumed by dashboards, CI/CD tools, or custom scripts.
1. Step 1: Configure the JSON Reporter
reporter: [
  ['html'],
  ['json', {
    outputFile: 'reports/results.json'
  }]
]

2. Step 2: Run Tests
- You'll get a folder like: reports/resultsjson

3. Step 3: Open the JSON File
- Why JSON?
// Imagine your manager asks: "How many tests passed yesterday?"
// Instead of opening the HTML report manually, a CI/CD pipeline can read results.json and automatically create a dashboard or send a Slack notification.
// Suppose your suite has:
150 tests
145 passed
5 failed
// A custom Node.js script can read results.json and produce:
Total Tests : 150
Passed      : 145
Failed      : 5
Skipped     : 0
// or even email that summary to the team.

// Interview Questions
// Q1. Why do we use a JSON reporter?
// Answer:
// The JSON reporter generates structured test results in JSON format. It's useful for integrating Playwright with CI/CD pipelines, dashboards, custom scripts, and other reporting tools.