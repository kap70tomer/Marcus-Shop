

export class Cart{
    public constructor(
        public id?:number,
        public user_id?:number,
        public isChecked?:boolean,
        private creation_date?:Date,
     ){}
}