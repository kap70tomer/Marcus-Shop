import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit( ): void {
    localStorage.removeItem("cart_id");
    let isNew = localStorage.getItem("isNewUser");
    if (isNew == "true"){
      alert("Welcome to your first Shopping expirience!");
    }

  }

}
