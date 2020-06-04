import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';

export function reducer(oldAppState: AppState, action: Action): AppState {

    const newAppState = { ...oldAppState };
    
    switch(action.type) {

        case ActionType.Login:
            newAppState.user = action.payload;
            break;
    }

    return newAppState;
}
