import { Component, OnInit } from '@angular/core';
//import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary" class="mat-elevation-z10">
     <button mat-button routerLink=""><i class="material-icons">library_home</i> Yape</button>
     <!--<button mat-button *ngIf="authenticated" routerLink="upload"><i class="material-icons">library_add</i> Upload</button>-->
     <button mat-button routerLink="projects"><i class="material-icons">library_books</i> My Projects</button>

     <!-- This fills the remaining space of the current row -->
     <span class="fill-remaining-space"></span>

     <button mat-button routerLink="/about">About</button>
     <!--<button mat-button *ngIf="authService.isLoggedIn">{{getProfile().name}}</button>-->
     <!--<button mat-button (click)="authService.login()" *ngIf="!authService.isLoggedIn">Sign In</button>
     <button mat-button (click)="authService.logout()" *ngIf="authService.isLoggedIn">Sign Out</button>-->
   </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}
  ngOnInit() {
    const self = this;

  }
  getProfile() {
    
  }
}
