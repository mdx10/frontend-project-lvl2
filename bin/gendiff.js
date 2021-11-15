#!/usr/bin/env node
import { Command } from 'commander';

const programm = new Command();
programm
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
