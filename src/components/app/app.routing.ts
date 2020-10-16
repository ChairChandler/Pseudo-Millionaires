import { Injectable, NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

import { SplashComponent } from 'src/components/splash/Splash.component';
import { GameboardComponent } from '../gameboard/Gameboard.component';
import { NotFoundPageComponent } from '../not-found/NotFoundPage.component';

@Injectable()
export class UsernameAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!route.queryParams.userName) {
      this.router.navigate(['/404']);
      return false;
    }
    return true;
  }
}

const routes: Routes = [
    { path: "gameboard", component: GameboardComponent, canActivate: [UsernameAuthGuard] },
    { path: "404", component: NotFoundPageComponent },
    { path: "", component: SplashComponent , pathMatch: 'full'},
    { path: "**", redirectTo: "404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [UsernameAuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}