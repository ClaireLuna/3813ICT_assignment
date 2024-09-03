import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof HttpErrorResponse) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
      console.log(errorMessage);
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(errorMessage);
    }
    return throwError(new Error(errorMessage, { cause: error }));
  }
}
