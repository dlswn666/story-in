// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBqmDEEVmQ3ODTS6ZoQTtFifqDCAi59Oq8',
    authDomain: 'stroy-in.firebaseapp.com',
    projectId: 'stroy-in',
    storageBucket: 'stroy-in.appspot.com',
    messagingSenderId: '617046050005',
    appId: '1:617046050005:web:b07cac2f8c2c84ac394e5c',
    measurementId: 'G-RTXX8W35YE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
