import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { TambahJobService } from 'src/app/services/variable/job-master/tambah-job/tambah-job.service';

@Component({
  selector: 'app-tambah-job',
  templateUrl: './tambah-job.component.html',
  styleUrls: ['./tambah-job.component.css'],
})
export class TambahJobComponent implements OnInit {
  constructor(
    public variable: TambahJobService,
    public dialogRef: MatDialogRef<TambahJobComponent>,
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
