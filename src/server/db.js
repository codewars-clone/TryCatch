const firebase = require('firebase/app');

const firebaseConfig = {
  apiKey: 'AIzaSyArqZSptl2CfFA9IxzDqQ8bXC356OZSq0E',
  authDomain: 'try-catch-d20ae.firebaseapp.com',
  databaseURL: 'https://try-catch-d20ae.firebaseio.com',
  projectId: 'try-catch-d20ae',
  storageBucket: 'try-catch-d20ae.appspot.com',
  messagingSenderId: '961646012082',
  appId: '1:961646012082:web:4df182cc068e4e4c360bab',
  measurementId: 'G-RTSK0YTJ4T',
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

let aTuringRef = db.collection('users').doc('aturing');

let setAlan = aTuringRef.set({
  first: 'Alan',
  middle: '',
  last: 'Turing',
  born: 1912,
});

const getUsers = async () => {
  let users = await db.collection('users').get();
  users.forEach(user => console.log(user.id, '=>', user.data()));
};

getUsers();
