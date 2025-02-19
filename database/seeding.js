import { SeedMessages } from "./seeds/SeedMessages.js";
import { SeedUsers } from "./seeds/SeedUsers.js";


async function start() {
    const seedMessages = new SeedMessages()
    const seedUsers = new SeedUsers()
    await seedUsers.seed()
    await seedMessages.seed()
    
}

start()