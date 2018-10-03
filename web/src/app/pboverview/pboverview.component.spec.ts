import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PboverviewComponent } from './pboverview.component';

describe('PboverviewComponent', () => {
  let component: PboverviewComponent;
  let fixture: ComponentFixture<PboverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PboverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PboverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
