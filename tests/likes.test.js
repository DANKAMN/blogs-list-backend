const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app'); // Replace with your Express app instance
const Blog = require('../models/blog'); // Assuming the path is correct
const config = require('../utils/config')
beforeAll(async () => {
  // Connect to MongoDB (e.g., using a test database)
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

test('POST /api/blogs creates a new blog post with default likes (0)', async () => {
  const newBlogData = {
    title: 'Test Post 2',
    author: 'Test Author 2',
    url: 'https://example.com/test-post',
    // 'likes' property is intentionally omitted
  };

  const initialBlogCount = await Blog.countDocuments();

  const response = await request(app)
    .post('/api/blogs')
    .send(newBlogData)
    .expect(201); // Expecting a successful creation status code (e.g., 201 Created)

  const createdBlogPost = response.body;

  expect(createdBlogPost.likes).toBeDefined();
  expect(createdBlogPost.likes).toBe(0); // Verify that 'likes' defaulted to 0

  // Check if the total number of blogs in the system is increased by one
  const finalBlogCount = await Blog.countDocuments();
  expect(finalBlogCount).toBe(initialBlogCount + 1);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close(); // Close MongoDB connection after all tests
});