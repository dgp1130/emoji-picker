import { Component } from '@angular/core';
import { EmojisService } from 'src/app/emojis.service';

@Component({
  selector: 'app-emoji-grid',
  templateUrl: './emoji-grid.component.html',
  styleUrls: ['./emoji-grid.component.css']
})
export class EmojiGridComponent {
  constructor(private emojisService: EmojisService) {}

  emojis = this.emojisService.listEmojis();
}
