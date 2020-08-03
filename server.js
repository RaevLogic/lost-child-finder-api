const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors())

const db = {
  users: [
    {
      id: '123',
      name: 'Reiyn',
      email: 'reiyn@gmail.com',
      password: 'cookies',
      joined: new Date()
    },
    {
      id: '124',
      name: 'Riley',
      email: 'riley@gmail.com',
      password: 'bananas',
      joined: new Date()
    }
  ],
  login: [
    {
      id:'987',
      hash: '',
      email: 'reiyn@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(db.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === db.users[0].email &&
      req.body.password === db.users[0].password) {
    res.json(db.users[0]);
  } else {
    res.status(400).json('Error logging in');
  }
})

app.post('/register', (req, res) => {
  const {email, name, password } = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    console.log(hash);
  });
  db.users.push({
    id: '125',
    name: name,
    email: email,
    joined: new Date()
  })
  res.json(db.users[db.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach(user => {
    console.log(user.id)
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('User not found.')
  }
})



// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//
// });

app.listen(3000, () => {
  console.log('app is running on port 3000');
})


/*
/ --> res = this is working
/signin --> POST = successful/fail
/register --> POST = user
/profile/:userId --> GET = user

*/