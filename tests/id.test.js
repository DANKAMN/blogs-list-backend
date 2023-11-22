const supertest = require('supertest')
const mongoose = require('mongoose')
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
  
  test('Blog post toJSON method returns id instead of _id', async () => {
    const newBlogPost = await Blog.create(
        {
            "title": "Hello Kitty Backpacks",
            "author": "Hello Kitty",
            "url": "https://www.hello.kitty.org/",
            "likes": 98765456
        }
    );
    const serializedPost = newBlogPost.toJSON();
  
    expect(serializedPost).toBeDefined();
    expect(serializedPost.id).toBeDefined(); // Check if 'id' property exists
    expect(serializedPost._id).toBeUndefined(); // Ensure '_id' property does not exist
  }, 10000);
  
  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection after all tests
  });