import { Component, OnInit } from '@angular/core';
//import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary" class="mat-elevation-z10">
     <button mat-button *ngIf="authenticated" routerLink=""><i class="material-icons">library_home</i> Yape</button>
     <button mat-button *ngIf="authenticated" routerLink="upload"><i class="material-icons">library_add</i> Upload</button>
     <button mat-button *ngIf="authenticated" routerLink="projects"><i class="material-icons">library_books</i> My Projects</button>

     <!-- This fills the remaining space of the current row -->
     <span class="fill-remaining-space"></span>

     <button mat-button routerLink="/about">About</button>
     <!--<button mat-button *ngIf="authenticated">{{getProfile().name}}</button>
     <button mat-button (click)="signIn()" *ngIf="!authenticated">Sign In</button>
     <button mat-button (click)="signOut()" *ngIf="authenticated">Sign Out</button>-->
   </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated = true;

  //signIn = Auth0.signIn;
  //signOut = Auth0.signOut;

  ngOnInit() {
    //const self = this;
    //Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }
  getProfile() {
    //return Auth0.getProfile()
  }
}
