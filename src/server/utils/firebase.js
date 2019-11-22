const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://try-catch-d20ae.firebaseio.com',
});

let db = admin.firestore();

module.exports = { admin, db };
