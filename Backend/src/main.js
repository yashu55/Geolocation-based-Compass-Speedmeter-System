const express = require('express');

const app = express();

const cors = require('cors');
const dbadduser = require('./db');

// Middelware :: Programs :: Which runs in advance.
app.use(express.json());
app.use(cors());

// http://localhost:3000/welcome
app.get('/welcome', (req, res) => {
  res.json({
    title: 'Welcome!!',
  });
});

// http://localhost:3000/adduser
app.post('/adduser', async (req, res) => {
  try {
    const input = req.body;

    await dbadduser.addUser(input);
    console.log('Done');
    res.status(201).json({
      message: true,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      message: false,
    });
  }
});

app.post('/auth-user', async (req, res) => {
  try {
    const input = req.body;

    await dbadduser.authenticateUser(input);
    res.status(200).json({
      opr: true,
    });
  } catch (err) {
    res.json({
      opr: false,
    });
  }
});

app.post('/forgotpassword', async (req, res) => {
  try {
    const input = req.body;
    const results = await dbadduser.forgotpassword(input);
    if (results) {
      res.status(200).json({
        message: true,
      });
    }
  } catch (err) {
    res.json({
      message: false,
    });
  }
});

app.post('/updatepassword', async (req, res) => {
  try {
    const input = req.body;
    const results = await dbadduser.updatepassword(input);
    if (results) {
      res.status(200).json({
        message: true,
      });
    }
  } catch (err) {
    res.json({
      message: false,
    });
  }
});



app.post('/deleteaccount', async (req, res) => {
  try {
    const input = req.body;
    const results = await dbadduser.deleteacc(input);
    if (results) {
      res.status(200).json({
        message: true,
      });
    }
  } catch (err) {
    res.json({
      message: false,
    });
  }
});


app.post('/details', async (req, res) => {
  try {
    const input = req.body;
    const results = await dbadduser.detailsUser(input);
    if (results) {
      res.status(200).json(results);
    }
  } catch (err) {
    res.json({
      message: false,
    });
  }
});

// started teh server.
app.listen(3000, () => {
  console.log('I am listening');
});