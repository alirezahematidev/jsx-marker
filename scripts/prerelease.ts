import fs from "node:fs/promises";

import glob from "fast-glob";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

async function copy() {
  await sleep();

  const dts = await glob("dist/**/*.d.ts", { absolute: true });

  await Promise.all(dts.map((file) => fs.copyFile(file, file.replace(/\.d\.ts$/, ".d.cts"))));
}

copy().catch(console.error);
