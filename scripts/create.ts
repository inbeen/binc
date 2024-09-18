import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { writeFileSync, unlinkSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { copy } from 'fs-extra';
import { resolve } from 'node:path';
import { renderFile } from 'ejs';
import { isKebabCase, kebab2Pascal } from './helpers/format';

const pkgList = [
  { from: 'package.ejs', to: 'package.json' },
  { from: 'src/components/index.ejs', to: 'src/components/index.tsx' },
  { from: 'src/hooks/use-logic.ejs', to: 'src/hooks/use-logic.ts' },
  { from: 'src/typings/index.ejs', to: 'src/typings/index.ts' },
  { from: 'src/index.ejs', to: 'src/index.ts' }
];

const storyList = [
  { from: 'Demo.ejs', to: 'Demo.mdx' },
  { from: 'Demo.stories.ejs', to: 'Demo.stories.tsx' },
  { from: 'Test.ejs', to: 'Test.tsx' }
];

const preserveNames = ['guide'];

const validate = (name: string, dirs: string[]) => {
  // duplicate
  if (dirs.includes(name)) {
    console.log(chalk.red(`'${name}' already exists, please enter again.`));
    return false;
  }
  if (!isKebabCase(name)) {
    console.log(chalk.red('Incorrect format. (eg. xx-xxx)'));
    return false;
  }
  return true;
};

const renderPkg = (name: string, comp: string) => {
  Promise.all(
    pkgList.map(
      (pkg) =>
        new Promise((res) => {
          const source = resolve(`./packages/${name}/${pkg.from}`);
          const target = resolve(`./packages/${name}/${pkg.to}`);
          renderFile(source, { name, component: comp }, {}, function (_, str) {
            writeFileSync(target, str);
            unlinkSync(source);
            res(undefined);
          });
        })
    )
  ).then(() => {
    console.log(chalk.green('Component create package successfully!'));
  });
};

const renderStory = (name: string, comp: string) => {
  Promise.all(
    storyList.map(
      (story) =>
        new Promise((res) => {
          const source = resolve(`./stories/${comp}/${story.from}`);
          const target = resolve(`./stories/${comp}/${story.to.replace('Demo', comp)}`);
          renderFile(source, { name, component: comp }, {}, function (_, str) {
            writeFileSync(target, str);
            unlinkSync(source);
            res(undefined);
          });
        })
    )
  ).then(() => {
    console.log(chalk.green('Component create story successfully!'));
  });
};

const generate = (name: string) => {
  const comp = kebab2Pascal(name);
  const sourcePkg = resolve('./templates/package');
  const targetPkg = resolve(`./packages/${name}`);
  copy(sourcePkg, targetPkg)
    .then(() => renderPkg(name, comp))
    .catch(() => {
      console.log(chalk.red('Failed to create due to copy package error'));
    });

  const sourceStory = resolve('./templates/story');
  const targetStory = resolve(`./stories/${comp}`);
  copy(sourceStory, targetStory)
    .then(() => renderStory(name, comp))
    .catch(() => {
      console.log(chalk.red('Failed to create due to copy story error'));
    });
};

const interaction = () => {
  input({
    message: 'Please enter the name of component. (eg. xx-xxx)',
    required: true
  })
    .then(async (name: string) => {
      const dirs = await readdir(resolve(process.cwd(), 'packages'));
      if (!validate(name, dirs.concat(preserveNames))) {
        interaction();
        return;
      }
      generate(name);
    })
    .catch(() => {});
};

console.log(chalk.green('=== New component ==='));
interaction();
