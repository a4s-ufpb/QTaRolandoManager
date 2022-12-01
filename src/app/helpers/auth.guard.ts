import { UserModel } from './../models/UserModel';
import { StorageService } from 'src/app/services/storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: UserModel = this.storageService.getUser();

    if (route.url[0].path.includes('login') && user.email) {
      this.router.navigate(['/eventos']);
      return false;
    } if ((route.url[0].path.includes('dashboard') || route.url[0].path.includes('manager')) && user.email == null) {
      this.router.navigate(['/login'], { queryParams: { type: 'signIn' } });
      return false;
    }
    return true;
  }

}
