
const request = require('supertest');
const server = require('../api/server.js');
const db = require("../database/dbConfig");

describe("Jokes-Router", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
  
    it("returns 200 status code for auth users", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Addy", password: "pass" })
        .then(() => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Addy", password: "pass" })
            .expect(200)
            .then(res => {
              const token = res.body.token;
  
              return request(server)
                .get("/api/jokes")
                .set("authorization", token)
                .expect(200);
            });
        });
    });
  
    it("returns correct content-type", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Addy", password: "pass" })
        .then(() => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Addy", password: "pass" })
            .expect(200)
            .then(res => {
              const token = res.body.token;
  
              return request(server)
                .get("/api/jokes")
                .set("authorization", token)
                .expect("Content-Type", /json/);
            });
        });
    });
  });