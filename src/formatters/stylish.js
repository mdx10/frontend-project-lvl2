import _ from 'lodash';

const symbols = {
  added: '+ ',
  removed: '- ',
};

const getIndent = (depth, spaces = 4) => {
  const indentSize = depth * spaces;
  return ' '.repeat(indentSize);
};

const stringify = (currentValue, depth) => {
  if (!_.isPlainObject(currentValue)) return `${currentValue}`;
  const indent = getIndent(depth);
  const bracketIndent = indent.slice(0, -4);
  const lines = Object
    .entries(currentValue)
    .map(([key, value]) => `${indent}${key}: ${stringify(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (currentValue, depth) => {
    const indent = getIndent(depth);
    const indentForChaned = getIndent(depth).slice(0, -2);
    const lines = currentValue
      .flatMap((item) => {
        switch (item.type) {
          case 'nested':
            return `${indent}${item.key}: {\n${iter(item.children, depth + 1)}\n${indent}}`;
          case 'added':
          case 'removed':
            return `${indentForChaned}${symbols[item.type]}${item.key}: ${stringify(item.value, depth + 1)}`;
          case 'updated':
            return [
              `${indentForChaned}${symbols.removed}${item.key}: ${stringify(item.value, depth + 1)}`,
              `${indentForChaned}${symbols.added}${item.key}: ${stringify(item.newValue, depth + 1)}`,
            ];
          case 'unchange':
            return `${indent}${item.key}: ${stringify(item.value, depth + 1)}`;
          default:
            throw new Error(`Type ${item.type} is not supported!`);
        }
      });
    return lines.join('\n');
  };
  return `{\n${iter(data, 1)}\n}`;
};

export default stylish;
