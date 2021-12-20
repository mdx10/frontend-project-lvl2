import * as fs from 'fs';
import path from 'path';
import process from 'process';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileContent = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFileExtend = (filepath) => path.extname(filepath).slice(1);

export { getFileContent, getFileExtend };
