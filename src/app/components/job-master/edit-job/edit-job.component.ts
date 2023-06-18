import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditJobService } from 'src/app/services/variable/job-master/edit-job/edit-job.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { listKodePerusahaan } from 'src/app/models/job-master/model-job-master';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
})
export class EditJobComponent implements OnInit {
  constructor(
    public variable: EditJobService,
    public dialogRef: MatDialogRef<EditJobComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, // Akses data dari tabel
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.cekValidasi();
    console.log(this.data);
  }

  codeJob: any;
  codeCompany: any;
  descJob: any;
  form!: FormGroup;
  boxInt: any;
  boxEnt: any;
  status: any = '0 - ACTIVE';
  notes: any;

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
        codeJob: { value: this.data.empl_job_code, disabled: true },
        codeCompany: [this.data.empl_com_id, [Validators.required]],
        descJob: [this.data.empl_job_desc, [Validators.required]],
        status: { value: '', disabled: true },
        notes: [this.data.empl_job_notes, [Validators.required]],
        jobPoll: [this.data.empl_flag_pool.toString(), [Validators.required]],
        boxInternal: [false],
        boxExternal: [false],
      },
      { validator: this.checkboxValidator }
    );
    this.setValueForm();
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

  setValueForm() {
    if (this.data.empl_job_status.charAt(0) == 'I') {
      this.form.get('boxInternal')?.setValue(true);
    }
    if (this.data.empl_job_status.charAt(1) == 'E') {
      this.form.get('boxExternal')?.setValue(true);
    }
  }

  clearInput() {
    this.form.controls.codeJob.reset();
    this.form.controls.codeCompany.reset();
    this.form.controls.descJob.reset();
    // this.internal = false;
    // this.external = false;
    this.form.controls.status.reset();
    this.form.controls.notes.reset();
  }

  saveJob() {
    this.flagJobStatus();
    let parameter = {
      empl_job_code: this.data.empl_job_code,
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
    this.services.insertUpdateJob('insertUpdate', parameter).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveJobs() {
    this.flagJobStatus();
    console.log(this.data.empl_job_code);
    console.log(this.form.value.codeCompany);
    console.log(this.form.value.descJob);
    console.log(this.boxInt);
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
