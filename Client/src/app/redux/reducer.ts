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

        case ActionType.GetLastOrderByUser:
            newAppState.lastOrder = action.payload;
            break;

        case ActionType.GetOpenCartInfo:
            newAppState.openCartInfo = action.payload;
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
            newAppState.productsView = [];
            break;


        // Cart
        case ActionType.GetCartContent:
            newAppState.cart = action.payload;
            break;

        case ActionType.GetItems:
            newAppState.cart.items = action.payload;
            break;

        case ActionType.AddItem:
            newAppState.cart.items.push(action.payload);
            break;

        case ActionType.RemoveItem:
            {
                const itemId = action.payload;
                const index = newAppState.cart.items.findIndex(i => i._id === itemId);
                if (index >= 0) {
                    newAppState.cart.items.splice(index, 1);
                }
            }
            break;

        case ActionType.ClearCart:
            newAppState.cart.items = [];
            newAppState.cart.totalPrice = 0;
            break;

        case ActionType.GetTotalPrice:
            newAppState.cart.totalPrice = action.payload;

            break;

        // Store
        case ActionType.GetAllCategories:
            newAppState.categories = action.payload;
            break;

        case ActionType.GetProductsView:
            newAppState.productsView = action.payload;
            break;


        // Admin:
        case ActionType.AdminUpdateProductId:
            newAppState.editProductId = action.payload;
            break;

        case ActionType.AdminUpdateProduct:
            {
                const id = action.payload._id;
                const index = newAppState.productsView.findIndex(p => p._id === id);
                if (index >= 0) {
                    newAppState.productsView[index] = action.payload;
                }
            }
            break;

        case ActionType.AdminAddProduct:
            newAppState.productsView.push(action.payload);
            break;
    }

    return newAppState;
}
