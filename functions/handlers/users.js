const { db } = require('../index');

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

const getTries = async (req, res, next) => {
  try {
    const users = await db.collection('users');
    const currentUser = await db.doc(`/users/${req.params.userId}`).get();

    const response = await users.where(
      'gender',
      '==',
      currentUser.data().preferences.gender
    );
    const age = await response
      .where('age', '>=', currentUser.data().preferences.age[0])
      .where('age', '<=', currentUser.data().preferences.age[1])
      .get();
    const tries = [];
    age.forEach(doc => {
      tries.push({
        userId: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        gender: doc.data().gender,
        imageUrl: doc.data().imageUrl,
      });
    });
    res.json(tries);
  } catch (err) {
    next(err);
  }
};

const getLikes = async (req, res, next) => {
  try {
    const likes = [];
    const response = await db
      .collection('likesUser')
      .doc(req.params.userId)
      .get();
    const data = response.data();
    data.likes.forEach(doc => {
      likes.push({
        userId: doc,
      });
    });
    res.json(likes);
  } catch (err) {
    next(err);
  }
};
const sendLike = async (req, res, next) => {
  try {
    const currentUser = await db.doc(`/users/${req.params.userId}`).get();
    const likedUser = await db.doc(`/users/${req.body.user.id}`).get();
    db.collection('userLikes')
      .doc(currentUser.id)
      .set({ [likedUser.id]: true });
    db.collection('likedUser')
      .doc(likedUser.id)
      .set({ [currentUser.id]: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  getTries,
  getLikes,
};
