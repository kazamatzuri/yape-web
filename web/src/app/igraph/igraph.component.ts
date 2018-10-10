import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PbuttonService } from "../pbutton.service";

import * as Plotly from 'plotly.js/dist/plotly.js';
//import { Config, Data, Layout } from 'plotly.js/dist/plotly.js';

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
  displayedFields: string[];
  description: Object;
  descriptionGroups: string[];
  public graphstyle: string;
  private myId: number;
  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }

  ngOnInit() {
    this.displayedFields = [];
    Plotly.setPlotConfig({
      modeBarButtonsToRemove: ['sendDataToCloud']
    });
    this.graphstyle = "lines";
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.myId = id;
    this.pbservice.getPbutton(id).subscribe(res => {
      this.pbutton = res;
    },
      console.error
    );

    this.pbservice.getDescription(id).subscribe(res => {
      this.description = res;
      this.descriptionGroups = Object.keys(res);
      //console.log(this.descriptionGroups);
      //console.log(this.description['mgstat']);
    }, console.error);

    this.updateFields("mgstat.Glorefs");

    console.log(this.selectedFields);
  }

  updateFields(added: string) {
    console.log("requesting " + added);
    //if ('datetime' not in this.selectedFields) {
    //todo: make sure datetime is in there
    //}
    var set = added.split(".")[0];
    var field = [added.split(".")[1]];

    this.pbservice.getSpecificData(this.myId, set, field).subscribe((res: Object) => {
      var data = res;
      //console.log(res);
      this.addtoGraph(data, field);
    });

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
        'marker.size': '1.2'
      };
    }
    var graphDiv = document.getElementById('graphdiv');
    Plotly.restyle(graphDiv, update);
  }

  shareLoc() {
    var graphdiv = document.getElementById('graphdiv');
    //var xRange = graphdiv.layout.xaxis.range;
    //var yRange = graphdiv.layout.yaxis.range;
    //console.log(xRange);
  }

  addtoGraph(data, fieldname) {
    var TESTER = document.getElementById('graphdiv');
    var traces = [];
    var rawx = JSON.parse(data.x)
    var rawy = JSON.parse(data.y)
    for (var c = 0; c < rawx.length; c++) {
      for (var d = 0; d < rawy[0].length; d++) {
        if (traces[d] == null) {
          traces[d] = {};
          traces[d].type = 'scattergl';
          traces[d].marker = {};
          traces[d].name = fieldname;
          //traces[d].yaxis = 'yaxis';
          traces[d].x = [];
          traces[d].y = [];
        }
        traces[d].x.push(Date.parse(rawx[c].replace(/\//g, '-')))
        traces[d].y.push(rawy[c][d]);
      }
    }
    if (this.graphstyle == "lines") {
      for (var i = 0; i < traces.length; i++) {
        traces[i].marker.symbol = "";
        traces[i].mode = "lines";
      }
    } else {
      for (var i = 0; i < traces.length; i++) {
        traces[i].marker.symbol = "circle";
        traces[i].marker.size = 1.2;
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
    this.displayedFields.push(fieldname);
    Plotly.plot(TESTER, traces, layout);

  }


}
