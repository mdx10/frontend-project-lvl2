import _ from 'lodash';
import parse from './parser.js';
import getFormatter from './formatters/index.js';
import { getFileContent, getFileExtend } from './utils.js';

const makeTreeDiff = (data1, data2) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

  return keys
    .map((key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return {
          type: 'nested',
          key,
          value: null,
          children: makeTreeDiff(data1[key], data2[key]),
        };
      }
      if (!_.has(data1, key)) {
        return {
          type: 'added',
          key,
          value: data2[key],
        };
      }
      if (!_.has(data2, key)) {
        return {
          type: 'removed',
          key,
          value: data1[key],
        };
      }
      if (data1[key] !== data2[key]) {
        return {
          key,
          type: 'updated',
          value: data1[key],
          newValue: data2[key],
        };
      }
      return { type: 'unchange', key, value: data1[key] };
    });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = parse(getFileContent(filepath1), getFileExtend(filepath1));
  const fileData2 = parse(getFileContent(filepath2), getFileExtend(filepath2));

  const format = getFormatter(formatName);
  return format(makeTreeDiff(fileData1, fileData2));
};

export default genDiff;
