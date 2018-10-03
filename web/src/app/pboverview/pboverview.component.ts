import { Component, OnInit, Input } from '@angular/core';
import { PButton } from '../pbutton';

@Component({
  selector: 'pboverview',
  templateUrl: './pboverview.component.html',
  styleUrls: ['./pboverview.component.css']
})
export class PboverviewComponent implements OnInit {
  //@Input()
  //@Input('mypb') mypb: PButton;
  @Input()
  mypb: string;
  constructor() { }

  ngOnInit() {
    console.log(this.mypb);
  }

}
