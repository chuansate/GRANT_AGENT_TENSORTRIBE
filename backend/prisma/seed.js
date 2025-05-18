const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seedUsers() {
  const usersPath = path.resolve(process.cwd(), "prisma/seed/seedUsers.json");
  const usersData = await fs.readFile(usersPath, "utf-8");
  const users = JSON.parse(usersData);

  if (!Array.isArray(users) || users.length === 0) {
    console.warn("No users found to seed.");
    return;
  }

  for (const user of users) {
    // Hash the password before upsert
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Prepare user data with hashed password
    const userData = {
      ...user,
      password: hashedPassword, // Assuming your Prisma model uses `password` field, adjust if needed
    };

    await prisma.user.upsert({
      where: { email: user.email },
      update: {}, // No update for now, or you can customize if needed
      create: userData,
    });
  }

  console.log(`${users.length} users seeded!`);
}

async function main() {
  await seedUsers();
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
