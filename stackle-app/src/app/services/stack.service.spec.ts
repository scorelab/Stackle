import { TestBed, inject } from '@angular/core/testing';

import { StackService } from './stack.service';

describe('StackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackService]
    });
  });

  it('should be created', inject([StackService], (service: StackService) => {
    expect(service).toBeTruthy();
  }));
});
