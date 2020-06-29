const moment = require("moment");
const request = require("supertest");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

describe("api/returns", () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    beforeEach(async() => {
        server = require("../../index");

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();

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

    const exec = () => {
        return request(server)
            .post("/api/returns")
            .set("x-auth-token", token)
            .send({ customerId, movieId });
    }

    it("should return 401 if client is not logged in", async() => {
        token = "";
        const res = await exec();
        expect(res.status).toBe(401);
    })

    it("should return 400 if customerId is not provided", async() => {
        customerId = "";
        const res = await exec();
        expect(res.status).toBe(400);
    })
    it("should return 400 if movieId is not provided", async() => {
        movieId = "";
        const res = await exec();
        expect(res.status).toBe(400);
    })
    it("should return 400 if no rental found for considered customer/movie", async() => {
        await Rental.remove({});
        const res = await exec();
        expect(res.status).toBe(404);
    })
    it("should return 400 if return is already processed", async() => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400);
    })
    it("should return 200 if its valid request", async() => {
        const res = await exec();
        expect(res.status).toBe(200);
    })
    it("should return 200 if its valid request", async() => {
        const res = await exec();
        const rentalInDb = await Rental.findById(rental._id)
        const diff = new Date() - rentalInDb.dateReturned;
        expect(diff).toBeLessThan(10 * 1000);
        expect(rentalInDb.dateReturned).toBeDefined();

    })
    it("should set the rental fee if input is valid", async() => {
        rental.dateOut = moment().add(-7, "days").toDate();
        await rental.save();

        const res = await exec();
        const rentalInDb = await Rental.findById(rental._id)
        const fee = (moment(rentalInDb.dateReturned)).diff((moment(rentalInDb.dateOut)), "days") * rentalInDb.movie.dailyRentalRate;
        console.log(fee)
        expect(fee).toBe(14);
    })
})