// tests/user.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('User Endpoints', () => {
  let adminToken, userToken, testUserId;
  
  beforeAll(async () => {
    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpass',
      role: 'admin'
    });
    await adminUser.save();
    
    // Create regular user
    const regularUser = new User({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'userpass',
      role: 'user'
    });
    await regularUser.save();

    // Generate tokens for both users
    adminToken = jwt.sign(
      { id: adminUser._id, email: adminUser.email, role: adminUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    userToken = jwt.sign(
      { id: regularUser._id, email: regularUser.email, role: regularUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Create a user to test deletion
    const testUser = new User({
      name: 'Test Delete User',
      email: 'delete@example.com',
      password: 'password123',
      role: 'user'
    });
    await testUser.save();
    testUserId = testUser._id;
  });

  afterAll(async () => {
    // Cleanup test users and close connection
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should allow admin to delete a user', async () => {
    const res = await request(app)
      .delete(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });

  it('should forbid non-admin user from deleting a user', async () => {
    // Create another user to test deletion
    const anotherUser = new User({
      name: 'Another Test User',
      email: 'anothertest@example.com',
      password: 'password123',
      role: 'user'
    });
    await anotherUser.save();

    const res = await request(app)
      .delete(`/api/users/${anotherUser._id}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message', 'Access denied. Admins only can delete users.');
  });
});
