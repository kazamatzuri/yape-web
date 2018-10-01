import { Component, OnInit, Input } from '@angular/core';
import { API_URL } from '../env';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent implements OnInit {
  @Input() imgurl: string;
  apipath: string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.apipath = API_URL;

  }
  getUrl() {
    var cpath = window.location.pathname;
    return this.apipath + cpath + "/" + this.imgurl;
  }

}
