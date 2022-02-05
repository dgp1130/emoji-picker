import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emoji-filter',
  templateUrl: './emoji-filter.component.html',
  styleUrls: ['./emoji-filter.component.css']
})
export class EmojiFilterComponent {
  filter = '';
  @Output() filterChanged = new EventEmitter<string>();
}
