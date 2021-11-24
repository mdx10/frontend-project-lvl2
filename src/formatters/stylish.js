import _ from 'lodash';

const stylish = (data) => {
  const iter = (currentValue, depth) => {
    if (!Array.isArray(currentValue)) {
      return _.isObject(currentValue)
        ? iter([currentValue], depth)
        : currentValue;
    }

    const indentSize = depth * 2;
    const indent = '  '.repeat(indentSize);
    const indentForChaned = '  '.repeat(indentSize - 1);
    const bracketIndent = '  '.repeat(indentSize - 2);

    const lines = currentValue
      .flatMap((item) => {
        switch (item.type) {
          case 'nested':
            return `${indent}${item.key}: ${iter(item.children, depth + 1)}`;
          case 'added':
            return `${indentForChaned}+ ${item.key}: ${iter(item.value, depth + 1)}`;
          case 'removed':
            return `${indentForChaned}- ${item.key}: ${iter(item.value, depth + 1)}`;
          case 'updated':
            return [
              `${indentForChaned}- ${item.key}: ${iter(item.value, depth + 1)}`,
              `${indentForChaned}+ ${item.key}: ${iter(item.newValue, depth + 1)}`,
            ];
          case 'unchange':
            return `${indent}${item.key}: ${iter(item.value, depth + 1)}`;
          default:
            return Object
              .entries(item)
              .map(([key, value]) => `${indent}${key}: ${iter(value, depth + 1)}`);
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};

export default stylish;
