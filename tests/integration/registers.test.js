const supertest = require('supertest');
const connection = require('../../src/database');
const app = require('../../src/app');

beforeAll(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM registers');
    await connection.query('DELETE FROM sessions');

    await supertest(app).post('/api/users/sign-up').send({
        name: 'herick',
        email: 'herick@gmail.com',
        password: '123456',
        confirmPassword: '123456'
    });

});

afterAll(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM registers');
    await connection.query('DELETE FROM sessions');
    connection.end();
});

describe('POST /registers/new', () => {
    
    it('should return 201 when create register', async () => {
        const res = await supertest(app).post('/api/users/sign-in').send({
            email: 'herick@gmail.com',
            password: '123456'
        });
        const token = res.body.token;

        const body = {
            value: '300',
            description: 'salary',
            type: 'input',
        }
        const response = await supertest(app).post('/api/registers/new').send(body).set({ 'Authorization': `Bearer ${token}`});
        expect(response.status).toBe(201);
    });

    
});

describe('GET /registers', () => {
    
    it('should return 201 when get user registers', async () => {
        const res = await supertest(app).post('/api/users/sign-in').send({
            email: 'herick@gmail.com',
            password: '123456'
        });
        const token = res.body.token;

        const response = await supertest(app).get('/api/registers').set({ 'Authorization': `Bearer ${token}`});
        expect(response.status).toBe(200);
    });

    
});





