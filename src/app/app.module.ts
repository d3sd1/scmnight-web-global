import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoggedinModule} from './loggedin/loggedin.module';
import {LoggedoutModule} from './loggedout/loggedout.module';
import {WebsocketsModule} from './websockets/websockets.module';
import {WebsocketsConnectorService} from './websockets/websockets-connector.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    WebsocketsModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoggedinModule,
    LoggedoutModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [WebsocketsConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
