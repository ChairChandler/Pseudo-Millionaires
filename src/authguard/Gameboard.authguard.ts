import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/services/Login.service';

@Injectable()
export class GameboardAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(!this.loginService.checkIfLogged()) {
      this.router.navigate(['/']);
      return false;
    } else if (!route.queryParams.userName) {
      this.router.navigate(['/404']);
      return false;
    }
    return true;
  }
}