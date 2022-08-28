import packageJson from "./source.package.js";
import {
  createCommonJsIndex,
  createDistribution,
  createExportsMap,
  createMjsIndex,
  createTypingsIndex,
  resolveNames,
} from "./utils.mjs";

const buildIndex = async () => {
  const pkg = packageJson();
  const directory = await createDistribution("./dist");

  const names = await resolveNames();

  pkg.exports = {
    "./package.json": "./package.json",
    "./style.css": "./style.css",
    ".": {
      require: "./index.cjs",
      import: "./index.js",
    },
    ...createExportsMap(names),
  };

  const internalPkg = {
    type: "module",
    main: "index.cjs.js",
    module: "index.es.js",
    types: "index.d.ts",
    exports: {
      "./package.json": "./package.json",
      "./style.css": "./style.css",
      ".": {
        require: "./index.cjs.js",
        import: "./index.es.js",
      },
    },
  };

  await Promise.all(
    names.map((name) =>
      directory.write(
        `${name}/package.json`,
        JSON.stringify(internalPkg, null, 2)
      )
    )
  );

  await directory.write("index.cjs", createCommonJsIndex(names));
  await directory.write("index.js", createMjsIndex(names));
  await directory.write("index.d.ts", createTypingsIndex(names));

  await directory.write("package.json", JSON.stringify(pkg, null, 2));
};

export { buildIndex };
