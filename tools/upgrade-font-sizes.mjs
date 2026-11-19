import fs from 'node:fs';
import path from 'node:path';

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        walkDir(full, callback);
      }
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      callback(full);
    }
  }
}

let modifiedFiles = 0;
let replacementCount = 0;

walkDir(path.resolve('src'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Replace text-[8px], text-[9px], text-[10px], text-[11px] with text-xs
  const regex = /text-\[(?:7|8|9|10|11)px\]/g;
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(regex, 'text-xs');
    replacementCount += matches.length;
  }

  // Also replace any inline font-size: 8px/9px/10px/11px or fontSize: '8px'
  content = content.replace(/fontSize:\s*['"]?(?:7|8|9|10|11)px['"]?/g, "fontSize: '12px'");
  content = content.replace(/font-size:\s*(?:7|8|9|10|11)px/g, 'font-size: 12px');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
    console.log(`Updated: ${path.relative(process.cwd(), filePath)}`);
  }
});

console.log(`\nCompleted! Replaced ${replacementCount} occurrences across ${modifiedFiles} files.`);
