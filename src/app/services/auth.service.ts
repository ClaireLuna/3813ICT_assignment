import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../../constants';
import { ErrorService } from './error.service';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private isBrowser!: boolean;
  private _user: User | undefined;

  public get user(): User | undefined {
    // Get from local storage if it's undefined
    if (!this._user && this.isBrowser) {
      const user = localStorage.getItem('user');
      console.log('user', user);

      if (user) {
        this._user = JSON.parse(user);
      }
    }
    return this._user;
  }

  public set user(user: User | undefined) {
    if (this.isBrowser) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
    this._user = user;
  }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http
      .post<HttpResponse<any>>(apiUrl + 'login', body, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<HttpResponse<any>> {
    const body = {
      username: username,
      email: email,
      password: password,
    };

    return this.http
      .post<HttpResponse<any>>(apiUrl + 'register', body, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  getAuthHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', this._user?.apiToken || '');
    return headers;
  }
}
