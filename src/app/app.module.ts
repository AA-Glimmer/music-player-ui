import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatTabsModule} from '@angular/material';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    LoginComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
      MatCardModule, MatCheckboxModule, MatSelectModule,
      MatInputModule, MatTabsModule,
      HttpClientModule, FormsModule
   ],
  providers: [],
  bootstrap :[AppComponent]
})

export class AppModule { }
