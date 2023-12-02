import request from 'supertest'
import server from '../src/server'
import prisma from '../src/external/database/db'

describe('Register bike route', () => {
    beforeEach(async () => {
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.bike.deleteMany({})
    })

    it('registers a bike', async () => {
        await request(server)
            .post('/api/bikes')
            .send({
                name: 'caloi mountainbike',
                type: 'mountain bike',
                bodySize: 1234,
                maxLoad: 1234,
                rate: 100.0,
                description: 'My bike',
                ratings: 5,
                imageUrls: [],
                available: true,
                latitude: 0.0,
                longitude: 0.0
            })
            .expect(201)
            .then((res) => {
                expect(res.body.id).toBeDefined()
            })
    })
})