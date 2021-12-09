import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {

  public constructor(private router: Router) {}

    public canActivate(): boolean {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if(isLoggedIn == "true") {
          
            return true;
        }

        this.router.navigateByUrl("/home");
      
        return false;
    }

}



  