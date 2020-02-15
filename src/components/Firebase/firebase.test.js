import Provider from "./firebase";
const firebase = require("@firebase/testing");
const port = require("../../../firebase.json").emulators.firestore.port;
const appId = "test-app";

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: appId });
});

beforeAll(async () => {
  //await firebase.loadFirestoreRules({ projectId:appId, rules });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  //const coverageUrl = `http://localhost:${port}/emulator/v1/projects/${appId}:ruleCoverage.html`;
  //console.log(`View rule coverage information at ${coverageUrl}\n`);
});

describe("Projects", () => {
  const auth = {
    uid: "testman-123",
    displayName: "testman",
    email: "testman@example.com"
  };
  const db = firebase.initializeTestApp({ projectId: appId, auth }).firestore();
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
  const provider = new Provider({ db, auth, serverTimestamp });

  it("Creates a project.", async () => {
    const projectParams = {
      owner: auth.uid,
      name: "test project 1",
      type: "public",
      description: "a test project",
      repoLink: "https://me.local:8080/project"
    };

    await provider.createProject(projectParams);
    const list = await provider.getProjects();

    expect(list.length).toBe(1);
    expect(list[0]).toMatchObject(projectParams);
  });

  it("Adds a follower.", async () => {
    const projectParams = {
      owner: auth.uid,
      name: "test project 1",
      type: "public",
      description: "a test project",
      repoLink: "https://me.local:8080/project"
    };

    const proj = await provider.createProject(projectParams);
    const id = await proj.get().then(doc => doc.id);
    await provider.createUserProfile(auth);
    const profile = provider.getProfile(auth.uid);
    await provider.addProjectFollower({ project_id: id, user_id: auth.uid });
    const list = await provider.getProjectFollowers(id);

    expect(list.length).toBe(1);
    expect(list[0]).toMatchObject(profile);
  });

  it("Adds a message.", async () => {
    const projectParams = {
      owner: auth.uid,
      name: "test project 1",
      type: "public",
      description: "a test project",
      repoLink: "https://me.local:8080/project"
    };

    const proj = await provider.createProject(projectParams);
    const id = await proj.get().then(doc => doc.id);

    const messageParams = {
      authorDisplayName: auth.displayName,
      authorUid: auth.uid,
      content: "this is a message"
    };

    await provider.addProjectMessage(id, messageParams);
    const list = await provider.getProjectMessages(id);

    expect(list.length).toBe(1);
    expect(list[0]).toMatchObject(messageParams);
  });
});
