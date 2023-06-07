import { TestBed } from '@angular/core/testing';

import { JobMasterVariableService } from './job-master-variable.service';

describe('JobMasterVariableService', () => {
  let service: JobMasterVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobMasterVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
