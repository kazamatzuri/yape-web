import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDeckComponent } from './image-deck.component';

describe('ImageDeckComponent', () => {
  let component: ImageDeckComponent;
  let fixture: ComponentFixture<ImageDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
