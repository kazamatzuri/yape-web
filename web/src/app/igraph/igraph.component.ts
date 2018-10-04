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
  public searchText: string;
  selectedFields: string[] = ['Glorefs'];
  fields;
  public graphstyle: string;
  private myId: number;
  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }


  ngOnInit() {
    this.graphstyle = "lines";
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.myId = id;
    this.pbservice.getPbutton(id).subscribe(res => {
      this.pbutton = res;
    },
      console.error
    );
    //.map((response:Response) => response.json())
    this.pbservice.getData(id).subscribe((res: Object) => {
      this.rawdata = res;
      //console.log(res);
      this.drawGraph();
    },
      console.error
    );
    this.pbservice.getFields(id).subscribe((res: Object) => {
      this.fields = res;
    }, console.error);

    console.log(this.selectedFields);
  }

  updateFields() {
    console.log("requesting " + this.selectedFields);
    //if ('datetime' not in this.selectedFields) {
    //todo: make sure datetime is in there
    //}
    this.pbservice.getData(this.myId, this.selectedFields).subscribe((res: Object) => {
      this.rawdata = res;
      //console.log(res);
      this.drawGraph();
    });

  }

  onNgModelChange(event) {
    console.log('on ng model change', event);
    console.log(this.selectedFields);
  }

  updateGraphStyle() {
    var update = {};
    if (this.graphstyle == "lines") {

      update = {
        'mode': 'lines',
        opacity: 1.0,
        'marker.symbol': 'line'
      };
    }
    else {

      update = {
        'mode': 'markers',
        'marker.symbol': 'circle',
        'marker.size': '1.1'
      };
    }

    var graphDiv = document.getElementById('graphdiv');
    Plotly.restyle(graphDiv, update);
  }

  drawGraph() {
    Plotly.setPlotConfig({
      modeBarButtonsToRemove: ['sendDataToCloud']
    });
    var TESTER = document.getElementById('graphdiv');
    var traces = [];
    var rawx = JSON.parse(this.rawdata.x)
    var rawy = JSON.parse(this.rawdata.y)
    for (var c = 0; c < rawx.length; c++) {
      for (var d = 0; d < rawy[0].length; d++) {
        if (traces[d] == null) {
          traces[d] = {};
          traces[d].marker = {};
          traces[d].name = this.selectedFields[d];
          traces[d].yaxis = this.selectedFields[d];
          traces[d].x = [];
          traces[d].y = [];
        }
        traces[d].x.push(Date.parse(rawx[c].replace(/\//g, '-')))
        traces[d].y.push(rawy[c][d]);
      }
    }
    console.log(traces);

    //see https://plot.ly/python/reference/#scattergl-mode
    //for doc
    if (this.graphstyle == "lines") {
      for (var i = 0; i < traces.length; i++) {
        traces[i].marker.symbol = "";
        traces[i].mode = "lines";
      }
    } else {
      for (var i = 0; i < traces.length; i++) {
        traces[i].marker.symbol = "circle";
      }
    }


    var layout = {
      xaxis: {
        type: 'date',
        nticks: 25
      },
      height: 600
    };
    //console.log(data);
    Plotly.newPlot(TESTER, traces, layout);

  }

}
