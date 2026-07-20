import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SpaceBackground } from './space-background'

const meta = {
  title: 'ProjectsSection/SpaceBackground',
  component: SpaceBackground,
  parameters: { layout: 'fullscreen' },
  args: {
    mouseOffset: { x: 0, y: 0 },
  },
} satisfies Meta<typeof SpaceBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '500px', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
}
