import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private auth: AuthService, private location: Location) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiresLogin = next.data.requiresLogin || false;
    const isLoggedIn = this.auth.isLoggedIn();
    if (requiresLogin) {
      if (!isLoggedIn) {
        location.replace('/login');
        return false;
      }
      return true;
    }

    const requiresAnonymous = next.data.requiresAnonymous || false;
    if (requiresAnonymous) {
      if (isLoggedIn) {
        location.replace('/home');
        return false;
      }
      return true;
    }

    const requiresAdmin = next.data.requiresAdmin || false;

    if (requiresAdmin) {
      const isAdmin: boolean = this.auth.isAdmin();

      if (!isAdmin && isLoggedIn) {
        location.replace('/home');
        // console.log('Send to home');

        return false;
      } else if (!isAdmin) {
        location.replace('/login');
        return false;
      }

      return true;
    }

    return true;
  }
}
