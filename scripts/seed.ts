const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.categoery.createMany({
      data: [
        { name: "Development" },
        { name: "Business" },
        { name: "Finance" },
        { name: "Design" },
        { name: "Marketing" },
        { name: "Health" },
        { name: "Music" },
        { name: "Teaching" },
      ],
    });
    console.log("success seeding the database category");
  } catch (error) {
    console.log("Error seeding the database category", error);
  } finally {
    await database.$disconnect();
  }
}
main()