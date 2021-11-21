import * as fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import parse from './parser.js';
import getFormatter from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileContent = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

const makeTreeDiff = (data1, data2) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  return keys
    .reduce((acc, key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return [
          ...acc,
          {
            key,
            value: makeTreeDiff(data1[key], data2[key]),
            type: 'parent',
          },
        ];
      }
      if (!_.has(data1, key)) {
        return [
          ...acc,
          {
            key,
            value: data2[key],
            type: 'added',
          },
        ];
      }
      if (!_.has(data2, key)) {
        return [
          ...acc,
          {
            key,
            value: data1[key],
            type: 'removed',
          },
        ];
      }
      if (data1[key] !== data2[key]) {
        return [
          ...acc,
          {
            key,
            oldValue: data1[key],
            newValue: data2[key],
            type: 'updated',
          },
        ];
      }
      return [
        ...acc,
        {
          key,
          value: data1[key],
          type: 'unchange',
        },
      ];
    }, []);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = parse(getFileContent(filepath1), path.extname(filepath1));
  const fileData2 = parse(getFileContent(filepath2), path.extname(filepath2));

  const format = getFormatter(formatName);

  return format(makeTreeDiff(fileData1, fileData2));
};

export default genDiff;
