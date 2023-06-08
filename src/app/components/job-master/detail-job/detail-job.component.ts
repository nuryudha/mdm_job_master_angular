import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DetailJobService } from 'src/app/services/variable/job-master/detail-job/detail-job.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css'],
})
export class DetailJobComponent implements OnInit {
  constructor(
    public variable: DetailJobService,
    public dialogRef: MatDialogRef<DetailJobComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cekValidasi();
  }

  cekValidasi() {
    this.variable.form = this.formBuilder.group({
      codeJob: ['', [Validators.required]],
      codeCompany: ['', [Validators.required]],
      descJob: ['', [Validators.required]],
      checkbox: ['', [Validators.required]],
      status: { value: '', disabled: true },
      notes: ['', [Validators.required]],
      jobPoll: ['', [Validators.required]],
    });
  }

  saveJob() {
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

  clearInput() {
    this.variable.form.controls.codeJob.reset();
    this.variable.form.controls.codeCompany.reset();
    this.variable.form.controls.descJob.reset();
    this.variable.internal = false;
    this.variable.external = false;
    this.variable.form.controls.status.reset();
    this.variable.form.controls.notes.reset();
    this.variable.jobPoll = '1';
  }

  closeTambahJob() {
    this.dialogRef.close();
  }
}
