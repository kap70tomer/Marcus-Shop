import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { UserSignUpInfo } from 'src/app/models/userSignUpInfo';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

    public registerForm: FormGroup;
    public registerForm2: FormGroup;
    public email: FormControl;
    public password: FormControl;
    public name: FormControl;
    public last_name: FormControl;
    public city: FormControl;
    public street: FormControl;
    public repassword: FormControl;
    public isPasswordsSame: Boolean;


    public userSignUpInfo: UserSignUpInfo;

    public submitted = false;
    public firstForm = true;

    constructor(private router: Router, private userService: UserService) {
        this.userSignUpInfo = new UserSignUpInfo();
        this.userService = userService;
        this.isPasswordsSame = false;
    }

    ngOnInit() {

        this.name = new FormControl('', [Validators.pattern(/^[A-Z][-'a-zA-Z]+$/), Validators.required]);
        this.last_name = new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][-'a-zA-Z]+$/)]);
        this.email = new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]);
        this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
        this.city = new FormControl("", Validators.required);
        this.street = new FormControl("", Validators.required);
        this.repassword = new FormControl("", [Validators.required, Validators.minLength(6)]);

        this.registerForm = new FormGroup({

            name: this.name,
            email: this.email,
            password: this.password,
            repassword: this.repassword
        })

        this.registerForm2 = new FormGroup({

            last_name: this.last_name,
            city: this.city,
            street: this.street
        })
    }
    nextForm() {

        if (this.registerForm.invalid) {
            return;
        }
        if (this.repassword.value != this.password.value) {
            this.isPasswordsSame = false;
            return;
        }
        this.firstForm = false;
    }

    onSubmit() {

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm2.invalid) {
            return;
        }

        // convenience getter for easy access to form fields
        this.userSignUpInfo = ({
            name: this.name.value,
            password: this.password.value,
            email: this.email.value,
            last_name: this.last_name.value,
            city: this.city.value,
            street: this.street.value
        });

        let newUserObservable = this.userService.createUser(this.userSignUpInfo)
        newUserObservable.subscribe(data => {
            localStorage.setItem("isNewUser", "true");
           
            console.log(data);

            let newUserLogin: UserLoginDetails = {
                email: this.userSignUpInfo.email,
                password: this.userSignUpInfo.password
            };

            let observable = this.userService.login(newUserLogin);
            observable.subscribe(successfulServerRequestData => {
                console.log(successfulServerRequestData);

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

                this.router.navigate(["/home"]);
            },
                serverErrorResponse => { // Reaching here means that the server had failed
                    // serverErrorResponse is the object returned from the ExceptionsHandler
                    alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
                });
            }
        )

    }
}




