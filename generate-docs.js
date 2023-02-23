"use strict";
const jsdoc2md = require("jsdoc-to-markdown");
const fs = require("fs");
const path = require("path");

const files = [
  {
    name: "Subgraph",
    input: "packages/sdk/src/core/subgraph.ts",
    output: "docs/api",
  },
  {
    name: "SDK",
    input: "packages/sdk/src/core/sdk.ts",
    output: "docs/api",
  },
  {
    name: "Hooks",
    input: "packages/react/src/hooks/*.tsx",
    output: "docs/api",
  },
  {
    name: "ERC721",
    input: "packages/sdk/src/core/token/ERC721.ts",
    output: "docs/api",
  },
  {
    name: "ERC721Instance",
    input: "packages/sdk/src/core/token/ERC721Instance.ts",
    output: "docs/api",
  },
  {
    name: "ERC20",
    input: "packages/sdk/src/core/token/ERC20.ts",
    output: "docs/api",
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
