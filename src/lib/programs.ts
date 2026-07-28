export type ProgramCategory = 'xc' | 'track' | 'band' | 'theater' | 'choir' | 'football' | 'basketball' | 'baseball' | 'softball' | 'soccer' | 'swim' | 'wrestling' | 'volleyball' | 'tennis' | 'golf'

export interface Program {
  slug: string
  school: string
  city: string
  mascot: string
  name: string           // e.g. "Cross Country"
  category: ProgramCategory
  description: string
  merchHref?: string
  sponsorGoal?: number   // monthly $ goal
  heroColor: string      // team color hex
  accentColor: string
  active: boolean
}

export const PROGRAMS: Program[] = [
  {
    slug: 'pvxc',
    school: 'Pleasant Valley High School',
    city: 'Anniston',
    mascot: 'Raiders',
    name: 'Cross Country',
    category: 'xc',
    description: 'The PV Raiders XC team trains in the hills of Calhoun County and competes across NE Alabama. 25% of every merch sale goes directly back to the program.',
    merchHref: '/merch/pvxc',
    sponsorGoal: 200,
    heroColor: '#8B0000',
    accentColor: '#FFD700',
    active: true,
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find(p => p.slug === slug)
}

export function getActivePrograms(): Program[] {
  return PROGRAMS.filter(p => p.active)
}
