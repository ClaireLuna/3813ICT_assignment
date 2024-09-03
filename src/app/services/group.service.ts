import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this import
import { apiUrl } from '../../constants';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  public getGroups = (): Observable<any> => {
    return this.http
      .get<any>(apiUrl + 'group', {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };

  public createGroup = (name: string): Observable<any> => {
    let body = { name: name };
    return this.http
      .post<any>(apiUrl + 'group', body, {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };

  public deleteGroup = (id: string): Observable<any> => {
    return this.http
      .delete<any>(apiUrl + 'group', {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
        body: { id: id },
      })
      .pipe(catchError(this.errorService.handleError));
  };
}
