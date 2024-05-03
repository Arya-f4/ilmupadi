const firebaseConfig = {
  apiKey: process.env.ApiKey,
  authDomain: process.env.autDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.AppId,
  measurementId: process.env.measurementId
};

export { firebaseConfig };
