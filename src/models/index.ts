import AV, {User} from 'leancloud-storage';



AV.init({
    appId: process.env.REACT_APP_ID || '',
    appKey: process.env.REACT_APP_KEY || '',
    serverURL: process.env.REACT_APP_SERVER_URL || ''
});

const Auth = {
    register(username: string, password: string) {
        const user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then(loginUser => {
                resolve(loginUser);
            }, error => {
                reject(error);
            });
        });

    },
    login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginUser => resolve(loginUser), error => reject(error));
        });
    },
    logout() {
        User.logOut().then();
    },
    getCurrentUser() {
        return AV.User.current();
    }
};
const Uploader = {
    add(file: any, filename: string) {
        const item = new AV.Object('Image');
        const avFile = new AV.File(filename, file);
        item.set('filename', filename);
        item.set('owner', AV.User.current());
        item.set('image', avFile);
        return new Promise((resolve, reject) => {
            item.save().then((serverFile) => {
                console.log('保存成功');
                resolve(serverFile);
            }, (error) => {
                console.log('保存失败');
                reject(error);
            });
        });
    },
    find(page = 1, limit = 10) {
        const query = new AV.Query('Image');
        query.include('owner');
        query.limit(limit);
        query.skip((page - 1) * limit);
        query.descending('createdAt');
        query.equalTo('owner', AV.User.current());
        return new Promise((resolve, reject) => {
            query.find().then(result => resolve(result)).catch(error => reject(error));
        });

    },
    remove(id: string) {
        const item = AV.Object.createWithoutData('Image', id);
        return new Promise((resolve, reject) => {
            item.destroy().then((result) => {
                console.log('删除图片');
                resolve(result);

            }).catch(error => {
                reject(error);
            });
        });

    }

};

export {Auth, Uploader};
