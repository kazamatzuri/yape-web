import { Injectable } from '@angular/core';
import { API_URL } from './env';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Layout } from './layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) { }
  private static _handleError(err: HttpErrorResponse | any) {
    console.log(err)
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }


  getLayouts(): Observable<any> {
    return this.http
      .get(`${API_URL}/layouts`)//, httpOptions)
      .pipe(catchError(LayoutService._handleError));
  }

  getLayout(id): Observable<any> {
    var url = `${API_URL}/layout/` + id;
    return this.http
      .get(url)
      .pipe(catchError(LayoutService._handleError));
  }

  saveProject(layout: Layout): Observable<any> {
    return this.http.post(`${API_URL}/layout`, layout) //, httpOptions)
  }

}
