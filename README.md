# GroupCollaborationTool

A WeDev Atlanta Project. A tool for collaboration, built through collaboration.

## Get a forked copy of this repo

1. Use the GitHub Fork button to fork the repo.

2. Clone the forked copy to your computer.

```
git clone https://gthub.com/<your-user-name>/GroupCollaborationTool.git
```

3. Add an upstream to the shared repo:

```
cd GroupCollaborationTool
git remote add upstream https://github.com/webdevatlanta/GroupCollaborationTool.git
```

## Making your contribution

1. Always start off fresh when working on a repo:

```
cd group-collaboration
get checkout master
git fetch --all
git merge upstream/master
```

2. Install/update dependencies

```
yarn install
```

2. Create a feature branch based off master:

```
git checkout -B my_feature_branch_name_here
```

3. Start the dev server

```
yarn start
```

4. ...make your changes to the code.

5. Add, commit, and push your feature branch to your Github:

```
git add .
git commit -m "My new feature I made"
git push origin my_feature_branch_name_here
```

5.  Go to your forked repo on GitHub and create a pull request from your feature branch to master
