import Provider from "./provider";
import Emulator, { clearEmulatorData, deleteEmulatorApps } from "./emulator";

beforeEach(async () => {
  await clearEmulatorData();
});

beforeAll(async () => {
  // await loadEmulatorRules();
});

afterAll(async () => {
  await deleteEmulatorApps();
});

describe("Projects", () => {
  const auth = {
    uid: "testman-123",
    displayName: "testman",
    email: "testman@example.com"
  };

  const emulator = new Emulator({ auth });
  const provider = new Provider({
    db: emulator.db,
    auth: emulator.auth,
    serverTimestamp: emulator.serverTimestamp
  });

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
