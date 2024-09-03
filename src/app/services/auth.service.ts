import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../../constants';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

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
}
