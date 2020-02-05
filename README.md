# GroupCollaborationTool

A WeDev Atlanta Project: A tool for collaboration, built through collaboration.

## Contributing to this open source project

1. Fork the repo so you have your own copy to work off of.
2. Clone your forked copy (So will have you user name in the clone link)
3. Add an upstream to the shared repo:

```
git remote add upstream https://github.com/webdevatlanta/GroupCollaborationTool.git
```

4. Always start off fresh when working on a repo:

```
get checkout master
git fetch --all
git merge upstream/master
```

5. Update dependencies

```
yarn install
```

6. Create a feature branch based off master:

```
git checkout -B my_feature_branch_name_here
```

7. Do your work on the feature branch
8. Add, commit, and push your feature branch to your Github:

```
git add .
git commit -m "My new feature I made"
git push origin my_feature_branch_name_here
```

9. Go to your forked repo on github and create a pull request from your feature branch to master
