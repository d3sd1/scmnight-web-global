import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoggedinModule} from './loggedin/loggedin.module';
import {LoggedoutModule} from './loggedout/loggedout.module';
import {WebsocketsModule} from './websockets/websockets.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MzCardModule} from 'ngx-materialize';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    WebsocketsModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoggedinModule,
    LoggedoutModule,
    SnotifyModule,
    HttpClientModule,
    MzCardModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
