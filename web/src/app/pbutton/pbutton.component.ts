import { Component, OnInit } from '@angular/core';
import { PButton } from '../pbutton';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-pbutton',
  templateUrl: './pbutton.component.html',
  styleUrls: ['./pbutton.component.css']
})
export class PbuttonComponent implements OnInit {

  pbutton;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    //this.pbutton = this.projects.getProject(id).subscribe(res => {
    //  this.project = res;
    //},
    //  console.error
    //);

  }

}
