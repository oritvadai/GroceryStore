import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { Category } from '../models/category';

export class AppState {

    public productsNum: number;
    public ordersNum: number;

    public user: User;
    public hasToken: boolean;

    public cart: Cart;
    public items: Item[];
    public categories: Category[];

    public products: Product[];


    public constructor() {

        this.productsNum = 0;
        this.ordersNum = 0;

        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.hasToken = sessionStorage.getItem("token") != undefined;

        this.cart = new Cart();
        this.products = [];
        this.items = [];

        this.categories = [];
    }
}
