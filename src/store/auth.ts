import {observable, action, makeObservable} from "mobx";
import {Auth} from '../models'
import UserStore from './user'
import {message} from 'antd';
import HistoryStore from './history';
import ImageStore from './image';

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
                message.error('登录失败').then()
                reject(err)
            })
        })

    }

    @action register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password).then((user) => {
                console.log('注册成功');
                UserStore.getUser()
                resolve(user)
            }).catch((err) => {
                message.error('注册失败').then()
                UserStore.resetUser()
                reject(err)

            })
        })
    }

    @action logout() {
        Auth.logout();
        UserStore.resetUser();
        HistoryStore.reset();
        ImageStore.reset();
    }
    constructor() {
        makeObservable(this)
    }

}

export default new AuthStore();
