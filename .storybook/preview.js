import '../styles/global.css'
import './base.css'
import { WithTheme, withTheme, withThemeProvider } from './withTheme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape
      items: [
        { value: 'light', title: 'Light', right: '✨' },
        { value: 'dark', title: 'Dark', right: '🕶️' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
}

export const decorators = [withTheme]
