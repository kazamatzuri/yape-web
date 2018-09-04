import * as Auth0 from 'auth0-web';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectsListSubs: Subscription;
  projectsList: Project[];
  authenticated = false;


  constructor(private projects: ProjectService) {
  }

  ngOnInit() {
    this.projectsListSubs = this.projects
      .getProjects()
      .subscribe(res => {
        this.projectsList = res;
      },
        console.error
      );
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));

  }

  ngOnDestroy() {
    this.projectsListSubs.unsubscribe();
  }

}
