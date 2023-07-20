import React from 'react';
import type { Preview } from '@storybook/react'
import '../styles/global.css'
import './base.css'
import { withThemeByClassName, withThemeByDataAttribute, withThemeFromJSXProvider } from "@storybook/addon-styling";
import { ThemeProvider } from 'next-themes';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}
export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'light'
  }),
  (Story) => (<ThemeProvider attribute="class"><Story /></ThemeProvider>)
];


export default preview
