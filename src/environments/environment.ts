// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// Initialize Firebase
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDREXCQ7bXSB0RgIps-D9mBCy1HsFSSnCQ',
    authDomain: 'final-project-03.firebaseapp.com',
    databaseURL: 'https://final-project-03.firebaseio.com',
    projectId: 'final-project-03',
    storageBucket: 'final-project-03.appspot.com',
    messagingSenderId: '656175338897'
  }
};
