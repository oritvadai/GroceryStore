import { User } from '../models/user';
import { Product } from '../models/product';

export class AppState {
    
    public user: User;
    public products: Product[];

    public constructor() {
        this.user = new User();
        this.products = [];
    }
}
