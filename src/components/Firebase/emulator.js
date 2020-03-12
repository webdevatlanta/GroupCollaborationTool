const emulator = require("@firebase/testing");
const projectId = "test-app";

async function clearEmulatorData() {
  await emulator.clearFirestoreData({ projectId });
}

async function loadEmulatorRules() {
  // await emulator.loadFirestoreRules({projectId, rules});
}

async function deleteEmulatorApps() {
  await Promise.all(emulator.apps().map(app => app.delete()));
}

export default class {
  constructor({ auth }) {
    this.app = emulator.initializeTestApp({ projectId, auth });
    this.db = this.app.firestore();
    this.serverTimestamp = emulator.firestore.FieldValue.serverTimestamp;
  }
}

export { clearEmulatorData, loadEmulatorRules, deleteEmulatorApps };
