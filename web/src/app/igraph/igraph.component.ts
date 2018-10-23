import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PbuttonService } from "../pbutton.service";
import { Bookmark } from "../bookmark";

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
  showSpinner: Boolean;
  displayedFields: string[];
  description: Object;
  descriptionGroups: string[];
  public graphstyle: string;
  private myId: number;
  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }

  ngOnInit() {
    this.showSpinner = true;
    this.traces = [];
    this.displayedFields = [];
    this.layout = {
      xaxis: {
        type: 'date',
        nticks: 25,
        domain: [0, 1],
      },
      // margin: { r: 300 },
      height: 600,

      showlegend: true
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

  deleteFields(toremove: string) {
    //// TODO:
    var idx = -1;
    for (var i = 0; i < this.traces.length; i++) {
      if (this.traces[i]['name'] == toremove) {
        idx = i;
      }
    }
    console.log("remove idx" + idx);
    var gd = document.getElementById('graphdiv');
    Plotly.deleteTraces(gd, idx);
    this.displayedFields = this.displayedFields.splice(this.displayedFields.indexOf(toremove), 1)
    this.adjustLegend();


  }
  updateFields(added: string) {
    console.log("requesting " + added);
    //if ('datetime' not in this.selectedFields) {
    //todo: make sure datetime is in there
    //}
    console.log(this.displayedFields);
    if (this.displayedFields.indexOf(added) != -1) {
      return;
    }
    var set = added.split(".")[0];
    var field = [added.split(".")[1]];
    this.showSpinner = true;
    this.pbservice.getSpecificData(this.myId, set, field).subscribe((res: Object) => {
      var data = res;
      //console.log(res);
      this.showSpinner = false;
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

  createBookmark() {
    var graphdiv = (<Plotly>document.getElementById('graphdiv'));
    var xRange = graphdiv.layout.xaxis.range;
    var yRange = graphdiv.layout.yaxis.range;

    var state: Bookmark = {
      yRange: yRange,
      xRange: xRange,
      columns: JSON.stringify(this.displayedFields),
      pbutton: this.pbutton.id,
      project: this.pbutton.project_id
    };
    this.pbservice.saveBookmark(state).subscribe(res => {
      var bookmark = res;
      console.log("bookmark result" + bookmark);

      //TODO: display bookmark url in dialog
    }, console.error);


    //console.log(encodeURI(JSON.stringify(state)));
  }

  addtoGraph(data, fieldname) {
    var gd = document.getElementById('graphdiv');

    var rawx = JSON.parse(data.x)
    var rawy = JSON.parse(data.y)
    var newtrace;
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
        newtrace.x.push(new Date(rawx[c]))
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
        rang: [0],
        //autorange: 'true',
        overlaying: 'y',
        //datarevision: this.displayedFields.length + 1,
        anchor: 'free',
        showline: true,
      };
    } else {
      this.layout['yaxis'] = {
        title: fieldname,
        side: 'left',
      };
    }


    this.traces.push(newtrace);
    this.displayedFields.push(fieldname);
    this.adjustLegend();
    Plotly.react(gd, this.traces, this.layout);
    /*if (this.displayedFields.length > 1) {
      Plotly.update(gd, traces, layout);
    } else {
      Plotly.plot(gd, traces, layout);
    }*/

  }

  adjustLegend() {
    console.log(this.layout);
    var yxname: string;
    var axisspace = 0.032;
    this.layout['xaxis'].domain[1] = 1 - (this.displayedFields.length - 1) * axisspace;
    for (var i = 1; i < this.displayedFields.length; i++) {
      if (i > 0) {
        yxname = 'yaxis' + (i + 1);
      } else {
        yxname = 'yaxis';
      }
      this.layout[yxname].position = this.layout['xaxis'].domain[1] +
        (i * axisspace);
    }
  }


}
