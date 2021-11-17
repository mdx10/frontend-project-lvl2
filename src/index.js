import * as fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);

const getFileContent = (fileName) => {
  const filePath = getFilePath(fileName);
  return fs.readFileSync(filePath, 'utf-8');
};

const genDiff = (file1, file2) => {
  const fileContent1 = getFileContent(file1);
  const fileContent2 = getFileContent(file2);
  const fileData1 = JSON.parse(fileContent1);
  const fileData2 = JSON.parse(fileContent2);

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
