import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilterPipe } from './filter.pipe';
import { ProjectService } from './project.service';
//import { PbuttonService } from './pbutton.service';
import { ProjectsComponent } from './projects/projects.component';

import { ProjectFormComponent } from './projects/project-form.component';
import { RouterModule, Routes } from '@angular/router';
//import { CallbackComponent } from './callback/callback.component';
//import * as Auth0 from 'auth0-web';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatIconModule } from '@angular/material';
import { MatSidenavModule, MatListModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

import { UploadModule } from './upload/upload.module';
import { ProjectComponent } from './project/project.component';
import { PbuttonComponent } from './pbutton/pbutton.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { ImageDeckComponent } from './image-deck/image-deck.component';
import { IgraphComponent } from './igraph/igraph.component';
import { PlotlyModule } from 'angular-plotly.js';
import { MatRadioModule } from '@angular/material/radio';
import { PboverviewComponent } from './pboverview/pboverview.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const appRoutes: Routes = [
  { path: 'new-project', component: ProjectFormComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'pbutton/:id', component: PbuttonComponent },
  { path: '', component: HomeComponent },
  //{ path: 'callback', component: CallbackComponent },
  { path: 'about', component: AboutComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectFormComponent,
    //CallbackComponent,
    AboutComponent,
    HomeComponent,
    ProjectComponent,
    PbuttonComponent,
    ImageCardComponent,
    ImageDeckComponent,
    FilterPipe,
    IgraphComponent,
    PboverviewComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PlotlyModule,
    MatRadioModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    NoopAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    CommonModule, MatButtonModule, MatToolbarModule, MatNativeDateModule,
    MatIconModule, MatSidenavModule, MatListModule, MatInputModule,
    MatCardModule,
    UploadModule,
    MatProgressSpinnerModule,

  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    /*Auth0.configure({
      domain: 'yape-web.auth0.com',
      audience: 'https://yape.iscinternal.com/api',
      clientID: 'nlNNFnZV0NRTorLtIUOVwaQWDXcv1GNZ',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:projects'
    });*/
  }
}
