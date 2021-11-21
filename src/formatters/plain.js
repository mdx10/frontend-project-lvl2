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
        if (item.type === 'added') {
          return `Property '${parent}${item.key}' was added with value: ${iter(item.value)}`;
        }
        if (item.type === 'removed') {
          return `Property '${parent}${item.key}' was removed`;
        }
        if (item.type === 'updated') {
          return `Property '${parent}${item.key}' was updated. From ${iter(item.oldValue)} to ${iter(item.newValue)}`;
        }
        if (item.type === 'parent') {
          const parents = `${parent}${item.key}.`;
          return iter(item.value, parents);
        }
        return '';
      });

    return lines.join('\n');
  };

  return iter(data);
};

export default plain;
