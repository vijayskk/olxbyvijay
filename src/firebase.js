import realfirebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC7xITJg1V9-y0Coa88rtW3MfhaLnIfT_0",
  authDomain: "olx-by-vijay.firebaseapp.com",
  projectId: "olx-by-vijay",
  storageBucket: "olx-by-vijay.appspot.com",
  messagingSenderId: "564284676231",
  appId: "1:564284676231:web:e0618c7a4c912017924022"
};

  const firebase = !realfirebase.apps.length
  ? realfirebase.initializeApp(firebaseConfig)
  :realfirebase.app();

  const auth = firebase.auth();
  const provider = new realfirebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();
  export { auth,provider,storage };
  export default firebase
  
