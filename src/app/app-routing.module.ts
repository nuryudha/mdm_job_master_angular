import { RouterModule, Routes } from '@angular/router';

import { DetailJobComponent } from './components/job-master/detail-job/detail-job.component';
import { JobMasterComponent } from './components/job-master/job-master.component';
import { NgModule } from '@angular/core';
import { TambahJobComponent } from './components/job-master/tambah-job/tambah-job.component';

const routes: Routes = [
  { path: '', redirectTo: '/job-master', pathMatch: 'full' },
  { path: 'job-master', component: JobMasterComponent },
  { path: 'job-master2', component: DetailJobComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
