import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EditJobComponent } from './edit-job/edit-job.component';
import { JobMasterVariableService } from 'src/app/services/variable/job-master/job-master-variable.service';
import { MainService } from 'src/app/services/main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TambahJobComponent } from './tambah-job/tambah-job.component';
import { listAllJob } from 'src/app/models/job-master/model-job-master';

// import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css'],
})
export class JobMasterComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public variable: JobMasterVariableService,
    private services: MainService
  ) {}

  ngOnInit(): void {
    this.getListAllJob();
  }

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.matPaginator;
  }

  displayedColumns: string[] = ['jobCode', 'jobDesc', 'status', 'action'];
  dataSource!: MatTableDataSource<listAllJob>;
  dataAllJob: listAllJob[] = [];
  searchJob: any;
  status_aktif: any = false;
  status_non_aktif: any = false;

  getListAllJob() {
    this.dataSource = new MatTableDataSource(this.dataAllJob);
    this.services.getAllJob('allJob').subscribe(
      (res) => {
        let status: any;
        console.log(res.body.data);
        res.body.data.forEach((element: any) => {
          if (element.empl_deleted == '0') {
            status = 'ACTIVE';
          } else if (element.empl_deleted == '1') {
            status = 'NON - ACTIVE';
          } else {
            status = 'UNKNOWN';
          }
          this.dataAllJob.push({
            empl_job_code: element.empl_job_code,
            empl_job_desc: element.empl_job_desc,
            empl_log_id: element.empl_log_id,
            empl_deleted: status,
            empl_job_status: element.empl_job_status,
            empl_com_id: element.empl_com_id,
            empl_job_notes: element.empl_job_notes,
            empl_flag_pool: element.empl_flag_pool,
          });
        });
        this.dataSource = new MatTableDataSource(this.dataAllJob);
        this.ngAfterViewInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter() {
    this.dataSource.filter = this.searchJob.trim().toLowerCase();
  }

  tambahJob() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '85%';
    this.dialog
      .open(TambahJobComponent, dialogConfig)
      .afterClosed()
      .subscribe(
        (res) => {
          console.log(res);
          if (res && res.hasOwnProperty('status') && res.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.body.message,
              showConfirmButton: true,
              confirmButtonText: 'Ya',
              confirmButtonColor: '#086bff',
            }).then((res) => {
              if (res.isConfirmed) {
              } else {
              }
            });
            this.getListAllJob();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  editJob(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    dialogConfig.height = '85%';
    dialogConfig.data = element; // Mengirimkan elemen ke dialog menggunakan properti 'data'
    this.dialog
      .open(EditJobComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res && res.hasOwnProperty('status') && res.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: res.body.message,
            showConfirmButton: true,
            confirmButtonText: 'Ya',
            confirmButtonColor: '#086bff',
          }).then((res) => {
            if (res.isConfirmed) {
            } else {
            }
          });
          this.getListAllJob();
        }
      });
  }

  changeStatus(status: any) {
    let status_empl: any;
    if (status.empl_deleted === 'ACTIVE') {
      status_empl = '1';
      let parameter = {
        empl_job_code: status.empl_job_code,
        empl_deleted: status_empl,
      };
      Swal.fire({
        position: 'center',
        icon: 'question',
        title: 'Konfirmasi',
        text: 'Apakah anda yakin ingin menonaktifkan?',
        showConfirmButton: true,
        confirmButtonText: 'Ya',
        confirmButtonColor: '#086bff',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        cancelButtonColor: '#f44336',
      }).then((res) => {
        if (res.isConfirmed) {
          this.services.deleteJob('deleteJob', parameter).subscribe(
            (res) => {
              console.log(res);
              this.getListAllJob();
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
        }
      });
    } else if (status.empl_deleted === 'NON - ACTIVE') {
      status_empl = '0';
      let parameter = {
        empl_job_code: status.empl_job_code,
        empl_deleted: status_empl,
      };
      Swal.fire({
        position: 'center',
        icon: 'question',
        title: 'Konfirmasi',
        text: 'Apakah anda yakin ingin mengaktifkan?',
        showConfirmButton: true,
        confirmButtonText: 'Ya',
        confirmButtonColor: '#086bff',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        cancelButtonColor: '#f44336',
      }).then((res) => {
        if (res.isConfirmed) {
          this.services.deleteJob('deleteJob', parameter).subscribe(
            (res) => {
              console.log(res);
              this.getListAllJob();
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
        }
      });
    }
  }
}
