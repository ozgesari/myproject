import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransactionRequest} from '../models/transactionRequest';
import { environment } from '../../environments/environment';

@Injectable()
export class TransactionService {
  
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTransactions(transactionRequestBody: TransactionRequest, page: number) {
    let token = localStorage.getItem('access_token');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token)
    };
    return this.http.post<any>(this.baseUrl + '/api/v3/transaction/list?page=' + page, transactionRequestBody, options);
  }

  getTransactionDetails(id: string) {
    let token = localStorage.getItem('access_token');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token)
    };
    return this.http.post<any>(this.baseUrl + '/api/v3/transaction',
    { transactionId : id }, options);
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}