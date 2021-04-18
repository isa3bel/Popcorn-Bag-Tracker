import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBwx1oC8mcHU6L235uJ2bpzXAf6iEKDcT4",
  authDomain: "popcorn-bag-tracker.firebaseapp.com",
  projectId: "popcorn-bag-tracker",
  storageBucket: "popcorn-bag-tracker.appspot.com",
  messagingSenderId: "611320534781",
  appId: "1:611320534781:web:691ef5e6eb3dc820b9d094",
};
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const Firebase = firebase.initializeApp(config);
export default Firebase;