import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextSizeService {
  private canvas = document.createElement('canvas');

  /** Returns the width of the given text with the provided font. */
  public getTextWidth(text: string, font: string): number {
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Failed to get context from canvas.');
    context.font = font;

    const metrics = context.measureText(text);
    return metrics.width;
  }
}
