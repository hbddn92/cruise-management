import firebase from 'firebase'

let firebaseConfig = {
  apiKey: "AIzaSyBSQoAvpSg1s47HPzO948eZVs-LstHOENQ",
  authDomain: "cruise-management.firebaseapp.com",
  projectId: "cruise-management",
  storageBucket: "cruise-management.appspot.com",
  messagingSenderId: "18118161069",
  appId: "1:18118161069:web:6c4f9fa7779bae72628c24"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
// export default db;