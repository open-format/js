"use strict";
const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");
const path = require("path");

const files = [
  {
    name: "NFT",
    input: "packages/sdk/src/core/app.ts",
    output: "docs/docs/api/javascript",
  },
  {
    name: "SDK",
    input: "packages/sdk/src/core/sdk.ts",
    output: "docs/docs/api/javascript",
  },
  {
    name: "Hooks",
    input: "packages/react/src/hooks/*.tsx",
    output: "docs/docs/api/react",
  },
];

for (const file of files) {
  const templateData = jsdoc2md.getTemplateDataSync({
    files: file.input,
    configure: "jsdoc2md.json",
  });

  console.log(`Generating: ${file.name}`);

  const output = jsdoc2md.renderSync({
    data: templateData,
    template: `---
title: ${file.name}
---

{{>all-docs~}}
`,
  });

  fs.writeFileSync(
    path.resolve(file.output, `${file.name.toLowerCase()}.md`),
    output
  );
}
