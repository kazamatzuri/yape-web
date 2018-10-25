import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { PButton } from '../pbutton';
import { Subscription } from 'rxjs';
import { Bookmark } from '../bookmark';
import { Comment } from '../comment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {

  project: Project;

  pbuttonslist: PButton[];

  constructor(private projects: ProjectService, private route: ActivatedRoute, private router: Router) {

  }

  renderRange(bm): string {
    var range = JSON.parse(bm.xRange)
    return range[0] + " -> " + range[1]
  }

  renderCols(bm): string {
    console.log(bm.columns)
    var cols = JSON.parse(bm.columns)
    return cols.join(",")
  }
  openBookmark(bm) {
    this.router.navigate(['/pbutton/', bm.pbutton], { queryParams: { bm: bm.id } })
  }
  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.projects.getProject(id).subscribe(res => {
      this.project = res;
    },
      console.error
    );
    this.projects.getPButtons(id).subscribe(res => {
      this.pbuttonslist = res;
    },
      console.error
    );
  }

  openPButton(pb) {
    this.router.navigate(['/pbutton/', pb.id])
  }


}
