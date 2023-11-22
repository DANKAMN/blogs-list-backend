const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const config = require('../utils/config')
const Blog = require('../models/blog');

beforeAll(async () => {
  // Connect to MongoDB (e.g., using a test database)
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

test('POST /api/blogs responds with 400 if title or url is missing', async () => {
  const blogWithoutTitle = {
    // Missing 'title' property intentionally
    author: 'Test Author',
    url: 'https://example.com/test-post',
    likes: 10,
  };

  const blogWithoutUrl = {
    title: 'Test Post',
    author: 'Test Author',
    // Missing 'url' property intentionally
    likes: 10,
  };

  await request(app)
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400); // Expecting status code 400 for missing 'title'

  await request(app)
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400); // Expecting status code 400 for missing 'url'
}, 10000);

afterAll(async () => {
  await mongoose.connection.close(); // Close MongoDB connection after all tests
});