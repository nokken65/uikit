import { globbySync } from 'globby';
import fs from 'node:fs';
import { dirname } from 'node:path';
import { promisify } from 'util';

import { packageMarker, srcPath } from './constants.mjs';

const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);
const rm = promisify(fs.rm);

const resolveNames = async () => {
  const found = globbySync(`${srcPath}/components/*/${packageMarker}`);
  const names = found.map((name) =>
    name
      .replace(`${srcPath}/`, '')
      .replace(`components/`, '')
      .replace(`/${packageMarker}`, ''),
  );

  return names;
};

const createCommonJsIndex = (names) => {
  const imports = names.sort().map((name) => {
    return `module.exports.${name} = require('./${name}/index.cjs.js').${name};`;
  });

  return imports.join('\n') + '\n';
};

const createMjsIndex = (names) => {
  const imports = names.sort().map((name) => {
    return `export { ${name} } from './${name}/index.es.js'`;
  });

  return imports.join('\n') + '\n';
};

const createTypingsIndex = (names) => {
  const types = names
    .sort()
    .map((name) => `export { ${name} } from './${name}';`);

  return types.join('\n') + '\n';
};

const createExportsMap = (names) => {
  const object = {};
  names.forEach((name) => {
    object[`./${name}/package.json`] = `./${name}/package.json`;
    object[`./${name}/style.css`] = `./${name}/style.css`;
    object[`./${name}`] = {
      require: `./${name}/index.cjs.js`,
      import: `./${name}/index.es.js`,
    };
  });

  return object;
};

const createDistribution = async (dir) => {
  return {
    write: async (path, content) => {
      const directory = dirname(`${dir}/${path}`);
      if (!(await exists(directory))) {
        await mkdir(directory, { recursive: true });
      }

      return writeFile(`${dir}/${path}`, content);
    },
    copyList: (source, list, fn = (i) => i) =>
      Promise.all(
        list.map((file) => copyFile(`${source}/${file}`, `${dir}/${fn(file)}`)),
      ),
  };
};

export {
  createCommonJsIndex,
  createDistribution,
  createExportsMap,
  createMjsIndex,
  createTypingsIndex,
  exists,
  resolveNames,
  rm,
  writeFile,
};
