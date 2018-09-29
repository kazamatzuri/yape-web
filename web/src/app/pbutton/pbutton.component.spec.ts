import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbuttonComponent } from './pbutton.component';

describe('PbuttonComponent', () => {
  let component: PbuttonComponent;
  let fixture: ComponentFixture<PbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
