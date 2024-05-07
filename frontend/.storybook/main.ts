import type { StorybookConfig } from '@storybook/react-webpack5';
import path from "path";
import { Configuration } from 'webpack'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: Configuration) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      assets:path.resolve(__dirname, "../public/assets"),
      components: path.resolve(__dirname, '../src/components'),
      theme: path.resolve(__dirname, '../src/theme'),
      public: path.resolve(__dirname, '..', 'public'),
      utils: path.resolve(__dirname, '../src/utils'),
    }
    return config
  }
};
export default config;
