import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PbuttonService } from "../pbutton.service";

import * as Plotly from 'plotly.js/dist/plotly.js';
import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';

@Component({
  selector: 'igraph',
  templateUrl: './igraph.component.html',
  styleUrls: ['./igraph.component.css']
})
export class IgraphComponent implements OnInit {
  pbutton;
  rawdata;
  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }


  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.pbutton = this.pbservice.getPbutton(id).subscribe(res => {
      this.pbutton = res;
    },
      console.error
    );
    this.rawdata = this.pbservice.getData(id).subscribe((res: Object) => {
      this.rawdata = res;
      //console.log(res);
      this.drawGraph();
    },
      console.error
    );
  }

  drawGraph() {
    Plotly.setPlotConfig({
      modeBarButtonsToRemove: ['sendDataToCloud']
    });
    var TESTER = document.getElementById('graphdiv');
    var x = [];
    var y = [];
    for (var row of this.rawdata) {
      x.push(Date.parse(row[0].replace(/\//g, '-')));
      y.push(row[1]);
    }
    console.log(x[0]);
    var data = [{
      x: x,
      y: y
    }];
    var layout = {
      xaxis: {
        type: 'date',
        nticks: 25
      },
      height: 600,
      title: 'glorefs test'
    };
    //console.log(data);
    Plotly.plot(TESTER, data, layout);

  }

}
