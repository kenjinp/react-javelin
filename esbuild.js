const esbuild = require("esbuild");
esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist/esm",
    bundle: true,
    sourcemap: true,
    minify: true,
    splitting: true,
    format: "esm",
    target: ["esnext"],
    external: ["@javelin/ecs", "react"],
  })
  .catch(() => process.exit(1));
esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist/cjs",
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "cjs",
    target: ["esnext"],
    external: ["@javelin/ecs", "react"],
  })
  .catch(() => process.exit(1));
console.log("build complete :)");
