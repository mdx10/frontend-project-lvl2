# GenDiff
[![Actions Status](https://github.com/mdx10/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/mdx10/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/mdx10/frontend-project-lvl2/workflows/Tests/badge.svg)](https://github.com/mdx10/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/339fb1210bdb96486853/maintainability)](https://codeclimate.com/github/mdx10/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/339fb1210bdb96486853/test_coverage)](https://codeclimate.com/github/mdx10/frontend-project-lvl2/test_coverage)

Compares two configuration files and shows a difference.

Installation
------------

```
clone this repo

make install
npm link
```

Usage
-----

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format: "stylish", "plain", "json" (default: "stylish")
  -h, --help           display help for command
```

```
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2, formatName);
console.log(diff);
```

### Example flat JSON
[![asciicast](https://asciinema.org/a/TLWszE7rqKW8xmRhfnyk3Qs54.svg)](https://asciinema.org/a/TLWszE7rqKW8xmRhfnyk3Qs54)

### Example flat YAML
[![asciicast](https://asciinema.org/a/7Co7ctfETU1BYeWxF8dhAvuaB.svg)](https://asciinema.org/a/7Co7ctfETU1BYeWxF8dhAvuaB)

### Example nested JSON 'stylish' format
[![asciicast](https://asciinema.org/a/h4KrbV0MZh5uHbKhSBghQbkfj.svg)](https://asciinema.org/a/h4KrbV0MZh5uHbKhSBghQbkfj)

### Example nested JSON 'plain' format
[![asciicast](https://asciinema.org/a/W0fsgAtJpL2PlGiWhOI1ybXKK.svg)](https://asciinema.org/a/W0fsgAtJpL2PlGiWhOI1ybXKK)

### Example nested JSON 'json' format
[![asciicast](https://asciinema.org/a/tIPVAXsxTRMEqDKIKm2iQ2Cyw.svg)](https://asciinema.org/a/tIPVAXsxTRMEqDKIKm2iQ2Cyw)