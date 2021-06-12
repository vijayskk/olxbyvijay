import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC7xITJg1V9-y0Coa88rtW3MfhaLnIfT_0",
    authDomain: "olx-by-vijay.firebaseapp.com",
    projectId: "olx-by-vijay",
    storageBucket: "olx-by-vijay.appspot.com",
    messagingSenderId: "564284676231",
    appId: "1:564284676231:web:e0618c7a4c912017924022"
  };

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  :firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  export { db,auth,provider };