import chalk from 'chalk';

import {
  addTailwindDirectives,
  generateFiles,
  installDependencies,
  setTailwindConfig,
} from '../lib/utils.js';
import { doWithSpinner, getCssPath } from '../lib/message-utils.js';

async function action() {
  const cssFilePath = await getCssPath();
  await doWithSpinner(
    addTailwindDirectives.bind(null, cssFilePath),
    'Adding Tailwind directives...',
    'Directives added succesfully!'
  );
  await doWithSpinner(
    installDependencies,
    'Installing dependencies...',
    'Dependencies installed succesfully!'
  );
  await doWithSpinner(
    generateFiles.bind(null, ['postcss', 'tailwind']),
    'Generating files...',
    'Files generated succesfully!'
  );
  await doWithSpinner(
    setTailwindConfig.bind(
      null,
      ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      true
    ),
    'Setting Tailwind config...',
    'Config set succesfully!'
  );
}

export default {
  name: chalk.blueBright('React ready ⚛️'),
  action,
};
