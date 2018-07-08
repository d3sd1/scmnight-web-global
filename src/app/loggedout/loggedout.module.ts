import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MzButtonModule, MzCardModule, MzIconMdiModule, MzInputModule, MzSpinnerModule} from 'ngx-materialize';
import {LoginComponent} from '../login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../app.module';
import {HttpClient} from '@angular/common/http';
import {LanguageModule} from '../language/language.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    LanguageModule,
    MzIconMdiModule,
    MzButtonModule,
    FormsModule,
    MzSpinnerModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoggedoutModule {
}
