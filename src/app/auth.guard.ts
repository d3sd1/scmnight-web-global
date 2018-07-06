import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {WebsocketsService} from './websockets/websockets.service';
import {User} from './model/user';
import {SnotifyService} from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ws: WebsocketsService, private notify: SnotifyService) {

//TODO: que estofuncione
  }
  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.ws.subscribe('scm/channel');
    this.ws.send('scm/channel', new User('test', 'pass'));
    return true;
  }
}
