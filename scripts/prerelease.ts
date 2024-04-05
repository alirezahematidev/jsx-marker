import fs from "node:fs/promises";

import glob from "fast-glob";

async function copy() {
  const dts = await glob("dist/**/*.d.ts", { absolute: true });

  await Promise.all(dts.map((file) => fs.copyFile(file, file.replace(/\.d\.ts$/, ".d.cts"))));
}

copy().catch(console.error);
