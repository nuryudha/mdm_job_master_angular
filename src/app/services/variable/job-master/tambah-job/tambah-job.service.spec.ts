import { TestBed } from '@angular/core/testing';

import { TambahJobService } from './tambah-job.service';

describe('TambahJobService', () => {
  let service: TambahJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TambahJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
