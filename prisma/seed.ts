import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. Create Admin User
  const passwordHash = await hash('admin123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash,
    },
  })
  console.log({ user })

  // 2. Create Hero Section
  const hero = await prisma.hero.create({
    data: {
      headline: 'Data-Driven Strategist.',
      subtext: 'I bridge the gap between complex data and actionable business strategy.',
    },
  })
  console.log({ hero })

  // 3. Create About Section
  const about = await prisma.about.create({
    data: {
      bio: "I am a strategist with a background in data science and product management. I help companies make better decisions by leveraging data.",
      philosophy: "Simplicity is the ultimate sophistication.",
      experience: JSON.stringify([
        { year: '2023', role: 'Senior Strategist', company: 'Tech Corp' },
        { year: '2021', role: 'Product Manager', company: 'Startup Inc' },
      ]),
    },
  })
  console.log({ about })

  // 4. Create Projects
  const project1 = await prisma.project.create({
    data: {
      slug: 'market-expansion-strategy',
      title: 'Market Expansion Strategy',
      description: 'A comprehensive strategy for entering the SEA market.',
      tags: 'Strategy, Data, Growth',
      content: '## Problem\nThe client wanted to expand...\n\n## Approach\nWe analyzed...\n\n## Results\n- 20% growth\n- 5M revenue',
      featured: true,
      order: 1,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      slug: 'ai-customer-segmentation',
      title: 'AI Customer Segmentation',
      description: 'Using clustering algorithms to identify high-value customers.',
      tags: 'AI, Python, Marketing',
      content: '## Problem\nInefficient marketing spend...\n\n## Approach\nK-Means clustering...\n\n## Results\n- 15% increase in ROI',
      featured: true,
      order: 2,
    },
  })
  console.log({ project1, project2 })

  // 5. Social Links
  await prisma.socialLink.createMany({
    data: [
      { platform: 'LinkedIn', url: 'https://linkedin.com' },
      { platform: 'GitHub', url: 'https://github.com' },
      { platform: 'Email', url: 'mailto:hello@example.com' },
    ],
  })
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
