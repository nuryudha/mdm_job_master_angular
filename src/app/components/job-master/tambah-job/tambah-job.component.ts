import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
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
  }

  codeJob: any;
  codeCompany: any;
  descJob: any;
  form!: FormGroup;
  jobStat: any;
  status: any = '0 - ACTIVE';
  notes: any;
  jobPoll: any;
  dataKodePerusahaan: listKodePerusahaan[] = [
    { kode_perusahaan: 'BMR', kode_perus_disp: 'BMR - Mediator BMRI' },
    { kode_perusahaan: 'CRM', kode_perus_disp: 'CRM - CRM' },
    { kode_perusahaan: 'DEAL', kode_perus_disp: 'DEAL - Dealer' },
    { kode_perusahaan: 'DS', kode_perus_disp: 'DS - Direct Sales' },
    { kode_perusahaan: 'MDR', kode_perus_disp: 'MDR - Mediator' },
    { kode_perusahaan: 'MUF', kode_perus_disp: 'MUF - Mandiri Utama Finance' },
  ];
  filteredKodePerusahaan: any = this.dataKodePerusahaan;

  cekValidasi() {
    this.form = this.formBuilder.group(
      {
        codeJob: ['', [Validators.required]],
        codeCompany: ['', [Validators.required]],
        descJob: ['', [Validators.required]],
        status: { value: '', disabled: true },
        notes: ['', [Validators.required]],
        jobPoll: ['', [Validators.required]],
        boxInternal: [false],
        boxExternal: [false],
      },
      { validator: this.checkboxValidator }
    );
  }

  checkboxValidator(formGroup: FormGroup) {
    const boxInternal = formGroup.get('boxInternal');
    const boxExternal = formGroup.get('boxExternal');

    if (boxInternal && boxExternal) {
      if (boxInternal.value === false && boxExternal.value === false) {
        return { required: true };
      }
    }

    return null;
  }

  // checkboxValidator(formGroup: FormGroup) {
  //   const boxInternal = formGroup.get('boxInternal');
  //   const boxExternal = formGroup.get('boxExternal');

  //   if (boxInternal && boxExternal) {
  //     if (boxInternal.value === false && boxExternal.value === false) {
  //       boxInternal.setErrors({ required: true });
  //       boxExternal.setErrors({ required: true });
  //     } else {
  //       boxInternal.setErrors(null);
  //       boxExternal.setErrors(null);
  //     }
  //   }
  // }

  saveJob() {
    console.log(this.form.value.codeJob);
    console.log(this.form.value.codeCompany);
    console.log(this.form.value.descJob);
    console.log(this.form.value.boxInternal);
    console.log(this.form.value.boxExternal);
    console.log(this.status);
    console.log(this.notes);
    let poll = this.form.value.jobPoll;
    console.log(poll);
  }

  clearInput() {
    this.form.controls.codeJob.reset();
    this.form.controls.codeCompany.reset();
    this.form.controls.descJob.reset();
    // this.internal = false;
    // this.external = false;
    // this.form.controls.status.reset();
    this.form.controls.notes.reset();
    this.jobPoll = '1';
  }

  closeTambahJob() {
    this.dialogRef.close();
  }
}
