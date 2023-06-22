import { AlfabetOnlyDirective } from './directives/alfabet-only.directive';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EditJobComponent } from './components/job-master/edit-job/edit-job.component';
import { HttpClientModule } from '@angular/common/http';
import { JobMasterComponent } from './components/job-master/job-master.component';
import { KosongComponent } from './components/kosong/kosong.component';
import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { NoSpecialCharacterDirective } from './directives/no-special-character.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { TambahJobComponent } from './components/job-master/tambah-job/tambah-job.component';

@NgModule({
  declarations: [
    AppComponent,
    JobMasterComponent,
    KosongComponent,
    TambahJobComponent,
    EditJobComponent,
    NumberOnlyDirective,
    AlfabetOnlyDirective,

    NoSpecialCharacterDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
