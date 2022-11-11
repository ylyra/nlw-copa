import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john.doe@gmail.com",
        avatarUrl: "https://github.com/github.png",
      },
    });

    const pool = await prisma.pool.create({
      data: {
        title: "My first pool",
        code: "123456",
        ownerId: user.id,

        participants: {
          create: {
            userId: user.id,
          },
        },
      },
    });

    await prisma.game.create({
      data: {
        date: "2022-11-06T21:10:54.180Z",
        firstTeamCountryCode: "BR",
        secondTeamCountryCode: "DE",
      },
    });

    await prisma.game.create({
      data: {
        date: "2022-11-12T21:10:54.180Z",
        firstTeamCountryCode: "BR",
        secondTeamCountryCode: "FR",

        guesses: {
          create: {
            firstTeamPoints: 2,
            secondTeamPoints: 1,

            participant: {
              connect: {
                userId_poolId: {
                  poolId: pool.id,
                  userId: user.id,
                },
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    await prisma.participant.deleteMany();
    await prisma.pool.deleteMany();
    await prisma.user.deleteMany();
    await prisma.game.deleteMany();
  }
}

main();
