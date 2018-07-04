import {Injectable, Optional} from '@angular/core';
import {WebSocketSubject} from 'rxjs/webSocket';
import {Observable, Observer, Subject} from 'rxjs';
import {WebsocketsConnectorService} from './websockets-connector.service';
import { map, filter, scan } from 'rxjs/operators';
import {User} from '../model/user';
export interface Message {
  author: string,
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  private loading = false;
  private _con: WebSocketSubject<String>; // cast to my obj
  public messages: Subject<Message>;

  constructor(wsService: WebsocketsConnectorService) {
    wsService.subscribe('scm/channel');
    wsService.send('scm/channel1', new User('test', 'pass'));
  }
  public get con() {
    return this.con;
  }
}
