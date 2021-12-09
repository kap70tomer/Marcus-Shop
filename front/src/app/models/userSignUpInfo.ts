export class UserSignUpInfo{
    public constructor(
        public email?:string,
        public password?:string,
        public name?: string,
        public last_name?: string,
        public city?:string,
        public street?:string,
    ){}

}