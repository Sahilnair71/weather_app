import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {RecordService} from './record.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule .forRoot({
      apiKey: 'AIzaSyAVtwZKs9LQu6QLiUw5qW8elw9uFS-X510',
      libraries: ['places']
    }),
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
