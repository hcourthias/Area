import { TestBed } from '@angular/core/testing';

import { RedirectGuardService } from './redirect-guard.service';

describe('RedirectGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedirectGuardService = TestBed.get(RedirectGuardService);
    expect(service).toBeTruthy();
  });
});
