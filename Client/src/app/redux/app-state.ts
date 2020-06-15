import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

export class AppState {

    public user: User;
    public cart: Cart;
    public products: Product[];

    public constructor() {
        this.user = new User();
        this.cart = new Cart();
        this.products = [];
    }
}
