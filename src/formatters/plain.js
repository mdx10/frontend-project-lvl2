import _ from 'lodash';

const normalizeValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (currentValue, parent = '') => {
    const lines = currentValue
      .filter((item) => item.type !== 'unchange')
      .map((item) => {
        switch (item.type) {
          case 'nested': {
            return iter(item.children, `${parent}${item.key}.`);
          }
          case 'added':
            return `Property '${parent}${item.key}' was added with value: ${normalizeValue(item.value)}`;
          case 'removed':
            return `Property '${parent}${item.key}' was removed`;
          case 'updated':
            return `Property '${parent}${item.key}' was updated. From ${normalizeValue(item.value)} to ${normalizeValue(item.newValue)}`;
          default:
            throw new Error(`Type '${item.type}' is not supported!`);
        }
      });
    return lines.join('\n');
  };
  return iter(data);
};

export default plain;
