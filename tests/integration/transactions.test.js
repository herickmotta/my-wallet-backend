/* eslint-disable no-undef */
const supertest = require('supertest');
const sequelize = require('../../src/database');
const app = require('../../src/app');

const cleatDataBase = async () => {
  await sequelize.query('DELETE FROM transactions;');
  await sequelize.query('DELETE FROM sessions;');
  await sequelize.query('DELETE FROM users;');
};

beforeEach(async () => {
  await cleatDataBase();
  const body = {
    name: 'test',
    email: 'test@gmail.com',
    password: '123456',
    confirmPassword: '123456',
  };
  await supertest(app).post('/api/users/sign-up').send(body);
});

afterAll(async () => {
  await cleatDataBase();
  await sequelize.close();
});

describe('POST /transactions/new', () => {
  it('should return 201 when create transactions', async () => {
    const res = await supertest(app).post('/api/users/sign-in').send({
      email: 'test@gmail.com',
      password: '123456',
    });
    const { token } = res.body;

    const body = {
      value: 30000,
      description: 'salary',
    };
    const response = await supertest(app).post('/api/transactions/new/input').send(body).set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });
});

describe('GET /transatcions', () => {
  it('should return 200 when get user registers', async () => {
    const res = await supertest(app).post('/api/users/sign-in').send({
      email: 'test@gmail.com',
      password: '123456',
    });
    const { token, id } = res.body;

    const response = await supertest(app).get(`/api/transactions/${id}`).set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(200);
  });
});
