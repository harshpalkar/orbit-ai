import { TestBed } from '@angular/core/testing';

import { Orbit } from './orbit';

describe('Orbit', () => {
  let service: Orbit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orbit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
