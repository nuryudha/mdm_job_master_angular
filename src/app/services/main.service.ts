import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions: Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  getAllJob(endPoint: string): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(environment.job_master_java + endPoint, httpOptions)
      .pipe();
  }

  insertUpdateJob(
    endPoint: string,
    parameter: any
  ): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(environment.job_master_java + endPoint, parameter, httpOptions)
      .pipe();
  }

  deleteJob(endPoint: string, parameter: any): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(environment.job_master_java + endPoint, parameter, httpOptions)
      .pipe();
  }
}
