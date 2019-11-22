const functions = require('firebase-functions');
const express = require('express');
const app = express();

const { db } = require('./utils/firebase');

const { getUsers, getSingleUser } = require('./handlers/users');

app.get('/users', getUsers);
app.get('/users/:userId', getSingleUser);

const PORT = 8888;
app.listen(PORT, () => {
  console.log('Doing things on port ', PORT);
});
