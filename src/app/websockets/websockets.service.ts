import {Injectable, Optional} from '@angular/core';
import {SnotifyService, SnotifyToast} from 'ng-snotify';
import {environment} from '../../environments/environment';
import {Channel} from './channel';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  private connectingPromise: Promise<void> = null;
  private ws: WebSocket = null;
  private wsReconnecting = null;
  private wsReconAfterShutdown = false;
  private notReco;
  private notError;
  private notClose;

  constructor(private notify: SnotifyService, private translate: TranslateService) {
    this.getStickyConnection(null);
  }

  private getStickyConnection(callback) {
    this.connect().then(callback).catch((err) => {
      this.connectingPromise = null;
      this.ws = null;
      if (null === this.wsReconnecting) {
        this.wsReconnecting = setTimeout(() => this.getStickyConnection(callback), environment.wsReconnectInterval);
      }
      if (environment.debug) {
        console.debug('Sticky connection error:', err);
      }
    });
  }

  private connect(): Promise<void> {
    return new Promise((resolveCon, rejectCon) => {
        if (null === this.connectingPromise && null === this.ws) {
          this.connectingPromise = new Promise((resolveWS, rejectWS) => {
            const tmpWs = new WebSocket(environment.wsServer);
            let wsConnected = false;
            tmpWs.onopen = (ev: Event) => {
              this.ws = tmpWs;
              wsConnected = true;
              if (null !== this.wsReconnecting || this.wsReconAfterShutdown) {
                this.wsReconAfterShutdown = false;
                this.translate.get('notifications.ws.recon').subscribe((not: string[]) => {
                  this.notify.remove(this.notClose);
                  this.notify.remove(this.notError);
                  this.notReco = this.notify.info(not['desc'], not['title'], {
                    'timeout': 2000,
                    'closeOnClick': true
                  });
                });
                this.wsReconnecting = null;
              }
              resolveWS();
            };
            tmpWs.onerror = (ev: Event) => {
              if (null === this.wsReconnecting) {
                this.translate.get('notifications.ws.con_err').subscribe((not: string[]) => {
                  this.notify.remove(this.notReco);
                  this.notify.remove(this.notClose);
                  this.notError = this.notify.error(not['desc'], not['title'], {
                    'timeout': 0,
                    'closeOnClick': false
                  });
                });
              }
              rejectWS();
            };
            tmpWs.onclose = (ev: Event) => {
              if (wsConnected) {
                this.translate.get('notifications.ws.con_discon').subscribe((not: string[]) => {
                  this.notify.remove(this.notReco);
                  this.notify.remove(this.notError);
                  this.notClose = this.notify.warning(not['desc'], not['title'], {
                    'timeout': 0,
                    'closeOnClick': true
                  });
                });
                wsConnected = false;
                this.connectingPromise = null;
                this.ws = null;
                this.wsReconAfterShutdown = true;
                setTimeout(() => this.getStickyConnection(null), environment.wsReconnectInterval);
              }
              rejectWS();
            };
          }).then(() => {
            resolveCon();
          }).catch(() => {
            if (null !== this.wsReconnecting) {
              this.wsReconnecting = null;
            }
            rejectCon();
          });

        } else if (null === this.ws && null !== this.connectingPromise) {
          this.connectingPromise.then((data) => {
            if (null === this.ws) {
              rejectCon();
            } else {
              resolveCon();
            }
          }).catch((err) => {
            rejectCon();
          });
        } else if (null !== this.ws) {
          resolveCon();
        } else {
          if (environment.debug) {
            console.debug('UNSPECTED SOCKETS ERROR');
          }
          rejectCon();
        }
      }
    );
  }

  public send(channelName: string, data: any) {
    this.getStickyConnection(() => {
      const obj = new Channel(channelName, data, data.constructor.name);
      this.ws.send(JSON.stringify(obj));
    });
  }

  public subscribe(channelName: string) {
    this.getStickyConnection(() => {
      this.ws.send(new Channel(channelName, {_action: 'subscribe'}));
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
