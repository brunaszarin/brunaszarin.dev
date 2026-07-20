import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WorldStrip } from './world-strip'

const meta = {
  title: 'ProjectsSection/WorldStrip',
  component: WorldStrip,
  parameters: { layout: 'fullscreen' },
  args: {
    progress: 0.3,
  },
} satisfies Meta<typeof WorldStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Start: Story = {
  args: { progress: 0 },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
}

export const MidJourney: Story = {
  args: { progress: 0.5 },
  decorators: Start.decorators,
}

export const NearEnd: Story = {
  args: { progress: 0.85 },
  decorators: Start.decorators,
}
