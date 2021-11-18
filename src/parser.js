import yaml from 'js-yaml';

export default (fileData, fileExtend) => {
  if (fileExtend === '.json') {
    return JSON.parse(fileData);
  }
  if (fileExtend === '.yml' || fileExtend === '.yaml') {
    return yaml.load(fileData);
  }
  throw new Error(`Extend '${fileExtend}' is not supported`);
};
