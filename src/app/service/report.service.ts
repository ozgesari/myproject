import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReportRequest } from '../models/reportRequest';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getReport(reportRequestBody: ReportRequest) {
    let token = localStorage.getItem('access_token');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token)
    };
    console.log(reportRequestBody);
    return this.http.post<any>(this.baseUrl + '/api/v3/transactions/report', reportRequestBody, options);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}