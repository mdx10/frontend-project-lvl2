import * as fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileContent = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const fileData1 = JSON.parse(getFileContent(filepath1));
  const fileData2 = JSON.parse(getFileContent(filepath2));

  const keys = Object.keys({ ...fileData1, ...fileData2 }).sort();

  const result = keys
    .reduce((acc, key) => {
      if (!_.has(fileData1, key)) {
        return [...acc, `+ ${key}: ${fileData2[key]}`];
      }
      if (!_.has(fileData2, key)) {
        return [...acc, `- ${key}: ${fileData1[key]}`];
      }
      if (fileData1[key] !== fileData2[key]) {
        return [...acc, `- ${key}: ${fileData1[key]}`, `+ ${key}: ${fileData2[key]}`];
      }
      return [...acc, `  ${key}: ${fileData1[key]}`];
    }, []).join('\n  ');
  return `{\n  ${result}\n}`;
};

export default genDiff;
