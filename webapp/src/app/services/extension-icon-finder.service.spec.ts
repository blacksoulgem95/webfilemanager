import { TestBed } from '@angular/core/testing';

import { ExtensionIconFinderService } from './extension-icon-finder.service';

describe('ExtensionIconFinderService', () => {
  let service: ExtensionIconFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtensionIconFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
