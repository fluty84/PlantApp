import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'


const firebaseConfig = {
    apiKey: 'AIzaSyC1bibztkRGbXrj5Ctjz6QvI2o6LD8bbbc',
    authDomain: 'your-auth-domain-b1234.firebaseapp.com',
    databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: 'happy-plant-app',
    storageBucket: 'your-project-id-1234.appspot.com',
    messagingSenderId: '108201933547',
    appId: '1:108201933547:android:f983db61e3c1ddf0659cae',
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };