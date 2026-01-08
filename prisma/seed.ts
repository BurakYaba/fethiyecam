import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10) // Change this password!
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fethiyecamtemizleme.com' },
    update: {},
    create: {
      email: 'admin@fethiyecamtemizleme.com',
      name: 'Admin',
      password: hashedPassword,
    },
  })

  console.log('Admin user created:', admin.email)
  console.log('Default password: admin123')
  console.log('⚠️  Please change the password after first login!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
