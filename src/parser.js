import yaml from 'js-yaml';

export default (fileData, fileExtend) => {
  switch (fileExtend) {
    case 'json':
      return JSON.parse(fileData);
    case 'yml':
    case 'yaml':
      return yaml.load(fileData);
    default:
      throw new Error(`Extend '${fileExtend}' is not supported`);
  }
};
