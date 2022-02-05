import { Component, ElementRef } from '@angular/core';
import { EmojisService } from 'src/app/emojis.service';

@Component({
  selector: 'app-emoji-grid',
  templateUrl: './emoji-grid.component.html',
  styleUrls: ['./emoji-grid.component.css']
})
export class EmojiGridComponent {
  constructor(private emojisService: EmojisService, private el: ElementRef) {}

  emojis = this.emojisService.listEmojis();

  /** Copy emoji to clipboard on click. */
  async onGridClicked(evt: Event): Promise<void> {
    const target = evt.target as HTMLElement;
    for (const el of retarget(target, this.el.nativeElement)) {
      if (el.tagName.toLowerCase() !== 'mat-grid-tile') continue;

      const glyph = el.textContent?.trim();
      if (!glyph) throw new Error(`No glyph for grid tile, ${el}.`);

      await navigator.clipboard.writeText(glyph);
      return;
    }
  }
}

/**
 * Angular doesn't support event retargetting, so a click event could come from
 * a descendent implementation detail of a child component. Walk the DOM tree
 * towards the root until we hit the given root (the `this` component) to emit
 * all the nodes between an event target and the component.
 */
function* retarget(leaf: HTMLElement, root: HTMLElement):
    Generator<HTMLElement, void, void> {
  const parent = leaf.parentElement;
  if (parent && parent !== root) {
    yield leaf;
    yield* retarget(parent, root);
  }
}
