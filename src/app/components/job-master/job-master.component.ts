import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JobMasterVariableService } from 'src/app/services/variable/job-master-variable.service';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css'],
})
export class JobMasterComponent implements OnInit {
  constructor(
    public variable: JobMasterVariableService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.variable.jobPoll = '1';
    this.cekValidasi();
  }

  cekValidasi() {
    this.variable.form = this.formBuilder.group({
      codeJob: ['', [Validators.required]],
      codeCompany: ['', [Validators.required]],
      descJob: ['', [Validators.required]],
      jobStat: ['', [Validators.required]],
      checkbox: ['', [Validators.required]],
      status: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      jobPoll: ['', [Validators.required]],
    });
  }

  saveRekening() {
    console.log(this.variable.codeJob);
    console.log(this.variable.codeCompany);
    console.log(this.variable.descJob);
    console.log(this.variable.internal);
    console.log(this.variable.external);
    console.log(this.variable.status);
    console.log(this.variable.notes);
    let poll = this.variable.jobPoll;
    console.log(poll);
  }
}
