import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const TOTAL_USERS = 100_000;
const BATCH_SIZE = 5000;

function randomDateWithinDays(days: number): Date {
    const now = new Date();

    const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return faker.date.between({ from: past, to: now });
}

async function main() {
    console.log("Starting seed process...");

    const existingUsers = await prisma.user.count();

    if (existingUsers >= TOTAL_USERS) {
        console.log("Database already seeded.");
        return;
    }

    console.log(`Existing users: ${existingUsers}`);

    const remaining = TOTAL_USERS - existingUsers;
    console.log(`Creating ${remaining} users...`);

    for (let i = 0; i < remaining; i += BATCH_SIZE) {
        const users = [];

        for (let j = 0; j < BATCH_SIZE && i + j < remaining; j++) {
            const createdAt = randomDateWithinDays(30);

            const updatedAt = faker.date.between({
                from: createdAt,
                to: new Date(),
            });

            const isDeleted = Math.random() < 0.01;

            users.push({
                name: faker.person.fullName(),
                email: `${faker.internet.username()}_${Date.now()}_${i}_${j}@gmail.com`,
                createdAt,
                updatedAt,
                isDeleted,
            });

        }
        await prisma.user.createMany({
                data: users,
                skipDuplicates: true,
            });

            console.log(
                `Inserted ${Math.min(
                    i + BATCH_SIZE,
                    remaining
                )}/${remaining}`
            );

    }

    console.log("Seed completed successfully.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });