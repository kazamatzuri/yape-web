import { Component, OnInit } from '@angular/core';
import { PButton } from '../pbutton';
import { ActivatedRoute, Router } from "@angular/router";
import { PbuttonService } from "../pbutton.service";

@Component({
  selector: 'app-pbutton',
  templateUrl: './pbutton.component.html',
  styleUrls: ['./pbutton.component.css']
})
export class PbuttonComponent implements OnInit {

  pbutton: PButton;
  textfields;
  textfieldnames = [];
  graphsub;
  currentgraphs: string[];

  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.pbservice.getPbutton(id).subscribe(res => {
      this.pbutton = res;
    },
      console.error
    );

    this.graphsub = this.pbservice.getCurrentGraphs(id).subscribe(res => {
      this.currentgraphs = Object.values(res);
      console.log(this.currentgraphs.length);
    }, console.error
    );
    this.pbservice.getTextFields(id).subscribe(res => {
      this.textfields = res;
      this.textfieldnames = Object.keys(this.textfields);
      console.log(res);
    }, console.error);



  }
  getText(name) {
    //console.log("getText called for " + name);
    var text = [];
    var obj = this.textfields[name];
    //console.log(obj);
    for (var line in obj) {
      //console.log(obj[line][0]);
      text.push(obj[line][0]);
      //console.log(obj[line][0]);
    }
    return text.join('');
  }
  generateGraphs() {
    console.log("generate " + this.pbutton);
    this.pbservice.generateGraphs(this.pbutton._id);
  }



}
