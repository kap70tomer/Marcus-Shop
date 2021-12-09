export class User{
    public constructor(
        public id?:number,
        public name?:string,
        public last_name?:string,
        public email?:string,
        public password?:string,
        public city?:string,
        public street?:string,
        public user_type?:string
        ){}
}