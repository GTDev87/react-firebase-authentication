import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCmtdQVzQ8SPvsdjVbghr348iN8FwtzpvI",
  authDomain: "hack-referral.firebaseapp.com",
  databaseURL: "https://hack-referral.firebaseio.com",
  projectId: "hack-referral",
  storageBucket: "hack-referral.appspot.com",
  messagingSenderId: "285916849263"
};
  
const firebaseApp  = firebase.initializeApp(config);

export default firebaseApp;
