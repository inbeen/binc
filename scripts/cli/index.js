#!/usr/bin/env node
import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { writeFileSync, unlinkSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { copy } from 'fs-extra';
import { resolve } from 'node:path';
import { renderFile } from 'ejs';

const questions = [
  {
    type: 'input',
    name: 'component',
    message: 'Please enter the name of component. (eg. xx-xxx)',
    default() {
      return 'input';
    }
  }
];

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

const isKebabCase = (name) => /^[a-z]+(-[a-z]+)*$/.test(name);

const kebab2Pascal = (name) =>
  name
    .split('-')
    .map((s) => s.replace(/\b[a-z]/g, (match) => match.toUpperCase()))
    .join('');

const validate = (name, dirs) => {
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

const renderPkg = (name, comp) => {
  Promise.all(
    pkgList.map(
      (pkg) =>
        new Promise((res) => {
          const source = resolve(`./packages/${name}/${pkg.from}`);
          const target = resolve(`./packages/${name}/${pkg.to}`);
          renderFile(source, { name, component: comp }, null, function (_, str) {
            writeFileSync(target, str);
            unlinkSync(source);
            res();
          });
        })
    )
  ).then(() => {
    console.log(chalk.green('Component create package successfully!'));
  });
};

const renderStory = (name, comp) => {
  Promise.all(
    storyList.map(
      (story) =>
        new Promise((res) => {
          const source = resolve(`./stories/${comp}/${story.from}`);
          const target = resolve(`./stories/${comp}/${story.to.replace('Demo', comp)}`);
          renderFile(source, { name, component: comp }, null, function (_, str) {
            writeFileSync(target, str);
            unlinkSync(source);
            res();
          });
        })
    )
  ).then(() => {
    console.log(chalk.green('Component create story successfully!'));
  });
};

const generate = (name) => {
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
  inquirer
    .prompt(questions)
    .then(async (answers) => {
      const { component: name } = answers;
      const dirs = await readdir(resolve(process.cwd(), 'packages'));
      if (!validate(name, dirs.concat(preserveNames))) {
        interaction();
        return;
      }
      generate(name);
    })
    .catch(() => {});
};

program
  .command('create')
  .description('New component')
  .action(() => {
    interaction();
  });

program.parse(process.argv);
