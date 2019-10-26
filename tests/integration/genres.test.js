const request = require("supertest");
const { Genres } = require("../../models/genre");
const { Users } = require("../../models/user");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
    //await Genres.remove();
  });
  afterEach(async () => {
    server.close();
    await Genres.remove();
  });

  // api/genres
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genres.insertMany([{ name: "genre1" }, { name: "genre2" }]);

      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
      expect(res.body.some(g => g.name === "genre2")).toBeTruthy();
    });
  });

  // api/genres/genreId
  describe("GET /:id", () => {
    it("should return a valid genre if ID is passed", async () => {
      const genre = new Genres({ name: "genre1" });
      genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid ID is passed", async () => {
      const res = await request(server).get("/api/genres/123");

      expect(res.status).toBe(404);
    });
  });

  // Post api/genres/id
  describe("POST /", () => {
    it("should return 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "Action" });

      expect(res.status).toBe(401);
    });

    it("should return 403 if user does not have admin privelege", async () => {
      const token = new Users().generateJwtAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-jwttoken", token)
        .send({ name: "Action" });

      expect(res.status).toBe(403);
    });

    it("should return 400 if genre name is less than 3 (Joi validation fails)", async () => {
      const token = new Users({ isAdmin: true }).generateJwtAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-jwttoken", token)
        .send({ name: "12" });

      expect(res.status).toBe(400);
    });

    it("should return 400 if genre name is more than 25 (Joi validation fails)", async () => {
      const token = new Users({ isAdmin: true }).generateJwtAuthToken();
      const genre = new Array(27).join("a");

      const res = await request(server)
        .post("/api/genres")
        .set("x-jwttoken", token)
        .send({ name: genre });

      expect(res.status).toBe(400);
    });

    it("should save genre if it is valid", async () => {
      const token = new Users({ isAdmin: true }).generateJwtAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-jwttoken", token)
        .send({ name: "Action" });

      const genre = await Genres.find({ name: "Action" });

      expect(genre).not.toBeNull();
    });

    it("should return genre in the response body if it is valid", async () => {
      const token = new Users({ isAdmin: true }).generateJwtAuthToken();

      const res = await request(server)
        .post("/api/genres")
        .set("x-jwttoken", token)
        .send({ name: "Action" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "Action");
    });
  });
});
