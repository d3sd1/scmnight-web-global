import { Component, OnInit } from '@angular/core';
import {WebsocketsService} from '../websockets/websockets.service';

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