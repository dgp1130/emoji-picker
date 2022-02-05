import { Injectable } from '@angular/core';
import { Emoji } from './emoji';

@Injectable({
  providedIn: 'root'
})
export class EmojisService {
  private fetchedData?: Promise<{
    emojis: Emoji[],
    index: Map<string, Emoji[]>,
  }>;
  private fetchEmojis(): Promise<{
    emojis: Emoji[],
    index: Map<string, Emoji[]>,
  }> {
    // Fetch and parse the emoji data if not already being fetched.
    return this.fetchedData ??= (async () => {
      const res = await fetch('/assets/emojis.json');
      const json = await res.json();
      const { emojis, index } = parseEmojis(json);
      return { emojis, index };
    })();
  }

  /** Return the list of all emojis. */
  public async listEmojis(): Promise<Emoji[]> {
    const { emojis } = await this.fetchEmojis();
    return emojis;
  }
}

/** Parse the emoji JSON formatting. */
function parseEmojis(emojiJson: EmojiJson): {
  emojis: Emoji[],
  index: Map<string, Emoji[]>,
} {
  const { emojis, index: indexRecord } = emojiJson;
  const index = new Map<string, Emoji[]>(Object.entries(indexRecord));
  return { emojis, index };
}

/** Type of the emoji data-transfer JSON object. */
interface EmojiJson {
  emojis: Emoji[];
  index: Record<string, Emoji[]>;
}
