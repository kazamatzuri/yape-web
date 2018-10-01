import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgraphComponent } from './igraph.component';

describe('IgraphComponent', () => {
  let component: IgraphComponent;
  let fixture: ComponentFixture<IgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
