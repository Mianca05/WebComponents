import { NgModule } from '@angular/core';
 import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { NgxCaptchaModule } from 'ngx-captcha';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './Shared/http.service';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { NavComponent } from './components/nav/nav.component';

// import { CreateDirectivaOwn} from './customvalidators.directive'; 

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListaClientesComponent,
    NavComponent,
    // myValidators
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
