import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { Category } from '../models/category';

export class AppState {

    // Home Info
    public productsNum: number;
    public ordersNum: number;

    // Login
    public user: User;
    public hasToken: boolean;

    // Store
    public cart: Cart;
    public items: Item[];
    public categories: Category[];
    public productsView: Product[];


    // Admin
    public allProducts: Product[];


    public constructor() {

        // Home Info
        this.productsNum = 0;
        this.ordersNum = 0;

        // Login
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.hasToken = sessionStorage.getItem("token") != undefined;

        // Store
        this.cart = new Cart();
        this.items = [];
        this.categories = [];
        this.productsView = [];

        // Admin
        this.allProducts = [];

    }
}
