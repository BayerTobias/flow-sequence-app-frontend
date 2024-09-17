import { TestBed } from '@angular/core/testing';

import { FlowSequenceServiceService } from './flow-sequence-service.service';

describe('FlowSequenceServiceService', () => {
  let service: FlowSequenceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowSequenceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
