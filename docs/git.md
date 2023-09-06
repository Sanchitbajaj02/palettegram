# Git workflow best practices 🛠️

## Initial setup

- Fork the repository
- Clone this repository on your local machine

```bash
git clone https://github.com/<username>/palettegram.git
```

- Add the main repository as "upstream"

```bash
git remote add upstream https://github.com/Sanchitbajaj02/palettegram.git
```

## Working on the issues 

1. Get the latest version of the project

- `git fetch upstream`
- `git checkout master`
- `git pull upstream master`

<br/>

2. Create a new branch starting from that newly updated main branch, and link it to your GitHub fork. (For example your branch name is MyNewIssue)

- `git checkout -b MyNewIssue`
- `git push --set-upstream origin MyNewIssue`

<br/>

3. Make your changes, commit them, and push them to your fork

- _make changes_
- `git add <files to add>`
- `git commit -m "<commit message>"`
- _write a good commit message_
- `git push origin MyNewIssue`

## Rebasing your branch

When there have been changes in the main repo that you want to get, the cleanest option is often to rebase your branch on top of the latest commits.

1. Get the latest commits and update your local master branch

- `git fetch upstream`
- `git checkout master`
- `git pull upstream master`

2. Rebase your in-progress feature branch

- `git checkout MyInProgressFeature`
- `git rebase master`

## Resetting a branch after you've messed it up

1. Make sure there isn't any work that you care about losing
2. Do a hard reset to the branch you want to restart from.

- `git checkout MyMessedUpBranch`
- `git reset --hard upstream/master`

## Adding a single commit from one branch to another branch

1. Find and copy the commit ID that you want to use
2. Cherry-pick that commit

- `git checkout MyCleanBranch`
- `git cherry-pick COMMIT_ID`
