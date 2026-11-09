/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

async function buildCSS() {
  const root = path.resolve(__dirname, "..");
  const inputPath = path.join(root, "app", "globals.css");
  const outputPath = path.join(root, "app", "compiled.css");

  try {
    const { compile } = require("@tailwindcss/node");
    const { Scanner } = require("@tailwindcss/oxide");

    const css = fs.readFileSync(inputPath, "utf-8");
    const compiler = await compile(css, {
      base: root,
      onDependency: () => {},
    });

    const scanner = new Scanner({
      sources: [
        {
          base: root,
          pattern: "{app,components,context,data}/**/*.{ts,tsx,js,jsx}",
          negated: false,
        },
      ],
    });

    const candidates = scanner.scan();
    const compiled = compiler.build([...candidates]);

    fs.writeFileSync(outputPath, compiled);
    console.log(`[build-css] Compiled ${compiled.length} bytes of Tailwind CSS v4 into app/compiled.css`);
  } catch (err) {
    if (fs.existsSync(outputPath)) {
      console.warn("[build-css] Note: Using existing compiled.css:", outputPath);
    } else {
      console.error("[build-css] Error:", err);
      process.exit(1);
    }
  }
}

buildCSS();
