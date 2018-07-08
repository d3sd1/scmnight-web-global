import {Component, Input, OnInit} from '@angular/core';
import {WebsocketsService} from '../websockets/websockets.service';
import {SnotifyService} from 'ng-snotify';
import {TranslateService} from '@ngx-translate/core';
import {UserLogin} from '../model/user-login';
import {User} from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  protected login: UserLogin = new UserLogin();
  @Input('master') masterName: string;

  constructor(private ws: WebsocketsService, private notify: SnotifyService) {
    //ws

  }

  ngOnInit() {
  }
  submitLogin() {
    this.login.processing = true;
    this.ws.subscribe('scm/login');
    this.ws.send('scm/login', this.login);
  }
}
