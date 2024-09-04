import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../constants';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  public getUsers = (): Observable<any> => {
    return this.http
      .get<any>(apiUrl + 'user', {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };

  public deleteUser = (id: string): Observable<any> => {
    return this.http
      .delete<any>(apiUrl + 'user/' + id, {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };

  public updateUser = (id: string, role: string): Observable<any> => {
    let body = { role: role };
    return this.http
      .put<any>(apiUrl + 'user/' + id, body, {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };
}
