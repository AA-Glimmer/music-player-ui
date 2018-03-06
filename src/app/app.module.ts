import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatCheckboxModule} from '@angular/material';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
      MatCardModule, MatCheckboxModule
   ],
  providers: [],
  bootstrap :[AppComponent]
})

export class AppModule { }
