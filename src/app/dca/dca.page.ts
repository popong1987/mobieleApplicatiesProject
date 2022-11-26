import { Component, OnInit } from '@angular/core';
import {DcaService} from '../services/dca.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dca',
  templateUrl: './dca.page.html',
  styleUrls: ['./dca.page.scss'],
})
export class DCAPage implements OnInit {

  fabIsVisible = true;

  constructor(public dcaService: DcaService) { }

  logScrollStart(): void {
    this.fabIsVisible = false;
  }

  logScrollEnd(): void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }

  ngOnInit() {
  }

}
