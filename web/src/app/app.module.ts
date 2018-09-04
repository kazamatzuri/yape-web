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



const appRoutes: Routes = [
  { path: 'new-project', component: ProjectFormComponent },
  { path: '', component: ProjectsComponent },
  { path: 'callback', component: CallbackComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectFormComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    )
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
