const { db } = require('../utils/firebase');

const createUser = async () => {
  try {
    let aTuringRef = await db.collection('users').doc('aturing');

    let setAlan = await aTuringRef.set({
      first: 'Alan',
      middle: '',
      last: 'Turing',
      born: 1912,
    });
  } catch (err) {
    console.error(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    let data = await db.collection('users').get();
    let users = [];
    data.forEach(doc => {
      users.push({
        userId: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        gender: doc.data().gender,
        imageUrl: doc.data().imageUrl,
      });
    });
    res.json(users);
  } catch (err) {
    console.error(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    let userData = {};
    const response = await db.doc(`/users/${req.params.userId}`).get();
    if (!response.exists) {
      res.status(404).json({ error: 'User not found.' });
    }
    userData = response.data();
    res.json(userData);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
};
