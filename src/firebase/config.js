import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC1bibztkRGbXrj5Ctjz6QvI2o6LD8bbbc',
    authDomain: 'your-auth-domain-b1234.firebaseapp.com',
    databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: 'happy-plant-app',
    storageBucket: 'your-project-id-1234.appspot.com',
    messagingSenderId: '108201933547',
    appId: '1:108201933547:android:f983db61e3c1ddf0659cae',
}

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth, firebase }
