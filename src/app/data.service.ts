import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { Post } from './post.interface';
import { error } from 'console';


// For fetching an API, it is best practice to have it hosted under a service to then be injected to the rest of your application.

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/author,random/Edgar%20Allan;3`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle the error here
          console.error('API request failed:', error);
          // Display an alert or perform any other action
          // For example:
          // alert('Error fetching data from the API. Please try again later.');
          return throwError('Error fetching data from the API. Please try again later.');
        })
      );
  }
}

