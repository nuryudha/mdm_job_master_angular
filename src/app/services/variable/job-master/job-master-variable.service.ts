import { Injectable, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { listAllJob } from 'src/app/models/job-master/model-job-master';

@Injectable({
  providedIn: 'root',
})
export class JobMasterVariableService {
  constructor() {}
}
