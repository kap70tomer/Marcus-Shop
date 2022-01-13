import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { UserSignUpInfo } from 'src/app/models/userSignUpInfo';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

//@class {component} SignUpComponent - display the user registration form for the app. 
export class SignUpComponent implements OnInit{

    public registerForm: FormGroup;
    public registerForm2: FormGroup;
    public email: FormControl;
    public password: FormControl;
    public first_name: FormControl;
    public last_name: FormControl;
    public city: FormControl;
    public street: FormControl;
    public repassword: FormControl;
    
    public userSignUpInfo: UserSignUpInfo;
    public isPasswordsSame: Boolean = false;
    public submitted = false;

    constructor(private router: Router, private userService: UserService, private fb:FormBuilder) {
  
        
    }
        //@property {function} ngOnInit - On page load, after the 'injections stage'.
        //@property {object} registerForm - Fist out of two parts registration <form>, bind to a collection of controls that takes values from the UI, used to create new User in the system.
        
        //@property {object} registerForm2 - Second part of registration <form>, takes personal details values from the UI, used to create new User in the system.
        
        // @property {object} FormControl - UI input, initilaized with an empty string, and Array of validators for each input case.
        // @class {object} Validator  - Provides a set of built-in validators that can be used by form controls.
        // @property {function} pattern(@argument {string|RegExp} pattern) - Takes the control's state value, To match with a given Regex, returns a map of errors if the value is failing the regex or null.
        // @property {function} requierd() - Validator that requires the control have a non-empty value.
        // @property {function} minLength(@argument {number} minimumLength) - Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.
        
        
        ngOnInit(){   
        this.createFormControlls()
        this.createForms()
    }
    createFormControlls(){
        this.first_name = new FormControl("", [Validators.required, Validators.minLength(3)]);
        this.email = new FormControl("", [Validators.required, Validators.email]);
        this.password = new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
        this.repassword = new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
        this.city = new FormControl("", Validators.required);
        this.street= new FormControl("", Validators.required);
        this.last_name = new FormControl("", [Validators.required, Validators.pattern(/^[A-Z][-'a-zA-Z]+$/)]);
    
    }

    createForms(){
        this.registerForm = new FormGroup({
            first_name: this.first_name,
            email: this.email,
            password: this.password,
            repassword: this.repassword,
        });
        this.registerForm2 = new FormGroup({
            city: this.city,
            street: this.street,
            last_name: this.last_name,
        });
    }
        // @property {function} nextForm - determine if first part of the for is valid and the user may pass to the next form. 
    samePasswordValidator() {
        if(this.repassword.value == this.password.value) {
            this.isPasswordsSame = true;
            return;
        }
        return this.isPasswordsSame = false;
    }
   

    onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm2.invalid) {
            return;
        }

        // convenience getter for easy access to form fields
        this.userSignUpInfo = ({
            name: this.first_name.value,
            password: this.password.value,
            email: this.email.value,
            last_name: this.last_name.value,
            city: this.city.value,
            street: this.street.value
        });

        let newUserObservable = this.userService.createUser(this.userSignUpInfo)
        //on Success response from server.
        newUserObservable.subscribe(data => {
           
            console.log('[DBG] New User created data res: '+ data);

            let newUserLogin: UserLoginDetails = {
                email: this.userSignUpInfo.email,
                password: this.userSignUpInfo.password
            };

            let observable = this.userService.login(newUserLogin);
            observable.subscribe(successfulServerRequestData => {
                console.log('[DBG] Login after sign-up res: '+successfulServerRequestData);

                this.userService.user_type = successfulServerRequestData.user_type;
                this.userService.id = successfulServerRequestData.id;
                
                localStorage.setItem("token", successfulServerRequestData.token + "");
                localStorage.setItem("user_id", JSON.stringify(successfulServerRequestData.id));
                localStorage.setItem("isLoggedIn", "true");

                this.userService.getByUser().subscribe(userInfo =>{ 
                    console.log(userInfo);
                    this.userService.name = userInfo.name+" "+userInfo.last_name,
                    this.userService.city = userInfo.city,
                    this.userService.street = userInfo.street});

                alert('Welcome To my humble shop !')
                this.router.navigate(["/home"]);
            },
            //on Bad response from server.
                serverErrorResponse => { // Reaching here means that the server had failed
                    // serverErrorResponse is the object returned from the ExceptionsHandler
                    alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
                });
            }
        )

    }
}




