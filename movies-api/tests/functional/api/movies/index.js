import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;
const MovieId = 634649;
const deletedMovieId = 729648;
const newReview ={
  "author": "Yiming Hu",
  "content": "I like Agile Software Practice and its lecturer."
}

describe("Movies endpoint", () => {
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
      await Movie.deleteMany();
      await Movie.collection.insertMany(movies);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /api/movies ", () => {
    it("should return 20 movies and a status 200", () => {
      request(api)
      .get("/api/movies")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(20);
        });
    });
  });

  describe("GET /api/movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        request(api)
          .get(`/api/movies/${movies[0].id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", movies[0].title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(api)
          .get("/api/movies/9999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The resource you requested could not be found.",
          });
      });
    });
  });
  describe("GET /api/movies/tmdb/movies ", () => {
    it("should return movies and a status 200", (done) => {
      request(api)
        .get("/api/movies/tmdb/movies")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.ok;
          expect(res.body).to.be.a("object")
          done();
        });
    });
  });
  describe("GET /api/movies/tmdb/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        request(api)
          .get(`/api/movies/tmdb/${MovieId}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", currentMovieTitle);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(api)
        .get("/api/movies/999999")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect({
          success: false,
          status_code: 34,
          status_message: "The resource you requested could not be found.",
        });
    });
   });
  });
  describe("GET /movies/:id/reviews", () => {
    it("should return the matching movie's reviews", () => {
      request(api)
        .get(`/api/movies/${MovieId}/reviews`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
        });
    });
  });
  describe("POST /movies/:id/reviews", () => {
    describe("when the id is valid", () => {
    it("should add review successfully and the new review should be displayed", () => {
      request(api)
        .post(`/api/movies/${MovieId}/reviews`)
        .send(newReview)
        .expect(201)
        .then((res) => {
          expect(res.body).to.have.property("author","Yiming Hu");
          expect(res.body).to.have.property("content", "I like Agile Software Practice and its lecturer.");
        });
    });
  });
  describe("when the id is invalid", () => {
    it("should return the NOT found message", () => {
      request(api)
      .get("/api/movies/999999")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({
        success: false,
        status_code: 34,
        status_message: "The resource you requested could not be found.",
      });
  });
 });
});
describe("DELETE /movies/:id", () => {
  it("should remove movie and the status 200", () => {
    request(api)
      .delete(`/api/movies/${deletedMovieId}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
  });
  after(() => {
    request(api)
      .get("/api/movies")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(19);
      });
  });
});
});
