import {observable, action, makeObservable} from "mobx";
import {Auth} from '../models'
import UserStore from './user'

class AuthStore {
    @observable values = {
        username: '',
        password: ''
    }

    @action setUsername(username: string) {
        this.values.username = username
    }

    @action setPassword(password: string) {
        this.values.password = password
    }

    @action login() {
        return new Promise((resolve, reject) => {
            Auth.login(this.values.username, this.values.password).then((user) => {
                console.log('登录成功');
                UserStore.getUser()
                resolve(user)
            }).catch((err) => {
                console.log('登录失败');
                reject(err)
            })
        })

    }

    @action register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password).then((user) => {
                console.log('登录成功');
                UserStore.getUser()
                resolve(user)
            }).catch((err) => {
                console.log('登录失败');
                UserStore.resetUser()
                reject(err)

            })
        })
    }

    @action logout() {
        Auth.logout();
        UserStore.resetUser();
    }
    constructor() {
        makeObservable(this)
    }

}

export default new AuthStore();