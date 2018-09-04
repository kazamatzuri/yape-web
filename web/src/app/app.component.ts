import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from './project.service';
import { Project } from './project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'web';
  projectsListSubs: Subscription;
  projectsList: Project[];

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
  }

  ngOnDestroy() {
    this.projectsListSubs.unsubscribe();
  }
}
