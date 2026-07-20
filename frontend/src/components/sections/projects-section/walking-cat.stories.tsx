import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WalkingCat } from './walking-cat'

const meta = {
  title: 'ProjectsSection/WalkingCat',
  component: WalkingCat,
  parameters: { layout: 'centered' },
  args: {
    isWalking: false,
    facingLeft: false,
  },
} satisfies Meta<typeof WalkingCat>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Walking: Story = {
  args: { isWalking: true },
}

export const WalkingFacingLeft: Story = {
  args: { isWalking: true, facingLeft: true },
}
