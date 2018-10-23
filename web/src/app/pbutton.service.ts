import { Injectable } from '@angular/core';
import { API_URL } from './env';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bookmark } from './bookmark';

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

  saveBookmark(data: Bookmark) {
    ///pbutton/<id>/data/<set>
    var url = `${API_URL}/bookmark`;
    return this.http
      .post(url, JSON.stringify(data))
      .pipe(catchError(PbuttonService._handleError));
  }

  loadBookmark(key: string) {
    var url = `${API_URL}/bookmark/` + key;
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

  getSpecificData(id, set, field) {
    ///pbutton/<id>/data/<set>
    var url = `${API_URL}/pbutton/` + id + '/data/' + set;
    return this.http
      .post(url, JSON.stringify(field))
      .pipe(catchError(PbuttonService._handleError));
  }

  getCurrentGraphs(id) {
    var url = `${API_URL}/pbutton/` + id + '/graphs';
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

  getData(id, fields = null): Observable<any> {
    var url = `${API_URL}/pbutton/` + id + '/data';
    console.log("url:" + url);
    console.log("fields:" + fields);
    if (fields == null) {
      console.log("get");
      return this.http
        .get(url)
        .pipe(catchError(PbuttonService._handleError));
    } else {
      console.log("post");
      return this.http
        .post(url, JSON.stringify(fields))
        .pipe(catchError(PbuttonService._handleError));
    }
  }


  getFields(id): Observable<any> {
    var url = `${API_URL}/pbutton/` + id + '/fields';
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

  getDescription(id): Observable<any> {
    var url = `${API_URL}/pbutton/` + id + '/describe';
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }


  getTextFields(id): Observable<any> {
    var url = `${API_URL}/pbutton/` + id + '/textfields';
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
