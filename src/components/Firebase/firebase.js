export default class Firebase {
  constructor({ db, auth, serverTimestamp }) {
    this.db = db;
    this.auth = auth;
    this.serverTimestamp = serverTimestamp;
  }

  setDisplayName = displayName =>
    this.auth.currentUser.updateProfile({ displayName });

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        /* Set the display name on the auth currentUser object */
        const displayName = this.auth.currentUser.email.split("@")[0];
        return this.setDisplayName(displayName);
      })
      .then(() => {
        /* Create the initial profile document */
        return this.db
          .collection(process.env.REACT_APP_PROFILES_COLLECTION)
          .doc(this.auth.currentUser.uid)
          .set({
            uid: this.auth.currentUser.uid,
            displayName: this.auth.currentUser.displayName,
            email: this.auth.currentUser.email,
            description: ""
          });
      });

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.syncUserProfile());

  syncUserProfile = () =>
    this.db
      .collection(process.env.REACT_APP_PROFILES_COLLECTION)
      .doc(this.auth.currentUser.uid)
      .update({
        uid: this.auth.currentUser.uid,
        displayName: this.auth.currentUser.displayName,
        email: this.auth.currentUser.email
      })
      .then(() => Promise.resolve(this.auth.currentUser));

  doSignOut = () => this.auth.signOut();

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

  getProjects = () =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_COLLECTION)
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        })
      );

  getProject = id =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_COLLECTION)
      .doc(id)
      .get()
      .then(snapshot => snapshot.data());

  createProject = ({ owner, name, type, description, repoLink }) =>
    this.db.collection(process.env.REACT_APP_PROJECTS_COLLECTION).add({
      owner,
      name,
      type,
      description,
      repoLink
    });

  addProjectFollower = ({ project_id, user_id }) =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_FOLLOWERS_COLLECTION)
      .doc(project_id)
      .collection("followers")
      .doc(user_id)
      .set({
        following: true,
        profileRef: this.db
          .collection(process.env.REACT_APP_PROFILES_COLLECTION)
          .doc(user_id)
      });

  removeProjectFollower = ({ project_id, user_id }) =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_FOLLOWERS_COLLECTION)
      .doc(project_id)
      .collection("followers")
      .doc(user_id)
      .set({
        following: false
      });

  getProjectFollowers = id =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_FOLLOWERS_COLLECTION)
      .doc(id)
      .collection("followers")
      .where("following", "==", true)
      .get()
      .then(({ docs }) => docs.map(doc => doc.data()))
      .then(datas => datas.map(data => data.profileRef.get()))
      .then(promises => Promise.all(promises))
      .then(docs => docs.map(doc => doc.data()));

  addProjectMessage = (id, fields) =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_COLLECTION)
      .doc(id)
      .collection("messages")
      .add({
        ...fields,
        created: this.serverTimestamp()
      });

  getProjectMessages = id =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_COLLECTION)
      .doc(id)
      .collection("messages")
      .orderBy("created", "asc")
      .get()
      .then(({ docs }) => docs.map(doc => doc.data()));

  subscribeProjectMessages = (id, callback, errorCallback) =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_COLLECTION)
      .doc(id)
      .collection("messages")
      .orderBy("created", "asc")
      .onSnapshot(
        query => callback(query.docs.map(doc => doc.data())),
        errorCallback
      );

  updateProject = (id, fields) =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_COLLECTION)
      .doc(id)
      .update(fields);

  getProfile = id =>
    this.db
      .collection(process.env.REACT_APP_PROFILES_COLLECTION)
      .doc(id)
      .get()
      .then(snapshot => snapshot.data());

  updateProfile = (id, fields) =>
    this.db
      .collection(process.env.REACT_APP_PROFILES_COLLECTION)
      .doc(id)
      .update(fields);

  getUserProjects = id =>
    this.db
      .collection(process.env.REACT_APP_PROJECTS_COLLECTION)
      .where("owner", "==", id)
      .get()
      .then(({ docs }) => docs.map(doc => doc.data()));
}
