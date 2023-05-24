import { Component, OnInit } from '@angular/core';

import { JobMasterVariableService } from 'src/app/services/variable/job-master-variable.service';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css'],
})
export class JobMasterComponent implements OnInit {
  constructor(public variable: JobMasterVariableService) {}

  ngOnInit(): void {
    this.variable.codeJob;
  }

  saveRekening() {
    console.log(this.variable.codeJob);
  }
}
