import type { Meta, StoryObj } from '@storybook/react'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import NavBar from './index'

const meta: Meta<typeof NavBar> = {
  component: NavBar,
  tags: ['docsPage'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  parameters: {
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
    },
  },
}

export default meta
type Story = StoryObj<typeof NavBar>

export const SmallMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
export const LargeMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export const PC: Story = {}
