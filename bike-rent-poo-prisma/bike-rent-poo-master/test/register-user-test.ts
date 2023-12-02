import request from "supertest";
import server from "../src/server";
import prisma from "../src/external/database/db";

describe("Register User Route", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany()
    })

    afterAll(async() => {
        await prisma.user.deleteMany()
        await prisma.$disconnect()
    })

    it('Register a user with valid data', async () => {
        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe@email.com',
                passaword: 'lvalidPassword'
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })

    it('Returns 400 when trying to register duplicate user', async () => {
        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe@email.com',
                passaword: 'lvalidPassword'
            })
        await request(server)
            .post('/api/users')
            .send({
                name: 'Joe Doe',
                email: 'joe@email.com',
                passaword: 'lvalidPassword'
            })
        .expect(400)
        
    })
})