import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC8QVn8zZkWmkCF04Jgx8IgZ-qoxqs1i9o',
  authDomain: 'study-pomodoro.firebaseapp.com',
  projectId: 'study-pomodoro',
  storageBucket: 'study-pomodoro.appspot.com',
  messagingSenderId: '851991856575',
  appId: '1:851991856575:web:8295d763409bb002ab8d0a',
  measurementId: 'G-N8FMQHP1TY'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();
const analytics = firebaseApp.analytics();

export { provider, db, analytics };
