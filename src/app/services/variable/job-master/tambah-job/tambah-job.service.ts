import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TambahJobService {
  constructor() {}

  codeJob: any;
  codeCompany: any;
  descJob: any;
  form!: FormGroup;
  jobStat: any;
  internal: any = false;
  external: any = false;
  status: any = '0 - ACTIVE';
  notes: any;
  jobPoll: any = '1';
}
