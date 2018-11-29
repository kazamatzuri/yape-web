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
    return this.http
      .get(`${API_URL}/project/` + id + '/pbuttons')
      .pipe(catchError(ProjectService._handleError));
  }
  // GET list of public, future events
  getProjects(): Observable<any> {
    return this.http
      .get(`${API_URL}/projects`)
      .pipe(catchError(ProjectService._handleError));
  }

  getProject(id): Observable<any> {
    var url = `${API_URL}/project/` + id;
    console.log(url);
    return this.http
      .get(url)
      .pipe(catchError(ProjectService._handleError));
  }

  saveProject(project: Project): Observable<any> {

    return this.http.post(`${API_URL}/projects`, project)
  }
}
