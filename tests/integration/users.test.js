const supertest = require('supertest');
const connection = require('../../src/database');
const app = require('../../src/app');

beforeAll(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM sessions');
});

afterAll(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM sessions');
    connection.end();
});

describe('POST /sign-up', () => {
    it('should return 201 when signUp new user', async () => {
        const body = {
            name: 'herick',
            email: 'herick@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        }
        const response = await supertest(app).post('/api/users/sign-up').send(body);
        expect(response.status).toBe(201);
    });
});

describe('POST /sign-in', () => {
    beforeEach(async () => {
        await supertest(app).post('/api/sign-up').send({
            name: 'herick',
            email: 'herick@gmail.com',
            password: '123456',
            confirmPassword: '123456'
        });
    });

    it('should return 200 when try signIn', async () => {
        const body = {
            email: 'herick@gmail.com',
            password: '123456'
        }
        const response = await supertest(app).post('/api/users/sign-in').send(body);
        expect(response.status).toBe(200);
    });

});




