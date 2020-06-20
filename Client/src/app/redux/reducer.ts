import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';
import { User } from '../models/user';
import { Cart } from '../models/cart';

export function reducer(oldAppState: AppState, action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.GetNumProducts:
            newAppState.productsNum = +action.payload;
            break;

        case ActionType.GetNumOrders:
            newAppState.ordersNum = +action.payload;
            break;

        case ActionType.Login:
            newAppState.user = action.payload;
            newAppState.hasToken = true;
            break;

        case ActionType.Logout:
            newAppState.user = new User();
            newAppState.hasToken = false;
            newAppState.cart = new Cart();
            newAppState.products = [];
            break;

        case ActionType.GetCart:
            newAppState.cart = action.payload;
            break;

        // Items:
        case ActionType.GetItems:
            newAppState.items = action.payload;
            break;

        case ActionType.AddItem:
            newAppState.items.push(action.payload);
            break;

        case ActionType.RemoveItem:
            const itemId = action.payload;
            const index = newAppState.items.findIndex(i => i._id === itemId);
            if (index >= 0) {
                newAppState.items.splice(index, 1);
            }
            break;

        // Products:
        case ActionType.GetAllProducts:
            newAppState.products = action.payload;
            break;

        case ActionType.AddProduct:
            newAppState.products.push(action.payload);
            break;

        // Categories:
        case ActionType.GetAllCategories:
            newAppState.categories = action.payload;
            break;
    }

    return newAppState;
}
