import { Meta, StoryObj } from '@storybook/react'
import Home from '../../pages'

const meta: Meta<typeof Home> = {
  component: Home,
}

export default meta
type Story = StoryObj<typeof Home>

export const HomePage: Story = {
  args: {},
}
