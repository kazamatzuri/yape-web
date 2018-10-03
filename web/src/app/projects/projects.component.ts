//import * as Auth0 from 'auth0-web';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectsListSubs: Subscription;
  projectsList: Project[];
  authenticated = false;


  constructor(private projects: ProjectService, private router: Router) {
  }

  ngOnInit() {
    this.projectsListSubs = this.projects
      .getProjects()
      .subscribe(res => {
        this.projectsList = res;
      },
        console.error
      );
    //const self = this;
    //Auth0.subscribe((authenticated) => (self.authenticated = authenticated));

  }

  openProject(project) {
    this.router.navigate(['/project/', project.id])
  }


  ngOnDestroy() {
    this.projectsListSubs.unsubscribe();
  }

}
