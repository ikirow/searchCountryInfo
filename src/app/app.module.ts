import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ResultListComponent } from './result-list/result-list.component';

import { HttpClientModule } from '@angular/common/http';
import { CurrencyConvertFormComponent } from './currency-convert-form/currency-convert-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ResultListComponent,
    CurrencyConvertFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
