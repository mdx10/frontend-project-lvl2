import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName) => {
  if (formatName === 'stylish') {
    return stylish;
  }
  if (formatName === 'plain') {
    return plain;
  }
  if (formatName === 'json') {
    return JSON.stringify;
  }
  throw new Error(`Format '${formatName}' is not supported.`);
};
