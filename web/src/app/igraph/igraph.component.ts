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
  traces: Array<Object>[];
  layout: Object;
  displayedFields: string[];
  description: Object;
  descriptionGroups: string[];
  public graphstyle: string;
  private myId: number;
  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }

  ngOnInit() {
    this.traces = [];
    this.displayedFields = [];
    this.layout = {
      xaxis: {
        type: 'date',
        nticks: 25
      },
      height: 600
    };
    //Plotly.setPlotConfig({
    //  modeBarButtonsToRemove: ['sendDataToCloud']
    //});
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
      this.addtoGraph(data, added);
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
    var gd = document.getElementById('graphdiv');

    var rawx = JSON.parse(data.x)
    var rawy = JSON.parse(data.y)
    //this came from a version where you could add more fields at once, i'll leave the complexity here for now,
    // because I might be using it to restore states when coming from a bookmarked location
    var newtrace;
    console.log("fieldname:" + fieldname);
    for (var c = 0; c < rawx.length; c++) {
      for (var d = 0; d < rawy[0].length; d++) {

        if (newtrace == null) {
          newtrace = {};
          newtrace.type = 'scattergl';
          newtrace.marker = {};
          newtrace.name = fieldname;
          if (this.displayedFields.length > 0) {
            newtrace.yaxis = 'y' + (this.displayedFields.length + 1);
          }
          newtrace.x = [];
          newtrace.y = [];
        }
        newtrace.x.push(Date.parse(rawx[c].replace(/\//g, '-')))
        newtrace.y.push(rawy[c][d]);
      }
    }

    if (this.graphstyle == "lines") {
      newtrace.marker.symbol = "";
      newtrace.mode = "lines";
    } else {

      newtrace.marker.symbol = "circle";
      newtrace.marker.size = 1.2;

    }


    var yxname = 'yaxis' + (this.displayedFields.length + 1);
    if (this.displayedFields.length >= 1) {
      this.layout[yxname] = {
        title: fieldname,
        side: 'right',
        autorange: 'true',
        overlaying: 'y' + this.displayedFields.length,
        datarevision: this.displayedFields.length + 1,
      };
    } else {
      this.layout['yaxis'] = {
        title: fieldname
      };
    }
    console.log(this.layout);
    console.log(this.traces);
    this.traces.push(newtrace);
    this.displayedFields.push(fieldname);
    Plotly.react(gd, this.traces, this.layout);
    /*if (this.displayedFields.length > 1) {
      Plotly.update(gd, traces, layout);
    } else {
      Plotly.plot(gd, traces, layout);
    }*/

  }


}
