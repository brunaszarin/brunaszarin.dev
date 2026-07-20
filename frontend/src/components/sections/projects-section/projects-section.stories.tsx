import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProjectsSection } from './projects-section'

const meta = {
  title: 'Sections/ProjectsSection',
  component: ProjectsSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ProjectsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
