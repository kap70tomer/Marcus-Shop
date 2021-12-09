import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { User } from 'src/app/models/user';


  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    public user_type:string;
    public loginForm: FormGroup;
    public email: FormControl;
    public password: FormControl;
    public loginAttempt:number;
    public isLoggedIn:Boolean = false;
    public userLoginDetails: UserLoginDetails;
    private userInfo:User;

    // The router parameter is an example to a short writing of a member + it's assignment
    // private router: Router EQUIVALENT TO the following 3: 
    // 1. Member definition
    // 2. Parameter definition
    // 3. this.router = router
    constructor(public usersService : UserService, private router: Router ,private shoppingCart:ShoppingCartService) {
        this.userInfo;
        this.loginAttempt = 0;
        this.userLoginDetails = new UserLoginDetails();
        this.usersService;       
    }

    public login(): void{
       //gather the form input to an object.
        this.userLoginDetails.email = this.email.value;
        this.userLoginDetails.password = this.password.value;

        // Creating an observable object
    
        const observable = this.usersService.login(this.userLoginDetails);

        // The method subscribe() ussues an http request to the server
        // successfulServerRequestData
        observable.subscribe(successfulServerRequestData => {
            // console.log(successfulServerRequestData);                    
            
            this.usersService.user_type = successfulServerRequestData.user_type;
            this.usersService.id = successfulServerRequestData.id;
            
            localStorage.setItem("token", successfulServerRequestData.token+"");
            // localStorage.setItem("user_id",JSON.stringify(successfulServerRequestData.id)); 
            localStorage.setItem("isLoggedIn", "true");
            //set login response details on application storage.
           
           
            if(successfulServerRequestData.user_type == "CUSTOMER"){
                location.reload();  
            }
            //determine by user Type wich path router navigate [ proper url ]
            if(successfulServerRequestData.user_type == "ADMIN"){
                this.router.navigate(["/admin"]);
            }
           
            }, serverErrorResponse => { // Reaching here means that the server had failed.
                // serverErrorResponse is the object returned from the ExceptionsHandler.
                this.loginAttempt++;//allowing number of logins to protect from force brute.
                if(this.loginAttempt == 4){
                    alert("you have reached Maximum login Attempts!");
                }//alert user he reached the limit.
                alert("Invalid User Email or Password!");
                //alert incase login inputs are wrong.
                console.log("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
            }); 
            localStorage.setItem("isNewUser", "false");
            //..means user logged from this Form and not from Sign-Up.

    }
    public startNew(){
        //option to take a new cart.
        localStorage.removeItem("isNewUser");
        this.router.navigate(['/shop']);
        this.shoppingCart.cart_id = null;
    }

    public logOut(){
        localStorage.clear();
        location.reload();
    }

    ngOnInit() {
        let logged = localStorage.getItem("isLoggedIn");
        if(logged == "true") {
           this.isLoggedIn =true;
        //    this.user_type = this.usersService.user_type;
           this.usersService.getByUser().subscribe(userInfo =>{
            console.log(userInfo);
            this.usersService.name = userInfo.name+" "+userInfo.last_name,
            this.usersService.city = userInfo.city,
            this.usersService.street = userInfo.street
            });
            ;
            return;
        };
      
        //after login get user details 
        //set user details to browser local storage.

        // Initializing form controls with validators
        this.email = new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]);
        this.password = new FormControl("", Validators.required);
        
        // Initializing the from group
        this.loginForm = new FormGroup({
            email : this.email,
            password : this.password
        });
    };
};
