import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SplashModule } from 'src/components/splash/Splash.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app.routing';
import { NotFoundPageModule } from '../not-found/NotFoundPage.module';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuestionsService } from 'src/services/Questions.service';
import { GameboardModule } from '../gameboard/Gameboard.module';
import { LoginService } from 'src/services/Login.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SplashModule,
    NotFoundPageModule,
    GameboardModule,
  ],
  providers: [HttpClient, QuestionsService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
