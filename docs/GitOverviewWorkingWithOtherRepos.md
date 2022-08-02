# Working Across Other Repositories

## Suggested Git Workflow

1. Git clone repo
2. Switch to personal branch
3. make changes commit and push often
4. re-sync personal branch with main
5. check status of existing pull requests for documentation-fixes
  * if there is an existing pull request modify
  * if no pull request start a new one after step 8
6. switch to documentation-fixes branch
7. re-sync with documentation-fixes with main
8. squash merge personal branch into documentation-fixes
9. Per step 5. consider starting a new pull request


## Commands

### Git clone
```
git clone https://github.com/eosnetworkfoundation/repo.git
```

### Switch to Personal Branch
```
cd repo
git checkout firstlast-working
```

### Make Changes and Sync
```
git add file.txt
git commit -m "my changes"
git push origin firstlast-working
```

### Resync with Main
```
git fetch origin main
git merge origin/main
git push origin firstlast-working
```

### Check Pull Requests
Go to github repo in your web browser, and look through existing pull requests.
PULL REQUESTS TOP LEFT CORNER IMAGE

### Switch to documentation-fixes
Need to reset and clean to syncronize with remote
```
git checkout documentation-fixes
git reset --hard && git clean -f -d
git pull origin documentation-fixes
```

### Squash Merge
Takes the many commits on your personal branch and squashes them into a single merge for the commit to main.
Git commit will trigger vi, please write a nice long commit. First line is the summary. Following lines are the long description.
```
git merge --squash firstlast-working
git commit
git push origin documentation-fixes
```

### Optionally Delete Working
Optional step delete your working branch.
```
git -D firstlast-working
```
