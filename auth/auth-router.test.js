const request = require('supertest');
const server = require('../api/server.js');

describe('test runs', () => {
    test('should run the test', () => {
        expect(true).toBe(true);
    });

    describe('testing environment', function() {
        it('should use the testing env', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    });


    //REGISTER TESTS
    describe('Posting to /register', function() {
        it('should return as text/html', function() {
            return request(server)
            .post('/api/auth/register')            
            .then(res =>{
                expect(res.type).toMatch("text/html");
            })
        })
    })

    describe('POST /register err', function() {
        it('should not return JSON file', function() {
            return request(server).post('/api/auth/register')
            .then(res => {
                expect(res.type).not.toMatch(/json/i);               
            })
        })
    })

    it("should return 201 Created", function() {
        return request(server)
          .post("/api/auth/register")
          .send({ username: "TEST", password: "TEST" })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });


    //LOGIN TESTS
    describe('POST /login', function() {
        it('should return JSON', function() {
            return request(server).post('/api/auth/login')
            .then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })

    describe('POST /login err', function() {
        it('should not match text/html', function() {
            return request(server).post('/api/auth/login')
            .then(res => {
                expect(res.type).not.toMatch("text/html"); 
            })
        })
    })

    it("should return 200 on login", async () => {
        // User registers
        const response = await request(server)
          .post("/api/auth/register")
          .send({ username: "Addy", password: "pass" });
    
        // User logs in
        const loginResponse = await request(server)
          .post("/api/auth/login")
          .send({ username: "Addy", password: "pass" });
        expect(loginResponse.status).toBe(200);
      });
    
})