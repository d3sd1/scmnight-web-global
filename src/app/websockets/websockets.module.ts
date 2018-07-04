import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebsocketsService} from './websockets.service';

@NgModule({
  imports:      [ CommonModule ],
  providers:    [ WebsocketsService ]
})
export class WebsocketsModule {
  constructor (@Optional() @SkipSelf() parentModule: WebsocketsModule) {
    if (parentModule) {
      throw new Error(
        'WebsocketsModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WebsocketsModule
    };
  }
}
