import {observable, action, makeObservable, runInAction} from 'mobx';
import {Uploader} from '../models';
import {message} from 'antd';

class HistoryStore {
    @observable list: any[] = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 1;
    limit = 10;

    @action append(newList: []) {
        this.list = this.list.concat(newList);
    }

    @action find() {
        this.isLoading = true;
        if (this.hasMore) {
            Uploader.find(this.page, this.limit).then(
                (newList: any) => {
                    this.append(newList);
                    runInAction(() => {
                        this.page += 1;
                        if (newList.length < this.limit) {
                            this.hasMore = false;
                        }
                    });


                }
            ).catch(() => {
                message.error('加载失败').then();
            }).finally(() => {
                runInAction(() => {
                    this.isLoading = false;
                });

            });
        }


    }

    @action remove(id: string) {
        Uploader.remove(id)
            .then(() => {
                    message.success('删除成功').then();
                    const index = this.list.findIndex(item => item.id === id);
                    runInAction(()=>{
                        this.list.splice(index, 1);
                    })

                }
            )
            .catch(() => message.error('删除图片失败'));
    }


    @action reset() {
        this.isLoading = false;
        this.list = [];
        this.page = 1;
        this.hasMore = true;
        this.limit = 10;
    }

    constructor() {
        makeObservable(this);
    }

}

export default new HistoryStore();
