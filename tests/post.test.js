const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app'); // Replace with your Express app instance
const supertest = require('supertest')
const config = require('../utils/config')
const Blog = require('../models/blog')

beforeAll(async () => {
  // Connect to MongoDB (e.g., using a test database)
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

test('POST /api/blogs creates a new blog post', async () => {
  const newBlogData = {
    title: "Test blog",
    author: "Test Author",
    url: "https://www.test_url/",
    likes: 1
  };

  const initialBlogCount = await Blog.countDocuments();

  const response = await request(app)
    .post('/api/blogs')
    .send(newBlogData)
    .expect(201); // Expecting a successful creation status code (e.g., 201 Created)

  const createdBlogPost = response.body;

  expect(createdBlogPost).toHaveProperty('id');
  expect(createdBlogPost.title).toBe(newBlogData.title);
  expect(createdBlogPost.author).toBe(newBlogData.author);
  expect(createdBlogPost.likes).toBe(newBlogData.likes);

  // Check if the total number of blogs in the system is increased by one
  const finalBlogCount = await Blog.countDocuments();
  expect(finalBlogCount).toBe(initialBlogCount + 1);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close(); // Close MongoDB connection after all tests
});
