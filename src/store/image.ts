import {observable, action} from "mobx";
import {Uploader} from "../models";

class ImageStore {
    @observable filename = ""
    @observable file = null
    @observable isUploading = false
    @observable serverFile:any = null

    @action setFilename(newFileName: string) {
        this.filename = newFileName
    }

    @action setFile(newFile: any) {
        this.file = newFile
    }

    @action upload() {
        this.isUploading = true
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename).then(serverFile => {
                this.serverFile = serverFile
                resolve(serverFile)
            }).catch((error) => {
                reject(error)
            }).finally(() => {
                this.isUploading = false;
            })
        })

    }
}

export default new ImageStore();