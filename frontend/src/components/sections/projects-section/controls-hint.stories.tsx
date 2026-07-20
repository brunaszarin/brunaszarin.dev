import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ControlsHint } from './controls-hint'

const meta = {
  title: 'ProjectsSection/ControlsHint',
  component: ControlsHint,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ControlsHint>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 300, height: 100, background: '#000' }}>
        <Story />
      </div>
    ),
  ],
}
