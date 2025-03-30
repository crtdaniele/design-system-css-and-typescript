import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const designSystem = [
  { fileName: "spacing", enumName: "SpacingEnum", typeName: "Spacing", regex: /--spacing-[a-zA-Z0-9-]+/g },
  { fileName: "breakpoints", enumName: "BreakpointsEnum", typeName: "Breakpoints", regex: /--breakpoint-[a-zA-Z0-9-]+/g },
  { fileName: "fontFamilies", enumName: "FontFamiliesEnum", typeName: "FontFamilies", regex: /--font-family-[a-zA-Z0-9-]+/g },
  { fileName: "fontSize", enumName: "FontSizesEnum", typeName: "FontSizes", regex: /--font-size-[a-zA-Z0-9-]+/g },
  { fileName: "shadows", enumName: "ShadowsEnum", typeName: "Shadows", regex: /--shadow-[a-zA-Z0-9-]+/g },
  { fileName: "colors", enumName: "ColorsEnum", typeName: "Colors", regex: /--color-[a-zA-Z0-9-]+/g }
];

export function generate(fileName, enumName, typeName, regex) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const cssFilePath = path.resolve(__dirname, "../app/globals.css");
  const tsFilePath = path.resolve(__dirname, `./styles/${fileName}.ts`);

  function extractCssVariables(fileContent) {
    const matches = fileContent.match(regex);
    return matches ? Array.from(new Set(matches)) : [];
  }

  function generateTypeScriptEnum(variables, enumName, typeName) {
    if (variables.length === 0) {
      return `export enum ${enumName} {}

export type ${typeName} = keyof typeof ${enumName};`;
    }

    const enumEntries = variables.map(variable => {
      const key = variable.replace(/--(color|spacing|breakpoint|font-family|font-size|shadow)-/, "").replace(/-/g, "_").toLowerCase();
      return `  ${key} = "${variable}"`;
    }).join(",\n");
    
    return `export enum ${enumName} {
${enumEntries}
}

export type ${typeName} = keyof typeof ${enumName};`;
  }

  fs.readFile(cssFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Errore nella lettura del file CSS: ${err.message}`);
      return;
    }

    const cssVariables = extractCssVariables(data);
    const tsContent = generateTypeScriptEnum(cssVariables, enumName, typeName);

    fs.writeFile(tsFilePath, tsContent, "utf8", (writeErr) => {
      if (writeErr) {
        console.error(`Errore nella scrittura del file TS: ${writeErr.message}`);
      } else {
        console.log(`File TypeScript generato con successo: ${tsFilePath}`);
      }
    });
  });
}

designSystem.forEach(element => {
  generate(element.fileName, element.enumName, element.typeName, element.regex);
});