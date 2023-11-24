const express = require('express');
const app = express();

const admin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const userResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false,
  });
  res.json(userResponse);
});

app.listen(3000, () => {
  console.log('Server run on 3000');
});
