import { Injectable } from '@angular/core';
import { API_URL } from './env';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PbuttonService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    console.log(err)
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  generateGraphs(id) {
    var url = `${API_URL}/pbutton/` + id + '/graphs';
    console.log("generating " + id + "," + url);
    var res = this.http
      .put(url, { test: "a" }).toPromise()
      .then((response) => response);
    //.pipe(catchError(PbuttonService._handleError));

    return res;
  }

  getCurrentGraphs(id) {
    var url = `${API_URL}/pbutton/` + id + '/graphs';
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

  getData(id): Observable<any> {
    var url = `${API_URL}/pbutton/` + id + '/data';
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

  getFields(id): Observable<any> {
    var url = `${API_URL}/pbutton/` + id + '/fields';
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }


  getTextFields(id): Observable<any> {
    var url = `${API_URL}/pbutton/` + id + '/textfields';
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

  getPbutton(id): Observable<any> {
    console.log("getting pb " + id);

    var url = `${API_URL}/pbutton/` + id;
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

}
