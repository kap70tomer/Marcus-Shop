import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserSignUpInfo } from "../models/userSignUpInfo"
import { User } from '../models/user';

@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class UserService {
    
    public id:number;
    public name:string;
    public city:string;
    public street:string;
    public user_type: string;
    public isNewUser:boolean = false;


    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
        // this.http = http;
    }
    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        //  The http request will be sent after the subscribe() method will be called
        //return this.http.post<SuccessfulLoginServerResponse>("api/users/login", userLoginDetails);
        return this.http.post<SuccessfulLoginServerResponse>("api/users/login", userLoginDetails);
    }

    public createUser(userSignUpInfo:UserSignUpInfo): Observable<void> {        
        return this.http.post<void>("api/users/add", userSignUpInfo);
    }

    // public changePassword(user:User):Observable<void>{
    //     return this.http.put<void>("api/users/"+user.id, user);
    // }
    public deleteUser(id:number):Observable<void>{
        return this.http.delete<void>("api/users/"+id);
    }
    public getByUser():Observable<User>{
        return this.http.get<User>("api/users");
    }
}
