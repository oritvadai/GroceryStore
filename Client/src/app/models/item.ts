import { Product } from './product';

export class Item {

    public constructor(
        public _id?: string,
        public productId?: string,
        public product?: Product,
        public cartId?: string,
        public quantity?: number,
        public itemsPrice?: number) {
    }
}