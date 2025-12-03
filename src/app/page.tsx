import type { Project } from '@prisma/client'

import Image from 'next/image'

import { Hero } from '@/components/sections/Hero'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const design = await prisma.designSetting.findFirst()

  const heroBackgroundEnabled = Boolean(design?.heroBackgroundEnabled && (design.heroBackgroundImage || '/hero-bg.jpg'))
  const heroBackgroundImage = design?.heroBackgroundImage || '/hero-bg.jpg'
  const projectsBackgroundEnabled = Boolean(
    design?.projectsBackgroundEnabled && (design.projectsBackgroundImage || '/hero-bg.jpg')
  )
  const projectsBackgroundImage = design?.projectsBackgroundImage || '/hero-bg.jpg'

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
    <div className="flex flex-col min-h-screen bg-white text-black">
      <section className={`relative overflow-hidden ${heroBackgroundEnabled ? '' : 'bg-white'}`}>
        {heroBackgroundEnabled && (
          <>
            <Image
              src={heroBackgroundImage}
              alt="Hero background"
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/80" />
          </>
        )}
        <div className="relative">
          <Hero onDark={heroBackgroundEnabled} />
        </div>
      </section>

      <section className={`relative overflow-hidden ${projectsBackgroundEnabled ? '' : 'bg-white'}`}>
        {projectsBackgroundEnabled && (
          <>
            <Image
              src={projectsBackgroundImage}
              alt="Projects background"
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/85" />
          </>
        )}
        <div className="relative">
          <ProjectGrid projects={projects} onDark={projectsBackgroundEnabled} />
        </div>
      </section>
    </div>
  )
}
