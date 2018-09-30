import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-deck',
  templateUrl: './image-deck.component.html',
  styleUrls: ['./image-deck.component.css']
})
export class ImageDeckComponent implements OnInit {

  @Input() items: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
