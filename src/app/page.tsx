import type { Project } from '@prisma/client'

import Image from 'next/image'

import { Hero } from '@/components/sections/Hero'
import { AboutHighlight } from '@/components/sections/AboutHighlight'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { BackgroundEditor } from '@/components/sections/BackgroundEditor'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Revalidate every hour

export default async function Home({ searchParams }: { searchParams?: { edit?: string } }) {
  const editMode = searchParams?.edit === '1'
  let design = null
  try {
    design = await prisma.designSetting.findFirst()
  } catch (e) {
    console.error('Failed to fetch design settings:', e)
  }

  const heroBackgroundEnabled = Boolean(design?.heroBackgroundEnabled && (design.heroBackgroundImage || '/hero-bg.jpg'))
  const heroBackgroundImage = design?.heroBackgroundImage || '/hero-bg.jpg'
  const projectsBackgroundEnabled = Boolean(
    design?.projectsBackgroundEnabled && (design.projectsBackgroundImage || '/hero-bg.jpg')
  )
  const projectsBackgroundImage = design?.projectsBackgroundImage || '/hero-bg.jpg'
  const aboutBackgroundEnabled = Boolean(design?.aboutBackgroundEnabled && (design.aboutBackgroundImage || '/hero-bg.jpg'))
  const aboutBackgroundImage = design?.aboutBackgroundImage || '/hero-bg.jpg'

  // Fetch hero
  let heroData = null
  try {
    heroData = await prisma.hero.findFirst()
  } catch (e) {
    console.error('Failed to fetch hero:', e)
  }

  // Fetch about
  let about = null
  try {
    about = await prisma.about.findFirst()
  } catch (e) {
    console.error('Failed to fetch about:', e)
  }

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

  // About fallback
  const bio =
    about?.bio ||
    'Data strategist with a background in product and analytics, translating complex data into clear decisions.'
  const philosophy =
    about?.philosophy || 'Simplicity is the ultimate sophistication. Clarity beats noise every time.'
  let experience: { year: string; role: string; company: string }[] = []
  if (about?.experience) {
    try {
      experience = JSON.parse(about.experience)
    } catch (e) {
      console.error('Failed to parse experience JSON', e)
    }
  }
  if (experience.length === 0) {
    experience = [
      { year: '2023 — Present', role: 'Senior Strategist', company: 'Tech Corp' },
      { year: '2021 — 2023', role: 'Product Manager', company: 'Startup Inc' },
      { year: '2019 — 2021', role: 'Data Analyst', company: 'Data Solutions' },
    ]
  }

  const headline = heroData?.headline || 'Data-Driven Strategist.'
  const subtext =
    heroData?.subtext ||
    'I bridge the gap between complex data and actionable business strategy. Building products that matter.'

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
          <Hero onDark={heroBackgroundEnabled} headline={headline} subtext={subtext} editable={editMode} />
          {editMode && (
            <div className="absolute top-4 right-4">
              <BackgroundEditor section="hero" image={design?.heroBackgroundImage || ''} enabled={heroBackgroundEnabled} />
            </div>
          )}
        </div>
      </section>

      <section className={`relative overflow-hidden ${aboutBackgroundEnabled ? '' : 'bg-white'}`}>
        {aboutBackgroundEnabled && (
          <>
            <Image
              src={aboutBackgroundImage}
              alt="About background"
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/90 to-white/95" />
          </>
        )}
        <div className="relative">
          <AboutHighlight bio={bio} philosophy={philosophy} experience={experience} editable={editMode} />
          {editMode && (
            <div className="absolute top-4 right-4">
              <BackgroundEditor section="about" image={design?.aboutBackgroundImage || ''} enabled={aboutBackgroundEnabled} />
            </div>
          )}
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
