import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjectService } from './project.service';
import { ProjectsComponent } from './projects/projects.component';

import { ProjectFormComponent } from './projects/project-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import * as Auth0 from 'auth0-web';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatCardModule } from '@angular/material';
import { AboutComponent } from './about/about.component';


const appRoutes: Routes = [
  { path: 'new-project', component: ProjectFormComponent },
  { path: '', component: ProjectsComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'about', component: AboutComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectFormComponent,
    CallbackComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'yape-web.auth0.com',
      audience: 'https://yape.iscinternal.com/api',
      clientID: 'nlNNFnZV0NRTorLtIUOVwaQWDXcv1GNZ',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:projects'
    });
  }
}
