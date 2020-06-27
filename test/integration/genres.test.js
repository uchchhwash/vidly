const mongoose = require("mongoose");
const request = require("supertest");
const { Genre } = require("../../models/genre");
let server;

describe("/api/genres", () => {
    beforeEach(() => {
        server = require("../../index");
    })
    afterEach(async() => {
        console.log("called")
        server.close();
        await Genre.remove({});
    })

    describe("GET /", () => {
        it("should return all genres", async() => {
            await Genre.collection.insertMany([{ name: "genre1" }, { name: "genre2" }]);
            const res = await request(server).get("/api/genres");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
            expect(res.body.some(g => g.name === "genre2")).toBeTruthy();
        });
    })

    describe("GET /:id", () => {
        it("return the request genre only", async() => {
            const genre = new Genre({ name: "genre1" });
            await genre.save();
            const res = await request(server).get("/api/genres/" + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
            expect(JSON.stringify(res.body)).toEqual(JSON.stringify(genre));

        });
    })

    describe("GET /:id", () => {
        it("should return 404 if invalid id is passed", async() => {
            const genre = new Genre({ name: "genre1" });
            await genre.save();
            const res = await request(server).get("/api/genres/" + 1);
            expect(res.status).toBe(404);
        });
    })
})