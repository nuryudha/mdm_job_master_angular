import { TestBed } from '@angular/core/testing';

import { KosongService } from './kosong.service';

describe('KosongService', () => {
  let service: KosongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KosongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
