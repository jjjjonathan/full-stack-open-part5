const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

/********** TESTS BELOW **********/

test('correct number of notes are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id property is named id, not _id or anything else', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('adding a new test increments the total number of tests by one', async () => {
  const newBlog = {
    title: 'Going-to-the-sun-road',
    author: 'Marty and Chris',
    likes: 1,
    url: 'http://google.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
});

test("if likes aren't included in request, backend will set to 0", async () => {
  const newBlog = {
    title: 'Unliked book',
    author: 'Jack Kerouac',
    url: 'http://jackkerouac.com',
  };

  await api.post('/api/blogs').send(newBlog);

  const response = await api.get('/api/blogs');
  expect(response.body[helper.initialBlogs.length]).toHaveProperty('likes', 0);
});

test('if title or url are missing from request, server responds with status 400', async () => {
  const newBlog = {
    author: 'Andres Chinchin',
    likes: 982731,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('total blogs decrement by 1 when deleted', async () => {
  const firstGetResponse = await api.get('/api/blogs');
  const id = firstGetResponse.body[0].id;

  await api.delete(`/api/blogs/${id}`).expect(204);

  const secondGetResponse = await api.get('/api/blogs');
  expect(secondGetResponse.body).toHaveLength(helper.initialBlogs.length - 1);
});

test('updating likes succeeds', async () => {
  const newBlog = {
    likes: 2381,
  };

  const firstGetResponse = await api.get('/api/blogs');
  const id = firstGetResponse.body[0].id;

  await api.put(`/api/blogs/${id}`).send(newBlog).expect(200);

  const secondGetResponse = await api.get('/api/blogs');
  expect(secondGetResponse.body[0]).toHaveProperty('likes', newBlog.likes);
});

/********** TESTS ABOVE **********/

afterAll(() => {
  mongoose.connection.close();
});
