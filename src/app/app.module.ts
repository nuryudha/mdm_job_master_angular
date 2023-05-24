import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { JobMasterComponent } from './components/job-master/job-master.component';
import { KosongComponent } from './components/kosong/kosong.component';
import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent, JobMasterComponent, KosongComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
