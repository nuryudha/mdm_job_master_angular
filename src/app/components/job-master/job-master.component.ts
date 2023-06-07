import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TambahJobComponent } from './tambah-job/tambah-job.component';

@Component({
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.css'],
})
export class JobMasterComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ngAfterViewInit();
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.status_non_aktif = true;
  }

  @ViewChild(MatPaginator) MatPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'name',
    'position',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  searchJob: any;
  status_aktif = false;
  status_non_aktif = false;

  ngAfterViewInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.dataSource.sort = this.sort;
  }

  tambahJob() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    dialogConfig.width = '70%';
    dialogConfig.height = '85%';
    this.dialog
      .open(TambahJobComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
      });
  }

  changeStatus() {
    if (this.status_aktif == true) {
      this.status_non_aktif = true;
      this.status_aktif = false;
    } else {
      this.status_non_aktif = false;
      this.status_aktif = true;
    }
  }
}

// ! ------------------------  DUMMY --------------------------------------------
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
