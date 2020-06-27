const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const { expectCt } = require("helmet");

describe("user.generateAuthToken", () => {
    it("should return valid JWT", () => {
        const user = new User({ _id: 1, isAdmin: true });
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        expectCt(decoded).toMatchObject({ _id: 1, isAdmin: true })
    })
})