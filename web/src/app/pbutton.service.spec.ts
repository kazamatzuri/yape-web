import { TestBed } from '@angular/core/testing';

import { PbuttonService } from './pbutton.service';

describe('PbuttonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PbuttonService = TestBed.get(PbuttonService);
    expect(service).toBeTruthy();
  });
});
