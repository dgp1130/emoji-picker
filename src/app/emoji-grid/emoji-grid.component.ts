import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, debounceTime, from, map, takeUntil, Subject } from 'rxjs';
import { EmojisService } from 'src/app/emojis.service';

@Component({
  selector: 'app-emoji-grid',
  templateUrl: './emoji-grid.component.html',
  styleUrls: ['./emoji-grid.component.css']
})
export class EmojiGridComponent implements OnDestroy {
  constructor(
    private emojisService: EmojisService,
    private el: ElementRef,
    private snackBar: MatSnackBar,
  ) {}

  // Track filter changes in a subject.
  filter$ = new BehaviorSubject<string>('');
  @Input() set filter(value: string) {
    this.filter$.next(value);
  }

  // Emit when the component is destroyed.
  private destroyed = new Subject<void>();
  ngOnDestroy() {
    this.destroyed.next();
  }

  // Tracks all filtered emojis.
  emojis$ = combineLatest([
    // Get emojis from backend.
    from(this.emojisService.listEmojis()),
    // Debounce changes to the filter to reduce layout thrashing.
    this.filter$.pipe(debounceTime(100)),
  ]).pipe(
    map(([ emojis, filter ]) => emojis.filter(({ name }) => name.includes(filter))),
    takeUntil(this.destroyed),
  );

  /** Copy emoji to clipboard on click. */
  async onGridClicked(evt: Event): Promise<void> {
    const target = evt.target as HTMLElement;
    for (const el of retarget(target, this.el.nativeElement)) {
      if (el.tagName.toLowerCase() !== 'mat-grid-tile') continue;

      const glyph = el.textContent?.trim();
      if (!glyph) throw new Error(`No glyph for grid tile, ${el}.`);

      await navigator.clipboard.writeText(glyph);
      this.snackBar.open('Copied to clipboard!', undefined /* action */, {
        duration: 1000 /* ms */,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
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
