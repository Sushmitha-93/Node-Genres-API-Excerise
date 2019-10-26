const { Users } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("User.genrateJwtAuthToken", () => {
  it("should return a valid JWT token", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const user = new Users(payload);

    const JWTToken = user.generateJwtAuthToken();

    const decoded = jwt.verify(JWTToken, config.get("jwtPrivateKey"));

    expect(decoded).toMatchObject(payload);
  });
});
