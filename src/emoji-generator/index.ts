import { promises as fs } from 'fs';
import * as path from 'path';
import * as process from 'process';

(async () => {
  // Process arguments.
  if (process.argv.length !== 3) {
    throw new Error('Need exactly one argument for output file.');
  }
  const outputFile = process.argv[2];

  // Read raw emoji data, parse it, generate the index, and write to the output.
  const emojis = await readEmojis();
  const json = JSON.stringify({ emojis }, null, 2);
  await fs.writeFile(outputFile, json, 'utf8');
})().then(() => {
  process.exit(0);
}, (err) => {
  const message = err instanceof Error ? err.message : err;
  console.error(message);
  process.exit(1);
});

type Glyph = string;
interface Emoji {
  glyph: Glyph;
  name: string;
}

// Reads raw emoji data.
async function readEmojis(): Promise<Emoji[]> {
  const emojiPath = path.join(__dirname, 'emoji-data.txt');
  const rawEmojis = await fs.readFile(emojiPath, 'utf8');
  return parseEmojis(rawEmojis);
}

// Parses all emojis out of the input data.
function parseEmojis(emojiData: string): Emoji[] {
  return emojiData.split('\n')
      .map((line) => line.trim())
      // Remove comments.
      .filter((line) => !line.startsWith('#'))
      // Remove empty lines.
      .filter((line) => line !== '')
      // Collapse multiple spaces to just one space.
      .map((line) => line.replace(/ +/, ' '))
      // Break the table into columns.
      .map((line) => {
        const [ codePoints, qualifier, comment ] =
            line.split(/[;#]/).map((col) => col.trim());
        return { codePoints, qualifier, comment };
      })
      // Limit to fully qualified code points.
      .filter(({ qualifier }) => qualifier === 'fully-qualified')
      // Parse code points and name.
      .map(({ codePoints, comment }) => ({
        glyph: parseGlyph(codePoints),
        name: comment.replace(/.*E[0-9]+\.[0-9]+ /, ''),
      }))
      // Ignore skin tones for now.
      .filter(({ name }) => !name.includes('skin tone'));
  ;
}

function parseGlyph(codePoints: string): string {
  const points = codePoints.split(' ')
      .map((codePoint) => parseInt(codePoint, 16));
  return String.fromCodePoint(...points);
}
