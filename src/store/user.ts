import {observable, action, makeObservable} from "mobx";
import {Auth} from "../models";
import {User} from "leancloud-storage";

class UserStore {
    @observable currentUser: User | null = null;

    @action getUser() {
        this.currentUser = Auth.getCurrentUser()
    }

    @action resetUser() {
        this.currentUser = null
    }
    constructor() {
        makeObservable(this)
    }
}

export default  new UserStore()