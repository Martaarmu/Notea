import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private authS:AuthService, private router:Router) { }

  //esto devuelve true->autenticao false->no autenticao
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let result = this.authS.isLogged();
    if(result){
      return true;
    }else{
      this.router.navigate(['']);
      return false;
    }
  }
}
