import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GameboardAuthGuard } from 'src/authguard/Gameboard.authguard';

import { SplashComponent } from 'src/components/splash/Splash.component';
import { GameboardComponent } from '../gameboard/Gameboard.component';
import { NotFoundPageComponent } from '../not-found/NotFoundPage.component';

const routes: Routes = [
    { path: "gameboard", component: GameboardComponent, canActivate: [GameboardAuthGuard] },
    { path: "404", component: NotFoundPageComponent },
    { path: "", component: SplashComponent , pathMatch: 'full'},
    { path: "**", redirectTo: "404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [GameboardAuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}