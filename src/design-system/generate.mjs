import fs from "fs";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const designSystem = [
  { fileName: "spacing", typeName: "Spacing", regex: /--spacing-[a-zA-Z0-9-]+/g },
  { fileName: "breakpoints", typeName: "Breakpoints", regex: /--breakpoint-[a-zA-Z0-9-]+/g },
  { fileName: "fontFamilies", typeName: "FontFamilies", regex: /--font-family-[a-zA-Z0-9-]+/g },
  { fileName: "fontSize", typeName: "FontSizes", regex: /--font-size-[a-zA-Z0-9-]+/g },
  { fileName: "shadows", typeName: "Shadows", regex: /--shadow-[a-zA-Z0-9-]+/g },
  { fileName: "colors", typeName: "Colors", regex: /--color-[a-zA-Z0-9-]+/g }
];

export function generate(fileName, typeName, regex){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const cssFilePath = path.resolve(__dirname, '../app/globals.css');
  const tsFilePath = path.resolve(__dirname, `./styles/${fileName}.ts`);
  
  function extractCssVariables(fileContent) {
    const matches = fileContent.match(regex);
    return matches ? Array.from(new Set(matches)) : [];
  }
  
  function generateTypeScriptType(variables, typeName) {
    if (variables.length === 0) {
      return `export type ${typeName} = never;`;
    }
    
    const types = variables.map(variable => `'${variable}'`).join(' | ');
    return `export type ${typeName} = ${types};`;
  }
  
  fs.readFile(cssFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Errore nella lettura del file CSS: ${err.message}`);
      return;
    }
  
    const cssVariables = extractCssVariables(data);
    const tsContent = generateTypeScriptType(cssVariables, typeName);
  
    fs.writeFile(tsFilePath, tsContent, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Errore nella scrittura del file TS: ${writeErr.message}`);
      } else {
        console.log(`File TypeScript generato con successo: ${tsFilePath}`);
      }
    });
  });
}

designSystem.forEach(element => {
  generate(element.fileName, element.typeName, element.regex);
});