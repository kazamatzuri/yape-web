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

  getPButton(id): Observable<any> {
    console.log("getting pb " + id);
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };*/
    var url = `${API_URL}/pbutton/` + id;
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError(PbuttonService._handleError));
  }

}
