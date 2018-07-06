import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MzButtonModule, MzCardModule, MzInputModule} from 'ngx-materialize';
import {LoginComponent} from '../login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../app.module';
import {HttpClient} from '@angular/common/http';
import {LanguageModule} from '../language/language.module';

@NgModule({
  imports: [
    CommonModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    LanguageModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoggedoutModule {
}
