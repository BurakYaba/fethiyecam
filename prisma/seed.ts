import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10); // Change this password!

  const admin = await prisma.user.upsert({
    where: { email: "admin@fethiyecamtemizleme.com" },
    update: {},
    create: {
      email: "admin@fethiyecamtemizleme.com",
      name: "Admin",
      password: hashedPassword,
    },
  });

  console.log("Admin user created:", admin.email);
  console.log("Default password: admin123");
  console.log("⚠️  Please change the password after first login!");

  // Create SEO-related site settings
  const seoSettings = [
    {
      key: "seo.defaultOgImage",
      value: "/og-default.jpg",
      type: "image",
      group: "seo",
    },
    {
      key: "seo.twitterHandle",
      value: "@fethiyecam",
      type: "text",
      group: "seo",
    },
    {
      key: "seo.businessHours",
      value: "Pazartesi-Cumartesi: 08:00-18:00",
      type: "text",
      group: "seo",
    },
    {
      key: "seo.foundingDate",
      value: "2020-01-01",
      type: "text",
      group: "seo",
    },
    {
      key: "seo.priceRange",
      value: "₺₺",
      type: "text",
      group: "seo",
    },
    // Contact settings
    {
      key: "footer.phone",
      value: "+905301207848",
      type: "text",
      group: "footer",
    },
    {
      key: "footer.email",
      value: "info@fethiyecam.com",
      type: "text",
      group: "footer",
    },
    {
      key: "footer.address",
      value: "Tuzla, İnönü Blv. No:1/1 EA\n48300 Fethiye/Muğla",
      type: "text",
      group: "footer",
    },
  ];

  for (const setting of seoSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log("SEO settings created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
