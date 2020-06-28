const request = require("supertest");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

describe("api/returns", () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    beforeEach(async() => {
        server = require("../../index");

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: "jacky florian",
                phone: "01711111111",
                email: "jacky@gmail.com"
            },
            movie: {
                _id: movieId,
                title: "Batman2",
                dailyRentalRate: 2
            }
        });
        await rental.save();
    })
    afterEach(async() => {
        await Rental.deleteMany({});
        await server.close();
    })

    it("should return 401 is client is not logged in", async() => {
        const res = await request(server)
            .post("/api/returns").send({ customerId, movieId })
            .send({ customerId, movieId });
        expect(res.status).toBe(401);
    })

    it("should return 400 is customerId is not provided", async() => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post("/api/returns").send({ customerId, movieId })
            .set("x-auth-token", token)
            .send({ movieId });
        expect(res.status).toBe(401);
    })
    it("should return 400 is movieId is not provided", async() => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post("/api/returns").send({ customerId, movieId })
            .set("x-auth-token", token)
            .send({ customerId });
        expect(res.status).toBe(401);
    })
})