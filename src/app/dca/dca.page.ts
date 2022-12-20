import { Component, OnInit } from '@angular/core';
import {DcaService} from '../services/dca.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {DatabaseService} from '../services/database.service';

@Component({
  selector: 'app-dca',
  templateUrl: './dca.page.html',
  styleUrls: ['./dca.page.scss'],
})
export class DCAPage implements OnInit {

  fabIsVisible = true;

  constructor(public dcaService: DcaService, private authService: AuthService,
              private dbService: DatabaseService) { }

  logScrollStart(): void {
    this.fabIsVisible = false;
  }

  logScrollEnd(): void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }

  ngOnInit() {
  }

}
