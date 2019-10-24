const request = require("supertest");
const { Genres } = require("../../models/genre");

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
  });
});
