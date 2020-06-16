import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { Item } from '../models/item';

export class AppState {

    public user: User;
    public isLoggedIn: boolean;
    public cart: Cart;
    public products: Product[];
    public items: Item[];

    public constructor() {
        this.user = new User();
        this.isLoggedIn = false;
        this.cart = new Cart();
        this.products = [];
        this.items = [];
    }
}
