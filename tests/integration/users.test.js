/* eslint-disable no-undef */
const supertest = require('supertest');
const sequelize = require('../../src/database');
const app = require('../../src/app');
require('dotenv').config();

const agent = supertest(app);
const cleatDataBase = async () => {
  await sequelize.query('DELETE FROM transactions;');
  await sequelize.query('DELETE FROM sessions;');
  await sequelize.query('DELETE FROM users;');
};
beforeEach(async () => {
  await cleatDataBase();
});

afterAll(async () => {
  await cleatDataBase();
  await sequelize.close();
});

describe('POST /sign-up', () => {
  it('should return 201 when signUp new user', async () => {
    const body = {
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    };
    const response = await agent.post('/api/users/sign-up').send(body);
    expect(response.status).toBe(201);
  });
});

describe('POST /sign-in', () => {
  it('should return 200 when try signIn', async () => {
    await supertest(app).post('/api/users/sign-up').send({
      name: 'test',
      email: 'test@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    });
    const body = {
      email: 'test@gmail.com',
      password: '123456',
    };
    const response = await agent.post('/api/users/sign-in').send(body);
    expect(response.status).toBe(200);
  });
});
