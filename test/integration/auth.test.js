const request = require("supertest");
const { User } = require("../../models/user");
let server;

describe("auth middleware", () => {
    beforeEach(() => {
        server = require("../../index");
    })
    afterEach(async() => {
        server.close();
    })
    it("should return 401 if no token is provided", async() => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post('/api/genres')
            .send({ name: "genre1" })
        expect(res.status).toBe(401);
    })
})