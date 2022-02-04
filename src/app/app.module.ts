import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { EmojiGridComponent } from './emoji-grid/emoji-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    EmojiGridComponent,
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
