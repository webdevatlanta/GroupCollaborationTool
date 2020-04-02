import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";

let signoutPromise,
  signinPromise,
  signupPromise,
  profilePromise,
  projectPromise,
  projectsPromise,
  resetPromise;

signoutPromise = signinPromise = signupPromise = profilePromise = projectPromise = projectsPromise = resetPromise = {
  resolve: undefined,
  reject: undefined
};

const mock = {
  displayName: "mockDisplayName",
  email: "mock@email.com"
};

const mockSession = {
  uid: 123,
  displayName: mock.displayName,
  email: mock.email
};

const TestProvider = props => {
  // This bit allows us to explictly pass in falsy values for session
  const fakeSession = Object.keys(props).includes("session")
    ? props.session
    : mockSession;

  const fakebase = {
    auth: {
      currentUser: {
        uid: 1,
        displayName: mock.displayName,
        emailVerified: true,
        email: mock.email
      }
    },
    doCreateUserWithEmailAndPassword: (email, password) =>
      new Promise((resolve, reject) => {
        signupPromise.resolve = resolve;
        signupPromise.reject = reject;
      }),
    doSignInWithEmailAndPassword: (email, password) =>
      new Promise((resolve, reject) => {
        signinPromise.resolve = resolve;
        SigninPromise.reject = reject;
      }),
    doSignOut: () =>
      new Promise((resolve, reject) => {
        signoutPromise.resolve = resolve;
        signoutPromise.reject = reject;
      }),
    getProfile: id =>
      new Promise((resolve, reject) => {
        profilePromise.resolve = resolve;
        profilePromise.reject = reject;
      }),
    getProject: id =>
      new Promise((resolve, reject) => {
        projectPromise.resolve = resolve;
      }),
    getProjectFollowers: id => {
      return Promise.resolve([{ displayName: mock.displayName }]);
    },
    getProjects: () =>
      new Promise((resolve, reject) => {
        projectsPromise.resolve = resolve;
        projectsPromise.reject = reject;
      }),
    sendPasswordResetEmail: email =>
      new Promise((resolve, reject) => {
        resetPromise.resolve = resolve;
        resetPromise.reject = reject;
      }),

    subscribeProjectMessages: (id, callback, error) => {
      callback([]); // Return an empty list of messages.
      return function() {};
    }
  };

  return (
    <MemoryRouter>
      <ProviderContext.Provider value={fakebase}>
        <SessionContext.Provider value={fakeSession}>
          {props.children}
        </SessionContext.Provider>
      </ProviderContext.Provider>
    </MemoryRouter>
  );
};

export {
  projectPromise,
  profilePromise,
  signoutPromise,
  projectsPromise,
  resetPromise,
  mock
};
export default TestProvider;
