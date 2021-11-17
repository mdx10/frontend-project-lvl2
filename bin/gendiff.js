#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const programm = new Command();
programm
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)))
  .parse(process.argv);
