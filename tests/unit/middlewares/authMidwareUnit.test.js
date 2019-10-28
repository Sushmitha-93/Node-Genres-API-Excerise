const auth = require("../../../middlewares/auth");
const { Users } = require("../../../models/user");
const mongoose = require("mongoose");

describe("auth midware Unit Test", () => {
  it("should decode token and put it in req.user", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const token = new Users(user).generateJwtAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
