import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatTabsModule} from '@angular/material';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { LoginComponent } from './login/login.component';
import {SessionService} from './services/session.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: PlayerComponent },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    LoginComponent,
  ],
  imports: [
      RouterModule.forRoot(
        appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
      ),
      BrowserModule,
      BrowserAnimationsModule,
      MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
      MatCardModule, MatCheckboxModule, MatSelectModule,
      MatInputModule, MatTabsModule,
      HttpClientModule, FormsModule, RouterModule,
   ],
  providers: [SessionService],
  bootstrap : [AppComponent]
})

export class AppModule { }
