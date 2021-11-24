import _ from 'lodash';

const plain = (data) => {
  const iter = (currentValue, parent = '') => {
    if (!Array.isArray(currentValue)) {
      if (_.isObject(currentValue)) {
        return '[complex value]';
      }
      return _.isString(currentValue)
        ? `'${currentValue}'`
        : currentValue;
    }

    const lines = currentValue
      .filter((item) => item.type !== 'unchange')
      .map((item) => {
        switch (item.type) {
          case 'nested': {
            const path = `${parent}${item.key}.`;
            return iter(item.children, path);
          }
          case 'added':
            return `Property '${parent}${item.key}' was added with value: ${iter(item.value)}`;
          case 'removed':
            return `Property '${parent}${item.key}' was removed`;
          case 'updated':
            return `Property '${parent}${item.key}' was updated. From ${iter(item.value)} to ${iter(item.newValue)}`;
          default:
            throw new Error(`Type '${item.type}' is not supported!`);
        }
      });
    return lines.join('\n');
  };
  return iter(data);
};

export default plain;
