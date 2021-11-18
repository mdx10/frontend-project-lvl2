import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let fileDataJson;
let fileDataYml;
beforeAll(() => {
  fileDataJson = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
  fileDataYml = fs.readFileSync(getFixturePath('file1.yml'), 'utf-8');
});

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedObj = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('test1', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
test('test2', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
test('test3', () => {
  expect(parse(fileDataJson, '.json')).toEqual(expectedObj);
  expect(parse(fileDataYml, '.yml')).toEqual(expectedObj);
  expect(parse(fileDataYml, '.yaml')).toEqual(expectedObj);
  expect(() => parse(fileDataYml, '.ya')).toThrow("Extend '.ya' is not supported");
});
