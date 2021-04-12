const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getToken = (request) => {
  const auth = request.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7);
  } else {
    return null;
  }
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const user = await User.findById(decodedToken.id);

  if (body.url === undefined || body.title === undefined) {
    response.status(400).end();
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const token = getToken(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'missing or invalid token',
    });
  }

  const blog = await Blog.findById(request.params.id);

  // uncomment to add back functionality to only delete blogs that are yours

  /* if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(403).json({
      error: 'cannot delete note that is not yours',
    });
  } else { */
  console.log(blog.user, decodedToken.id);
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
  /* } */
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const updated = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  });
  response.json(updated);
});

module.exports = blogsRouter;
