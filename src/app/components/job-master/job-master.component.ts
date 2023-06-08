import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EditJobComponent } from './edit-job/edit-job.component';
import { JobMasterVariableService } from 'src/app/services/variable/job-master/job-master-variable.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { TambahJobComponent } from './tambah-job/tambah-job.component';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css'],
})
export class JobMasterComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public variable: JobMasterVariableService
  ) {}

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.variable.dataSource = new MatTableDataSource<PeriodicElement>(
      ELEMENT_DATA
    );
    this.variable.status_non_aktif = true;
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.variable.dataSource.paginator = this.MatPaginator;
    this.variable.dataSource.sort = this.sort;
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
      .subscribe((res) => {
        console.log(res);
      });
  }

  editJob() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    dialogConfig.height = '85%';
    this.dialog
      .open(EditJobComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  // changeStatus(element: any) {
  //   console.log(element);
  //   if (this.variable.status_aktif == true) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'question',
  //       title: 'Konfirmasi',
  //       text: 'Apakah anda yakin ingin mengaktifkan?',
  //       showConfirmButton: true,
  //       confirmButtonText: 'Ya',
  //       confirmButtonColor: '#335980',
  //       showCancelButton: true,
  //       cancelButtonText: 'Tidak',
  //       cancelButtonColor: '#58D68D',
  //     }).then((res) => {
  //       if (res.isConfirmed) {
  //         this.variable.status_non_aktif = true;
  //         this.variable.status_aktif = false;
  //       } else {
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'question',
  //       title: 'Konfirmasi',
  //       text: 'Apakah anda yakin ingin menonaktifkan?',
  //       showConfirmButton: true,
  //       confirmButtonText: 'Ya',
  //       confirmButtonColor: '#335980',
  //       showCancelButton: true,
  //       cancelButtonText: 'Tidak',
  //       cancelButtonColor: '#58D68D',
  //     }).then((res) => {
  //       if (res.isConfirmed) {
  //         this.variable.status_non_aktif = false;
  //         this.variable.status_aktif = true;
  //       } else {
  //       }
  //     });
  //   }
  // }

  changeStatus(element: PeriodicElement) {
    console.log(element);
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Konfirmasi',
      text: `Apakah Anda yakin ingin ${
        element.showChangeStatusButton ? 'menonaktifkan' : 'mengaktifkan'
      }?`,
      showConfirmButton: true,
      confirmButtonText: 'Ya',
      confirmButtonColor: '#335980',
      showCancelButton: true,
      cancelButtonText: 'Tidak',
      cancelButtonColor: '#58D68D',
    }).then((res) => {
      if (res.isConfirmed) {
        element.showChangeStatusButton = !element.showChangeStatusButton;
      }
    });
  }
}

// ! ------------------------  DUMMY --------------------------------------------
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  showChangeStatusButton: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    showChangeStatusButton: false,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    showChangeStatusButton: false,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    showChangeStatusButton: false,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    showChangeStatusButton: true,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    showChangeStatusButton: false,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    showChangeStatusButton: true,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    showChangeStatusButton: false,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    showChangeStatusButton: true,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    showChangeStatusButton: false,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    showChangeStatusButton: false,
  },
];
