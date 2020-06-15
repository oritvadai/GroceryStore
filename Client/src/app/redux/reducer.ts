import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';
import { User } from '../models/user';
import { Cart } from '../models/cart';

export function reducer(oldAppState: AppState, action: Action): AppState {

    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.Login:
            newAppState.user = action.payload;
            newAppState.isLoggedIn = true;
            break;

        case ActionType.Logout:
            newAppState.user = new User();
            newAppState.isLoggedIn = false;
            newAppState.cart = new Cart();
            newAppState.products = [];
            break;

        case ActionType.GetCart:
            newAppState.cart = action.payload;
            break;

        case ActionType.GetAllProducts:
            newAppState.products = action.payload;
            break;

        case ActionType.AddProduct:
            newAppState.products.push(action.payload);
            break;
    }

    return newAppState;
}
