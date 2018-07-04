import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {Channel} from '../model/channel';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsConnectorService {
  private connectingPromise: Promise<void> = null;
  private ws: WebSocket = null;

  constructor() {
    this.connect();
  }

  private connect(): Promise<void> {
    return new Promise((resolveCon, rejectCon) => {
        if (null === this.connectingPromise && null === this.ws) {
          this.connectingPromise = new Promise((resolveWS, rejectWS) => {
            const tmpWs = new WebSocket('wss://echo.websocket.org');
            tmpWs.onopen = (ev: Event) => {
              this.ws = tmpWs;
              resolveWS();
            };
            tmpWs.onerror = (ev: Event) => {
              console.error('CONNECT ERROR', ev);
              rejectWS();
            };
          });
          this.connectingPromise.then(() => {
            this.connectingPromise = null;
            resolveCon();
          });
          this.connectingPromise.catch(() => {
            this.connectingPromise = null;
            rejectCon();
          });
        } else if (null !== this.ws) {
          resolveCon();
        } else if (null === this.ws && null !== this.connectingPromise) {
          this.connectingPromise.then(() => {
            resolveCon();
          }).catch(() => {
            rejectCon();
          });
        } else {
          console.log('UNPECTED SOCKETS ERROR');
          rejectCon();
        }
      }
    );
  }

  public send(channelName: string, data: any) {
    this.connect().then(() => {
      const obj = new Channel(channelName, data, data.constructor.name);
      console.log('send',obj);
      this.ws.send(JSON.stringify(obj));
    });
  }

  public subscribe(channelName: string) {
    this.connect().then(() => {
      this.ws.onmessage = (ev: Event) => {
        const unserializedData = JSON.parse(ev['data']);
        const channel = new Channel();
        channel.deserialize(unserializedData);
        // TODO: que se deserialice al objeto correspondiente en lugar de a Object común.
        if (channelName === channel.name) {
          console.log('on channel');
        }
      };
    });
  }

}
