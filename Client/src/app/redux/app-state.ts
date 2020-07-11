import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartInfo } from '../models/cart-info';
import { Category } from '../models/category';

export class AppState {

    // Home Info
    public productsNum: number;
    public ordersNum: number;
    public lastOrder: Date;
    public openCartInfo: CartInfo;

    // Login
    public user: User;
    public hasToken: boolean;

    // Cart
    public cart: Cart;
    public totalPrice: number;

    // Store
    public categories: Category[];
    public productsView: Product[];

    // Admin
    public editProductId: string;
    // public allProducts: Product[];

    public constructor() {

        // Home Info
        this.productsNum = 0;
        this.ordersNum = 0;
        this.lastOrder = null;
        this.openCartInfo = null;

        // Login
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.hasToken = sessionStorage.getItem("token") != undefined;

        // Cart
        this.cart = new Cart();
        this.totalPrice = 0;

        // Store
        this.categories = [];
        this.productsView = [];

        // Admin
        this.editProductId = "";
    }
}
