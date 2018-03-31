import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatListModule,
  MatCardModule, MatCheckboxModule, MatSelectModule, MatInputModule, MatTabsModule, MatTooltipModule } from '@angular/material';

import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { LoginComponent } from './login/login.component';
import {SessionService} from './services/session.service';
import {GlobalService} from './services/global.service';
import { GenreSelectionComponent } from './genre-selection/genre-selection.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: PlayerComponent },
  { path: 'genreselection', component: GenreSelectionComponent },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    LoginComponent,
    GenreSelectionComponent,
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
      MatInputModule, MatTabsModule, MatListModule,
      HttpClientModule, FormsModule, RouterModule,
      NgxDnDModule, MatTooltipModule,
  ],
  providers: [SessionService, GlobalService],
  bootstrap : [AppComponent]
})

export class AppModule { }
