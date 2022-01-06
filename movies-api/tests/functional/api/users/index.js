import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";

const expect = chai.expect;
let db;
let user1token;

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      await User.deleteMany();
      // Register two users
      await request(api).post("/api/users?action=register").send({
        username: "user1",
        password: "test1",
      });
      await request(api).post("/api/users?action=register").send({
        username: "user2",
        password: "test2",
      });
    } catch (err) {
      console.error(`failed to Load user test Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
  });
  describe("GET /api/users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST /api/users ", () => {
    describe("For a register action", () => {
      describe("when the payload is correct", () => {
        it("should return a 201 status and the confirmation message", () => {
          return request(api)
            .post("/api/users?action=register")
            .send({
              username: "user3",
              password: "test3",
            })
            .expect(201)
            .expect({ success: true, msg: "Successful created new user." });
        });
        after(() => {
          return request(api)
            .get("/api/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
              expect(res.body.length).to.equal(3);
              const result = res.body.map((user) => user.username);
              expect(result).to.have.members(["user1", "user2", "user3"]);
            });
        });
      });
    });
    describe("For an authenticate action", () => {
      describe("when the payload is correct", () => {
        it("should return a 200 status and a generated token", () => {
          return request(api)
            .post("/api/users?action=authenticate")
            .send({
              username: "user1",
              password: "test1",
            })
            .expect(200)
            .then((res) => {
              expect(res.body.success).to.be.true;
              expect(res.body.token).to.not.be.undefined;
              user1token = res.body.token.substring(7);
            });
        });
      });
    });
  });
  describe("GET /api/users/username/favourites ", () => {
    it("should return the  favourites movies and a status 201", () => {
      request(api)
        .get(`/api/users/user1/favourites`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(0);
        });
    });
  })
  describe("POST /users/username/favourites ", () => {
    it("should the vaild movie id and a status 201", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "634649"
        })
        .expect(201);
    });

    it("should return wrong movie id and a status 401 ", () => {
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "999999",
        });
      request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: "999999",
        })
        .expect(401);
    });
    describe("GET /api/users/username/mustWatch ", () => {
      it("should return the  mustWatch movies and a status 201", () => {
        request(api)
          .get(`/api/users/user1/mustWatch`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.be.a("array");
            expect(res.body.length).to.equal(0);
          });
      });
    })
    describe("POST /users/username/mustWatch ", () => {
      it("should the vaild movie id and a status 201", () => {
        request(api)
          .post(`/api/users/user1/mustWatch`)
          .send({
            id: "634649"
          })
          .expect(201);
      });
  
      it("should return wrong movie id and a status 401 ", () => {
        request(api)
          .post(`/api/users/user1/mustWatch`)
          .send({
            id: "999999",
          });
        request(api)
          .post(`/api/users/user1/mustWatch`)
          .send({
            id: "999999",
          })
          .expect(401);
      });
    })
  })
});
