import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TambahJobService } from 'src/app/services/variable/job-master/tambah-job/tambah-job.service';
import { listKodePerusahaan } from 'src/app/models/job-master/model-job-master';

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
    this.filteredOptions = this.form.get('codeCompany')?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    // this.filteredOptions = this.form.get('codeCompany').valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );
  }

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
  dataKodePerusahaan: listKodePerusahaan[] = [
    { kode_perusahaan: 'BMR', kode_perus_disp: 'BMRS - Mediator BMRI' },
    { kode_perusahaan: 'CRM', kode_perus_disp: 'CRM - CRM' },
    { kode_perusahaan: 'DEAL', kode_perus_disp: 'DEAL - Dealer' },
    { kode_perusahaan: 'DS', kode_perus_disp: 'DS - Direct Sales' },
    { kode_perusahaan: 'MDR', kode_perus_disp: 'MDR - Mediator' },
    { kode_perusahaan: 'MUF', kode_perus_disp: 'MUF - Mandiri Utama Finance' },
  ];

  myControl = new FormControl('');
  filteredOptions!: Observable<listKodePerusahaan[]> | undefined;

  private _filter(value: any): listKodePerusahaan[] {
    const filterValue = value.toLowerCase();
    return this.dataKodePerusahaan.filter((option) =>
      option.kode_perus_disp.toLowerCase().includes(filterValue)
    );
  }

  cekValidasi() {
    this.form = this.formBuilder.group({
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
    console.log(this.codeJob);
    console.log(this.form.value.codeCompany);
    console.log(this.descJob);
    console.log(this.internal);
    console.log(this.external);
    console.log(this.status);
    console.log(this.notes);
    let poll = this.jobPoll;
    console.log(poll);
  }

  clearInput() {
    this.form.controls.codeJob.reset();
    this.form.controls.codeCompany.reset();
    this.form.controls.descJob.reset();
    this.internal = false;
    this.external = false;
    this.form.controls.status.reset();
    this.form.controls.notes.reset();
    this.jobPoll = '1';
  }

  closeTambahJob() {
    this.dialogRef.close();
  }
}
