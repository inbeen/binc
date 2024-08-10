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

const isKebabCase = (name) => /^[a-z]+(-[a-z]+)*$/.test(name);

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

const render = (name) => {
  const source = resolve(`./packages/${name}/package.ejs`);
  const target = resolve(`./packages/${name}/package.json`);
  renderFile(source, { name }, null, function (_, str) {
    writeFileSync(target, str);
    unlinkSync(source);
    console.log(chalk.green('Component create successfully!'));
  });
};

const generate = (name) => {
  const source = resolve('./packages/template');
  const target = resolve(`./packages/${name}`);
  copy(source, target)
    .then(() => render(name))
    .catch(() => {
      console.log(chalk.red('Failed to create due to copy error'));
    });
};

const interaction = () => {
  inquirer
    .prompt(questions)
    .then(async (answers) => {
      const { component: name } = answers;
      const dirs = await readdir(resolve(process.cwd(), 'packages'));
      if (!validate(name, dirs)) {
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
