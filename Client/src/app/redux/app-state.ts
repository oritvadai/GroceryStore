import { User } from '../models/user';

export class AppState {
    
    public user: User;

    public constructor() {
        this.user = new User();
    }
}
