import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  checkKodePekerjaan,
  listKodePerusahaan,
} from 'src/app/models/job-master/model-job-master';
import { map, startWith } from 'rxjs/operators';

import { MainService } from 'src/app/services/main.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
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
    private formBuilder: FormBuilder,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.cekValidasi();
    // * HANYA NGECK 1 kali (kalo pake keyup malah jadi ngecek berkali")
    this.form.controls.codeJob.valueChanges.subscribe((value) => {
      this.checkKodePekerjaan();
    });
  }

  codeJob: any;
  codeCompany: any;
  descJob: any;
  form!: FormGroup;
  boxInt: any;
  boxEnt: any;
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
  dataKodePekerjaan: checkKodePekerjaan[] = [];

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

  checkKodePekerjaan() {
    const codeJobValue = this.form.controls.codeJob.value;
    if (codeJobValue.length === 3) {
      this.services.getAllJob('allJob').subscribe(
        (res) => {
          console.log(res);
          this.dataKodePekerjaan = [];
          res.body.data.forEach((element: any) => [
            this.dataKodePekerjaan.push({
              empl_job_code: element.empl_job_code,
            }),
          ]);
          const codeJobExists = this.dataKodePekerjaan.some(
            (job: any) => job.empl_job_code === codeJobValue
          );
          if (codeJobExists) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Kode pekerjaan sudah ada!',
              confirmButtonText: 'Ya',
              confirmButtonColor: '#4758b8',
            }).then((res) => {
              if (res.isConfirmed) {
                this.form.get('codeJob')?.setValue('');
                this.form.get('codeJob')?.markAsPristine();
                this.form.get('codeJob')?.markAsUntouched();
              } else {
              }
            });
          } else {
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  saveJob() {
    this.flagJobStatus();
    let parameter = {
      empl_job_code: this.form.value.codeJob,
      empl_com_id: this.form.value.codeCompany,
      empl_job_desc: this.form.value.descJob,
      empl_job_status: this.boxInt + this.boxEnt,
      empl_deleted: '0',
      empl_job_notes: this.form.value.notes,
      empl_flag_pool: this.form.value.jobPoll,
    };
    console.log(parameter);
    if (this.form.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Isian anda tidak lengkap!',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    this.services.insertUpdateJob('insertJob', parameter).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  clearInput() {
    this.form.reset({
      codeJob: '',
      codeCompany: '',
      descJob: '',
      status: '0 - ACTIVE',
      boxInternal: false,
      boxExternal: false,
      notes: '',
    });
    this.form.get('jobPoll')?.setValue(null);

    // this.form.controls.codeJob.reset();
  }

  saveJobs() {
    this.flagJobStatus();
    console.log(this.form.value.codeJob);
    console.log(this.form.value.codeCompany);
    console.log(this.form.value.descJob);
    // console.log(this.form.value.boxInternal);
    console.log(this.boxInt);
    // console.log(this.form.value.boxExternal);
    console.log(this.boxEnt);
    console.log(this.status);
    console.log(this.form.value.notes);
    let poll = this.form.value.jobPoll;
    console.log(poll);
  }

  flagJobStatus() {
    if (this.form.value.boxInternal == true) {
      this.boxInt = 'I';
    } else {
      this.boxInt = '';
    }
    if (this.form.value.boxExternal == true) {
      this.boxEnt = 'E';
    } else {
      this.boxEnt = '';
    }
  }

  closeTambahJob() {
    this.dialogRef.close();
  }
}
