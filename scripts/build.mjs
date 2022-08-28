import { buildAll } from './buildAll.mjs';
import { buildComponents } from './buildComponents.mjs';
import { buildIndex } from './buildIndex.mjs';
import { outPath } from './constants.mjs';
import { exists, rm } from './utils.mjs';

const main = async () => {
  if (await exists(outPath)) {
    await rm(outPath, { recursive: true });
  }
  await buildComponents();
  await buildAll();
  buildIndex();
};

main().catch((error) => {
  console.error(error);
  // eslint-disable-next-line no-undef
  process.exit(-1);
});
