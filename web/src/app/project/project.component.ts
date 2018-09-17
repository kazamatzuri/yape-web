import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public project;

  constructor(private projects: ProjectService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.project = this.projects.getProject(id).subscribe(res => {
      this.project = res;
    },
      console.error
    );
  }



}
