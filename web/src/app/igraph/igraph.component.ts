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
  private fields: string[];
  public graphstyle: string;

  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }


  ngOnInit() {
    this.graphstyle = "lines";
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
    this.pbservice.getFields(id).subscribe((res: string[]) => {
      this.fields = res;
    }, console.error);
  }

  updateGraphStyle() {
    var update = {};
    if (this.graphstyle == "lines") {
      update = {
        'mode': 'lines',
        opacity: 1.0,
        'marker.symbol': 'line'
      };
    } else {
      update = {
        'mode': 'markers',
        'marker.symbol': 'circle',
      }
    }
    var graphDiv = document.getElementById('graphdiv');
    Plotly.restyle(graphDiv, update, 0);
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
    //see https://plot.ly/python/reference/#scattergl-mode
    //for doc
    var data = [{
      type: "scattergl",
      mode: "markers",
      marker: {
        symbol: "circle",
        size: 1
      },
      x: x,
      y: y
    }];

    if (this.graphstyle == "lines") {
      data[0].marker.symbol = "";
      data[0].mode = "lines";
    } else {
      data[0].marker.symbol = "circle";
    }


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
