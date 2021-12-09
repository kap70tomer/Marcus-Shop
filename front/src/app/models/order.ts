export class Order{
    public constructor(
        public id?:number,
        public user_id?:number,
        public cart_id?:number,
        public total_price?:number,
        public city_delivery?:string,
        public street_delivery?:string,
        public date_delivery?:Date,
        public credit?:number
        ){}
}