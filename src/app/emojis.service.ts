import { Injectable } from '@angular/core';
import { Emoji } from './emoji';

@Injectable({
  providedIn: 'root'
})
export class EmojisService {
  private fetchedData?: Promise<Emoji[]>;
  private fetchEmojis(): Promise<Emoji[]> {
    // Fetch and parse the emoji data if not already being fetched.
    return this.fetchedData ??= (async () => {
      const res = await fetch('/assets/emojis.json');
      const json = await res.json() as EmojiJson;
      return json.emojis;
    })();
  }

  /** Return the list of all emojis. */
  public async listEmojis(): Promise<Emoji[]> {
    return await this.fetchEmojis();
  }
}

/** Type of the emoji data-transfer JSON object. */
interface EmojiJson {
  emojis: Emoji[];
}
