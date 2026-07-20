import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CompanyHouse } from './company-house'

const meta = {
  title: 'ProjectsSection/CompanyHouse',
  component: CompanyHouse,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CompanyHouse>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 140, background: '#000', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}
