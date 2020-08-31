import firebase from 'firebase/app';
import firebaseConfig from './firebaseKey';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
export { auth, db };
