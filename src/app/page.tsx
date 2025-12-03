import type { Project } from '@prisma/client'

import Image from 'next/image'

import { Hero } from '@/components/sections/Hero'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Fetch featured projects
  let projects: Project[] = []
  try {
    projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
      take: 4,
    })
  } catch (e) {
    console.error('Failed to fetch projects:', e)
  }

  // Fallback data if DB is empty or fails
  if (projects.length === 0) {
    projects = [
      {
        id: '1',
        slug: 'market-expansion',
        title: 'Market Expansion Strategy',
        description: 'A comprehensive strategy for entering the SEA market, resulting in 20% YoY growth.',
        tags: 'Strategy, Data, Growth',
        content: '',
        thumbnail: null,
        featured: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        slug: 'ai-customer-segmentation',
        title: 'AI Customer Segmentation',
        description: 'Using clustering algorithms to identify high-value customers and optimize marketing spend.',
        tags: 'AI, Python, Marketing',
        content: '',
        thumbnail: null,
        featured: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        slug: 'saas-pricing-model',
        title: 'SaaS Pricing Model Optimization',
        description: 'Redesigning the pricing tier structure based on usage data and competitor analysis.',
        tags: 'Product, Pricing, SaaS',
        content: '',
        thumbnail: null,
        featured: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src="/hero-bg.jpg"
        alt="Night bridge scene"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/85" />

      <div className="relative flex flex-col min-h-screen">
        <Hero />
        <ProjectGrid projects={projects} />
      </div>
    </div>
  )
}
