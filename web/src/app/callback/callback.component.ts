import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService } from '../auth/auth.service';

@Component({
  selector: 'callback',
  template: `
    <div>Loading authentication details...</div>
  `,
})
export class CallbackComponent implements OnInit {
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    const self = this;
    this.authService.handleLoginCallback();
  }
}