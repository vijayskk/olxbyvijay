import realfirebase from 'firebase'
import 'firebase/auth'

const firebase = realfirebase.initializeApp({
    apiKey: "AIzaSyC7xITJg1V9-y0Coa88rtW3MfhaLnIfT_0",
    authDomain: "olx-by-vijay.firebaseapp.com",
    projectId: "olx-by-vijay",
    storageBucket: "olx-by-vijay.appspot.com",
    messagingSenderId: "564284676231",
    appId: "1:564284676231:web:e0618c7a4c912017924022"
  });

  
export const auth = firebase.auth()
export const storage = realfirebase.storage();
export default firebase

