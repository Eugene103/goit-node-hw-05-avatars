import mongoose from "mongoose";
import app from '../../app.js'
import "dotenv/config"
import request from "supertest"
import User from "../../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env

describe("test /api/users/login", () => {
    let server = null
    beforeAll(async () => {
        await mongoose.connect(TEST_DB_HOST);
        server = app.listen(PORT)
    });
    afterAll(async () => {
        await mongoose.connection.close();
        server.close()
    });
    afterEach(async () => {
        await User.deleteMany({})
    })
    test("test register with correctData", async () => {
        const regData = {
            email: "Eugene@gmal.com",
            password: "12456"
        };
        const { statusCode, body } = await request(app).post("/api/users/register").send(regData);
        expect(statusCode).toBe(201);
        expect(body.email).toBe(regData.email);
        expect(typeof body.subscription).toBe('string')
        const user = await User.findOne({ email: regData.email })
        expect(user.email).toBe(regData.email)
    })
    test("test login with correctData", async () => {
        const correctData = {
            email: "Eugene@gmal.com",
            password: "12456"
        };
        await request(app).post("/api/users/register").send(correctData);

        const { statusCode, body } = await request(app).post("/api/users/login").send(correctData);
        expect(statusCode).toBe(200);
        expect(typeof body.token).toBe('string');
        expect(typeof body.user).toBe('object');
        expect(body.user).toHaveProperty('email');
        expect(typeof body.user.email).toBe('string');
        expect(body.user).toHaveProperty('subscription');
        expect(typeof body.user.subscription).toBe('string')
    })
})