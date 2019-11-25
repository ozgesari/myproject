import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
  
    // tslint:disable-next-line: max-line-length
    return this.http.post<{token: string, status: string}>('https://sandbox-reporting.rpdpymnt.com/api/v3/merchant/user/login', {email: email, password:password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}