import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from '../constants';

interface userResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password,
    };

    return this.http.post<userResponse>(apiUrl + 'login', body);
  }
}
