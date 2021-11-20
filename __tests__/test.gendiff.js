import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expected = readFile('result.txt');

test('test-json', () => {
  const filepath1 = getFixturePath('nested1.json');
  const filepath2 = getFixturePath('nested2.json');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
test('test-yaml', () => {
  const filepath1 = getFixturePath('nested1.yml');
  const filepath2 = getFixturePath('nested2.yaml');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
