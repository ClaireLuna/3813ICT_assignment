import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../constants';
import { catchError, Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  public getChannels = (groupId: string): Observable<any> => {
    return this.http
      .get<any>(apiUrl + 'channel/' + groupId, {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };

  public createChannel = (groupId: string, name: string): Observable<any> => {
    let body = { name: name };
    return this.http
      .post<any>(apiUrl + 'channel/' + groupId, body, {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };

  public deleteChannel = (id: string): Observable<any> => {
    return this.http
      .delete<any>(apiUrl + 'channel/' + id, {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };

  public getChannel = (id: string): Observable<any> => {
    return this.http
      .get<any>(apiUrl + 'channel/get/' + id, {
        observe: 'response',
        headers: this.authService.getAuthHeader(),
      })
      .pipe(catchError(this.errorService.handleError));
  };
}
