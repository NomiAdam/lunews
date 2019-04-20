#!/usr/bin/env node

/*
Since we have "bin" entry in package.json, we can just run npm install -g, and nntp comman will be available

Add this and run - npm install -g
to install nntp as node thingy

"preferGlobal": true,
  "bin": {
   "nntp": "./dist/Setup.js"
 }

Then just use - nntp - as command
*/

import chalk from 'chalk';
// @ts-ignore
import clear from 'clear';
import program from 'commander';
import {prompt} from 'inquirer';
import ProgressBar from './ProgressBar';

const Bar = new ProgressBar();

import schema from '../database/schema';
import seed from '../database/seed';

const initQuestions = [
    {
        name: 'init',
        type: 'confirm',
        message: 'Do you want to initialize application Y/N',
    },
];

const seedQuestions = [
    {
        name: 'seed',
        type: 'confirm',
        message: 'Do you want to seed a database tables Y/N',
    },
];

const createQuestions = [
    {
        name: 'create',
        type: 'confirm',
        message: 'Do you want to create a database tables Y/N',
    },
];

const dropQuestions = [
    {
        name: 'drop',
        type: 'confirm',
        message: 'Do you want to drop a database tables Y/N',
    },
];

program.version('0.0.1').description('NNTP Client setup wizard');

/**
 * Alias init - with this command we will be using it --- nntp init
 * Use nntp (or the given name) --help, for all commands
 */
program.command('initApplication')
    .alias('init')
    .description('Initialize application')
    .action(() => {
        clear();
        console.log(chalk.blue('Welcome to the Lunews setup wizard'));
        prompt(initQuestions).then(async (answer: any) => {
            if (answer.init) {

                Bar.init(schema.length, 'Creating tables');
                for (const Schema of schema) {
                    await new Schema().up();
                    Bar.tick();
                }
                console.log(chalk.grey('All Schemas created....'));

                for (const Seed of seed) {
                    await Seed.run();
                }
                console.log(chalk.grey('All Schemas seeded....'));

            } else {
                console.log(chalk.red('Aborting....'));
            }
        });
    });

program.command('createTables')
    .alias('create')
    .description('Create all database tables')
    .action(() => {
        clear();
        console.log(chalk.blue('Welcome to the table setup wizard'));
        prompt(createQuestions).then(async (answer: any) => {
            if (answer.create) {

                Bar.init(schema.length, 'Creating tables');
                for (const Schema of schema) {
                    await new Schema().up();
                    Bar.tick();
                }
                console.log(chalk.grey('All Schemas created....'));

            } else {
                console.log(chalk.red('Aborting....'));
            }
        });
    });

program.command('seedDatabase')
    .alias('seed')
    .description('Seed whole database')
    .action(() => {
        clear();
        console.log(chalk.blue('Welcome to the seed setup wizard'));
        prompt(seedQuestions).then(async (answer: any) => {
            if (answer.seed) {

                for (const Seed of seed) {
                    await Seed.run();
                }
                console.log(chalk.grey('All Schemas seeded....'));

            } else {
                console.log(chalk.red('Aborting....'));
            }
        });
    });

program.command('dropTables')
    .alias('drop')
    .description('Drop all database tables')
    .action(() => {
        clear();
        console.log(chalk.blue('Welcome to the table setup wizard'));
        prompt(dropQuestions).then(async (answer: any) => {
            if (answer.drop) {

                Bar.init(schema.length, 'Dropping tables');
                for (const Schema of schema) {
                    await new Schema().down();
                    Bar.tick();
                }
                console.log(chalk.grey('All Schemas dropped...'));

            } else {
                console.log(chalk.red('Aborting....'));
            }
        });
    });

program.parse(process.argv);
