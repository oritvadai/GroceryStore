import { Category } from './category';

    
export class Product {

    public constructor(
        public _id?: string,
        public productName?: string,
        public categoryId?: string,
        public category?: Category,
        public unitPrice?: number,
        public picFileName?: string) {
    }
}