import { globbySync } from "globby";
import { packageMarker, srcPath } from "./constants.mjs";
import { promisify } from "util";
import { dirname } from "node:path";
import fs from "node:fs";

const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);
const rm = promisify(fs.rm);

const resolveNames = async () => {
  const found = globbySync(`${srcPath}/*/${packageMarker}`);
  const names = found.map((name) =>
    name.replace(`/${packageMarker}`, "").replace(`${srcPath}/`, "")
  );
  return names;
};

const createCommonJsIndex = (names) => {
  const imports = names.sort().map((name) => {
    return `module.exports.${name} = require('./${name}/index.cjs.js').${name};`;
  });

  return imports.join("\n") + "\n";
};

const createMjsIndex = (names) => {
  const imports = names.sort().map((name) => {
    return `export { ${name} } from './${name}/index.es.js'`;
  });

  return imports.join("\n") + "\n";
};

const createTypingsIndex = (names) => {
  const types = names
    .sort()
    .map((name) => `export { ${name} } from './${name}';`);

  return types.join("\n") + "\n";
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
        list.map((file) => copyFile(`${source}/${file}`, `${dir}/${fn(file)}`))
      ),
  };
};

export {
  rm,
  exists,
  writeFile,
  resolveNames,
  createCommonJsIndex,
  createMjsIndex,
  createTypingsIndex,
  createExportsMap,
  createDistribution,
};
