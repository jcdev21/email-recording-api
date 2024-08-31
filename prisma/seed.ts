import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.createMany({
    data: [
      {
        email: 'admin@test.com',
        nickname: 'Admin',
        password: '$2b$10$Dq0BQUr8I6VL1fnbIxoZaO94ipX7SnyX4FEIEYd8Y6deolqGFQ74C' // qwerty123
      }
    ]
  });

  console.log(user);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
