import { Product } from './product';

    
export class Category {

    public constructor(
        public _id?: string,
        public category?: string,
        public products?: Product[]) {
    }
}