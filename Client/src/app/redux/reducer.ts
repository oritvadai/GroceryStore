import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';
import { User } from '../models/user';
import { Cart } from '../models/cart';

export function reducer(oldAppState: AppState, action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {

        // Home Info
        case ActionType.GetNumProducts:
            newAppState.productsNum = +action.payload;
            break;

        case ActionType.GetNumOrders:
            newAppState.ordersNum = +action.payload;
            break;


        // Login
        case ActionType.Login:
            newAppState.user = action.payload;
            newAppState.hasToken = true;
            break;

        case ActionType.Logout:
            newAppState.user = new User();
            newAppState.hasToken = false;
            newAppState.cart = new Cart();
            newAppState.allProducts = [];
            break;


        // Store
        case ActionType.GetCart:
            newAppState.cart = action.payload;
            break;

        case ActionType.GetItems:
            newAppState.items = action.payload;
            break;

        case ActionType.AddItem:
            newAppState.items.push(action.payload);
            break;

        case ActionType.RemoveItem:
            {
                const itemId = action.payload;
                const index = newAppState.items.findIndex(i => i._id === itemId);
                if (index >= 0) {
                    newAppState.items.splice(index, 1);
                }
            }
            break;

        case ActionType.GetAllCategories:
            newAppState.categories = action.payload;
            break;

        case ActionType.GetProductsView:
            newAppState.productsView = action.payload;
            break;


        // Admin:
        case ActionType.AdminGetAllProducts:
            newAppState.allProducts = action.payload;
            break;

        case ActionType.AdminAddProduct:
            newAppState.allProducts.push(action.payload);
            break;

        case ActionType.AdminUpdateProduct:
            {
                const id = action.payload._id;
                const index = newAppState.allProducts.findIndex(p => p._id === id);
                if (index >= 0) {
                    newAppState.allProducts[index] = action.payload;
                }
            }
            break;
    }

    return newAppState;
}
