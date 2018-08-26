import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ChartModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
