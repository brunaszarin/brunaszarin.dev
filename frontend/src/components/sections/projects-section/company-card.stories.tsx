import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CompanyCard } from './company-card'
import type { Experience } from '@/data/experiences'

const mockExperience: Experience = {
  id: 'sudoaptcat',
  company: 'sudoaptcat Studio',
  role: 'Fullstack Developer',
  location: 'Remote',
  period: 'Jan 2024 – present',
  description: 'Building a pixel-art portfolio with a custom scroll-driven cat animation and a CRT terminal blog.',
  technologies: ['Next.js', 'TypeScript', 'CSS Modules'],
}

const meta = {
  title: 'ProjectsSection/CompanyCard',
  component: CompanyCard,
  parameters: { layout: 'centered' },
  args: {
    experience: mockExperience,
  },
} satisfies Meta<typeof CompanyCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongDescription: Story = {
  args: {
    experience: {
      ...mockExperience,
      description:
        'A much longer description to check how the card handles overflow text — testing wrapping behavior across multiple lines to make sure nothing breaks the pixel border layout.',
      technologies: ['Next.js', 'TypeScript', 'CSS Modules', 'React Query', 'Spring Boot', 'PostgreSQL'],
    },
  },
}
