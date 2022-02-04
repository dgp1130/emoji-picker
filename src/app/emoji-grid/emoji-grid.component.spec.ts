import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiGridComponent } from './emoji-grid.component';

describe('EmojiGridComponent', () => {
  let component: EmojiGridComponent;
  let fixture: ComponentFixture<EmojiGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojiGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
