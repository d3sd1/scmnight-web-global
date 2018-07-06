import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<ng-snotify></ng-snotify><router-outlet></router-outlet>`
})
export class AppComponent {}
