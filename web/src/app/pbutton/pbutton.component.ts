import { Component, OnInit } from '@angular/core';
import { PButton } from '../pbutton';
import { ActivatedRoute, Router } from "@angular/router";
import { PbuttonService } from "../pbutton.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pbutton',
  templateUrl: './pbutton.component.html',
  styleUrls: ['./pbutton.component.css']
})
export class PbuttonComponent implements OnInit {

  pbutton;
  graphsub;
  currentgraphs: string[];

  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.pbutton = this.pbservice.getPbutton(id).subscribe(res => {
      this.pbutton = res;
    },
      console.error
    );

    this.graphsub = this.pbservice.getCurrentGraphs(id).subscribe(res => {
      this.currentgraphs = Object.values(res);
    }, console.error
    );



  }

  generateGraphs() {
    console.log("generate " + this.pbutton);
    this.pbservice.generateGraphs(this.pbutton.id);
  }



}
