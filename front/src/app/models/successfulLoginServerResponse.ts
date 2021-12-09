export class SuccessfulLoginServerResponse{
    public constructor(
        public id?:number,
        public name?:string,
        public token?:string,       
        public user_type?:string
    ){}

}