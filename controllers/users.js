const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body;

  if (password.length < 3) {
    response
      .status(400)
      .json({
        error: 'password must be at least 3 characters long',
      })
      .end();
  } else {
    const salt = 11;
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  }
});

module.exports = usersRouter;
