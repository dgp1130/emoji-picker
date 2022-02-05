import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiFilterComponent } from './emoji-filter.component';

describe('EmojiFilterComponent', () => {
  let component: EmojiFilterComponent;
  let fixture: ComponentFixture<EmojiFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojiFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
