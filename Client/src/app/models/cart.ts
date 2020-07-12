import { Item } from './item';


export class Cart {

    public constructor(
        public _id?: string,
        public userId?: string,
        public date?: Date,
        public items?: Item[],
        public totalPrice?: number) {
    }
}