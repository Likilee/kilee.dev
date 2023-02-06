import type { Meta, StoryObj } from '@storybook/react'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import NavBar from './index'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
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

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
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
