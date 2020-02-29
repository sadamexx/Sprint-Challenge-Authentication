const request = require('supertest');
const server = require('./server.js');


describe('test runs', () => {
    test('should run the test', () => {
        expect(true).toBe(true);
    });

    test('show server runs', () => {
        return request(server)
        .get('/')
        .then(res => {
            expect(res.status).toBe(200);
        })
    })

    test('should return server: up', () => {
        return request(server)
        .get('/')
        .then(res => {
            expect(res.body.server).toBe('up');
        })
    })

})