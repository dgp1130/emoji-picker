import { Component } from '@angular/core';

@Component({
  selector: 'app-emoji-grid',
  templateUrl: './emoji-grid.component.html',
  styleUrls: ['./emoji-grid.component.css']
})
export class EmojiGridComponent {
  emojis = ['a', 'b', 'c', 'd'];
}
