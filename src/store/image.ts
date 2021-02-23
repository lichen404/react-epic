import {observable, action, makeObservable, runInAction} from 'mobx';
import {Uploader} from '../models';

class ImageStore {
    @observable filename = '';
    @observable file: any = null;
    @observable isUploading = false;
    @observable serverFile: any = null;

    @action setFilename(newFileName: string) {
        this.filename = newFileName;
    }

    @action setFile(newFile: any) {
        this.file = newFile;
    }

    @action upload() {
        this.isUploading = true;
        this.serverFile = null;
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename).then(serverFile => {
                runInAction(() => {
                    this.serverFile = serverFile;
                });
                resolve(serverFile);
            }).catch((error) => {
                reject(error);
            }).finally(() => {
                runInAction(() => {
                    this.isUploading = false;
                });

            });
        });

    }

    @action reset() {
        this.serverFile = null;
        this.isUploading = false;
    }

    constructor() {
        makeObservable(this);
    }

}

export default new ImageStore();
