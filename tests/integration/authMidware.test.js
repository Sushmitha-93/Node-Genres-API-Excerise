const request = require("supertest");

let server;

describe("Testing Authentication middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });

  it("should return 401 if JWT token is absent", async () => {
    //send request to an endpoint that requires authorization ex. post to genres
    const res = await request(server)
      .post("/api/genres")
      .send();

    expect(res.status).toBe(401);
  });

  it("should return 400 if the token is invalid", async () => {
    const res = await request(server)
      .post("/api/genres")
      .set("x-jwttoken", "invalid token")
      .send();

    expect(res.status).toBe(400);
  });
});
