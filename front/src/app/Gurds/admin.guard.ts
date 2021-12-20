import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  //@class {object} AdminGuard - Guards the secure routes, from requests within the app (admin only).
  // With each request it checks if the user is Authenticated and if its user type is admin. 
  public constructor(private router: Router, private userService: UserService) { };

  public canActivate(): boolean {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn == "true") {
      return true;
    };
    const isAdmin = this.userService.user_type;
    if (isAdmin == "ADMIN") {
      return true;
    };

    this.router.navigateByUrl("/home");
    return false;
  }

}

