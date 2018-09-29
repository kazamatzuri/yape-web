import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { PButton } from '../pbutton';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project;
  pbuttonslistSubs: Subscription;
  pbuttonslist: PButton[];

  constructor(private projects: ProjectService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.project = this.projects.getProject(id).subscribe(res => {
      this.project = res;
    },
      console.error
    );
    this.pbuttonslistSubs = this.projects.getPButtons(id).subscribe(res => {
      this.pbuttonslist = res;
    },
      console.error
    );
  }

  openPButton(pb) {
    this.router.navigate(['/pbutton/', pb.id])
  }


}
