import { RouterModule, Routes } from '@angular/router';

import { JobMasterComponent } from './components/job-master/job-master.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/job-master', pathMatch: 'full' },
  { path: 'job-master', component: JobMasterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
