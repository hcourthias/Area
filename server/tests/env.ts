import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyADYWzn38EKKaW2b-DA1PBqqdeQhSUA1-w",
    authDomain: "area-3e80d.firebaseapp.com",
    databaseURL: "https://area-3e80d.firebaseio.com",
    projectId: "area-3e80d",
    storageBucket: "area-3e80d.appspot.com",
    messagingSenderId: "367765098795",
    appId: "1:367765098795:web:7cb59e010a8b7f6582356e",
    measurementId: "G-KJXCWS2MNG"
};

firebase.initializeApp(firebaseConfig);

export { firebase };

export const BASE_URL = `http://localhost:3000`;

