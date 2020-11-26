import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {AuthentificationService} from "./authentification.service";


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{


  constructor(private _router:Router, private authentificationService:AuthentificationService ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {

    return this.authentificationService.isLogin

  }
}
