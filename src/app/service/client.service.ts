import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ClientService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getClientDetails(id: string) {
    let token = localStorage.getItem('access_token');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token)
    };
    return this.http.post<any>(this.baseUrl  + '/api/v3/client',
    { transactionId : id }, options);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    console.log('Logged in:', localStorage.getItem('access_token') !== null)
    return (localStorage.getItem('access_token') !== null);
  }
}