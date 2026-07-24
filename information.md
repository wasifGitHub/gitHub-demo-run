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

