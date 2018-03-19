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
    const requiresAnonymous = next.data.requiresAnonymous || false;
    const requiresAdmin = next.data.requiresAdmin || false;
    const requiresAdminOrAnonymous =
      next.data.requiresAdminOrAnonymous || false;

    const isLoggedIn = this.auth.isLoggedIn();
    if (requiresLogin) {
      if (!isLoggedIn) {
        location.replace('/login');
        return false;
      }
      return true;
    }

    if (requiresAnonymous) {
      if (isLoggedIn) {
        location.replace('/home');
        return false;
      }
      return true;
    }

    const isAdmin: boolean = isLoggedIn ? this.auth.isAdmin() : false;

    if (requiresAdmin) {
      if (!isAdmin && isLoggedIn) {
        location.replace('/home');
        return false;
      } else if (!isAdmin) {
        location.replace('/login');
        return false;
      }

      return true;
    }

    if (requiresAdminOrAnonymous) {
      if (!isAdmin && isLoggedIn) {
        location.replace('/calendar');
        return false;
      }
    }

    return true;
  }
}
