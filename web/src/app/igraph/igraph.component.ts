import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PbuttonService } from "../pbutton.service";

@Component({
  selector: 'igraph',
  templateUrl: './igraph.component.html',
  styleUrls: ['./igraph.component.css']
})
export class IgraphComponent implements OnInit {
  pbutton;
  constructor(private route: ActivatedRoute, private pbservice: PbuttonService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.pbutton = this.pbservice.getPbutton(id).subscribe(res => {
      this.pbutton = res;
    },
      console.error
    );
    this.drawGraph();
  }

  drawGraph() {
    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    };

    var trace2 = {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      type: 'scatter'
    };

    var data = [trace1, trace2];

    Plotly.newPlot('myDiv', data);

  }

}
