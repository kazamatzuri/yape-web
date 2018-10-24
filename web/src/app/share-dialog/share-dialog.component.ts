import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { PButton } from "../pbutton";

import { Location } from "@angular/common";
export interface DialogData {
  url: string;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShareDialogComponent implements OnInit {
  url: string;
  pbutton: PButton;

  constructor(public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NavigationType, private router: Router, private location: Location) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  copyLink(el): void {
    el.select()
    document.execCommand('copy')
    el.setSelectionRange(0, 0)
  }
  getUrl() {
    var host = document.location.href.split("?")[0]
    return host + "?bm=" + this.data['url'];
  }
  ngOnInit() {
    this.pbutton = this.data['pbutton'];
    this.url = this.data['url'];// will log the entire data object

  }




}
