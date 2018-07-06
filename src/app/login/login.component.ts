import { Component, OnInit } from '@angular/core';
import {WebsocketsService} from '../websockets/websockets.service';
import {SnotifyService} from 'ng-snotify';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ws: WebsocketsService) {
    //ws

  }

  ngOnInit() {
  }

}
