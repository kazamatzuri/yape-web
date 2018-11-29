import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from './env';
import { Project } from './project';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient,private authService: AuthService) {
  }
  private static _handleError(err: HttpErrorResponse | any) {
    console.log(err)
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getPButtons(id): Observable<any> {
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };*/
    return this.http
      .get(`${API_URL}/project/` + id + '/pbuttons')
      .pipe(catchError(ProjectService._handleError));
  }
  // GET list of public, future events
  getProjects(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.accessToken}`
      })
    };

    return this.http
      .get(`${API_URL}/projects`, httpOptions)
      .pipe(catchError(ProjectService._handleError));
  }

  getProject(id): Observable<any> {
    console.log("getting" + 1);
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };*/
    var url = `${API_URL}/project/` + id;
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError(ProjectService._handleError));
  }

  saveProject(project: Project): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Bearer ${Auth0.getAccessToken()}`
    //   })
    // };
    return this.http.post(`${API_URL}/projects`, project) //, httpOptions)
  }
}
