import { Component, ElementRef, Input, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, Subject, debounceTime, from, map, Observable } from 'rxjs';
import { EmojisService } from 'src/app/emojis.service';
import { TextSizeService } from 'src/app/text-size.service';

@Component({
  selector: 'app-emoji-grid',
  templateUrl: './emoji-grid.component.html',
  styleUrls: ['./emoji-grid.component.css']
})
export class EmojiGridComponent {
  constructor(
    private emojisService: EmojisService,
    private el: ElementRef,
    private snackBar: MatSnackBar,
    private textSizeService: TextSizeService,
    private zone: NgZone,
  ) {}

  // Track filter changes in a subject.
  filter$ = new BehaviorSubject<string>('');
  @Input() set filter(value: string) {
    this.filter$.next(value);
  }

  // Tracks all filtered emojis.
  emojis$ = combineLatest([
    // Get emojis from backend.
    from(this.emojisService.listEmojis()),
    // Debounce changes to the filter to reduce layout thrashing.
    this.filter$.pipe(debounceTime(100)),
  ]).pipe(
    map(([ emojis, filter ]) => emojis.filter(({ name }) => name.includes(filter))),
  );

  /** Copy emoji to clipboard on click. */
  async onGridClicked(evt: Event): Promise<void> {
    const target = evt.target as HTMLElement;
    for (const el of retarget(target, this.el.nativeElement)) {
      if (el.tagName.toLowerCase() !== 'mat-grid-tile') continue;

      const glyph = el.textContent?.trim();
      if (!glyph) throw new Error(`No glyph for grid tile, ${el}.`);

      await navigator.clipboard.writeText(glyph);
      this.snackBar.open(`Copied ${glyph} to clipboard!`, undefined /* action */, {
        duration: 1000 /* ms */,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }
  }

  // Compute the number of columns in the grid based on the screen and text
  // sizes.
  private emojiWidth =
      this.textSizeService.getTextWidth('😀', '2rem Noto Color Emoji');
  cols$ = this.fromContentRect().pipe(
    map(([ elWidth ]) => {
      const tileWidth = this.emojiWidth * 1.2; // Give emoji some spacing.
      return Math.floor(elWidth / tileWidth);
    }),
  );

  /** Emits with the size of this element's content changes. */
  private fromContentRect(): Observable<[ width: number, height: number ]> {
    return new Observable((sub) => {
      const observer = new ResizeObserver((entries) => {
        // `observe()` is only ever called on one element.
        if (entries.length !== 1) {
          throw new Error(`Got ${entries.length} resize entries, expected only one.`);
        }
        const [entry] = entries;

        // Must explicitly run inside the Zone as apparently Zone.js doesn't
        // monkey patch this normally?
        this.zone.run(() => {
          sub.next([ entry.contentRect.width, entry.contentRect.height ]);
        });
      });
      observer.observe(this.el.nativeElement);

      return () => observer.unobserve(this.el.nativeElement);
    });
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
