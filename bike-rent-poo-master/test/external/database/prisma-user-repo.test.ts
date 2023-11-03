import { PrismaUserRepo } from "../../../src/external/database/prisma-user-repo"
import { User } from "../../../src/user"
import prisma from "../../../src/external/database/db"
import { Bike } from "../../../src/bike"
import { PrismaBikeRepo } from "../../../src/external/database/prisma-bike-repo"

describe('PrismaUserRepo', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
    })

    afterAll(async () => {
        await prisma.user.deleteMany({})
        await prisma.bike.deleteMany({})
    })

    // USER

    it('adds a user in the database', async () => {
        const userToBePersisted = new User(
            'test user',
            'test@mail.com',
            '1234'
        )
        const repo = new PrismaUserRepo()
        const userId = await repo.add(userToBePersisted)
        expect(userId).toBeDefined()
        const persistedUser = await repo.find(userToBePersisted.email)
        expect(persistedUser.name).toEqual(
            userToBePersisted.name
        )
    })

    it('removes a user from the database', async () => {
        const userToBePersisted = new User(
            'test user',
            'test@mail.com',
            '1234'
        )
        const repo = new PrismaUserRepo()
        await repo.add(userToBePersisted)
        await repo.remove('test@mail.com')
        const removedUser = await repo.find('test@mail.com')
        expect(removedUser).toBeNull()
    })

    it('lists users in the database', async () => {
        const user1 = new User('user1', 'user1@mail.com', '1234')
        const user2 = new User('user2', 'user2@mail.com', '1234')
        const repo = new PrismaUserRepo()
        await repo.add(user1)
        await repo.add(user2)
        const userList = await repo.list()
        expect(userList.length).toEqual(2)
    })

    // BIKE

    it('adds a bike in the database', async () => {
        const bikeToPersisted = new Bike(
            'caloi mountainbike',
            'mountain bike',
            1234,
            1234,
            100.0,
            'My bike',
            5
        )
        const repo = new PrismaBikeRepo()
        const bikeId = await repo.add(bikeToPersisted)
        expect(bikeId).toBeDefined()
        const persistedBike = await repo.find(bikeToPersisted.id)
        expect(persistedBike.name).toEqual(
            bikeToPersisted.name
        )
    })

    it('remove a bike in the database', async () => {
        const bikeToPersisted = new Bike(
            'caloi mountainbike',
            'mountain bike',
            1234,
            1234,
            100.0,
            'My bike',
            5
        )
        const repo = new PrismaBikeRepo()
        const id = await repo.add(bikeToPersisted)
        await repo.remove(id)
        const removedBike = await repo.find(id)
        expect(removedBike).toBeNull()
    })

    it('lists bikes in the database', async () => {
        const bike1 = new Bike(
            'caloi mountainbike',
            'mountain bike',
            1234,
            1234,
            100.0,
            'My bike',
            5
        )
        const bike2 = new Bike(
            'caloi mountainbike',
            'mountain bike',
            1234,
            1234,
            100.0,
            'My bike',
            5
        )
        const repo = new PrismaBikeRepo()
        await repo.add(bike1)
        await repo.add(bike2)
        const bikeList = await repo.list()
        expect(bikeList.length).toEqual(2)
    })
})