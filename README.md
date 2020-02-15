# GroupCollaborationTool

A [WeDev Atlanta Meetup](https://meetup.com/webdevatlanta) project. A tool for collaboration, that's being built through collaboration. Neat!

Here's how to get started:

## Get a copy of this repo

1.  Fork this respository by [clicking here](https://github.com/webdevatlanta/GroupCollaborationTool/fork).

2.  Clone the forked copy to your computer:

```
git clone https://gthub.com/<your-user-name>/GroupCollaborationTool.git
```

3. Add an upstream to the shared repo:

```
cd GroupCollaborationTool
git remote add upstream https://github.com/webdevatlanta/GroupCollaborationTool.git
```

## Making your contribution

1. Always start off by fetching and merging the latest changes:

```
git checkout master
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

4. ...make your edits, fix a bug, implement a feature, etc. If you're looking for something to work on, check out our [Issues](https://github.com/webdevatlanta/GroupCollaborationTool/issues) page.

5. Add, commit, and push your feature branch to your Github:

```
git add .
git commit -m "Enter your description of your changes."
git push origin my_feature_branch_name_here
```

5.  Use your GitHub page to create a pull request from your feature branch to master.

6.  One of the admins will then merge your changes into the main branch.

7.  Return to step 1 and repeat: fetch, merge, branch, edit, commit, push!

## Running tests

0. Install Firebase/Firestore emulators (only need to do this once)

```
npx firebase setup:emulators:firestore
```

1. Start the Firestore emulator:

```
npx firebase emulators:start --only firestore
```

2. Run the React test script:

```
yarn test
```
