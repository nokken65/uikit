import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import packageJson from "../package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageMarker = "index.ts";
const rootPath = resolve(__dirname, "..");
const srcPath = resolve(__dirname, "..", "src");
const outPath = resolve(__dirname, "..", "dist");

const externalPackages = [
  ...Object.keys(packageJson.devDependencies || {}),
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

const regexesOfExternalPackages = externalPackages.map(
  (packageName) => new RegExp(`^${packageName}(/.*)?`)
);

export {
  __filename,
  __dirname,
  packageMarker,
  rootPath,
  srcPath,
  outPath,
  externalPackages,
  regexesOfExternalPackages,
};
