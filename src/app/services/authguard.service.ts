import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {AuthentificationService} from "./authentification.service";


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{


  constructor(private router:Router, private authentificationService:AuthentificationService ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    if (!this.authentificationService.isLogin) {
      alert('You are not allowed to view this page. You are redirected to login Page');

      this.router.navigateByUrl("/login")
      return false;

      //var urlTree = this.router.createUrlTree(['login']);
      //return urlTree;
    }
    return this.authentificationService.isLogin ;

  }
}
