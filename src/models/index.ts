import AV, {User} from 'leancloud-storage';




AV.init({
    appId: process.env.REACT_APP_ID || '',
    appKey: process.env.REACT_APP_KEY || '',
    serverURL: process.env.REACT_APP_SERVER_URL || ''
})
const Auth = {
    register(username: string, password: string) {
        const user = new User();
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve, reject) => {
            user.signUp().then(loginUser => {
                resolve(loginUser)
            }, error => {
                reject(error)
            })
        })

    },
    login(username: string, password: string) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginUser => resolve(loginUser), error => reject(error))
        })
    },
    logout() {
        User.logOut().then()
    },
    getCurrentUser() {
        return User.current()
    }
}
const Uploader = {
    add(file:any,filename:string){
        const item = new AV.Object('Image')
        const avFile = new AV.File(filename,file)
        item.set('filename',filename);
        item.set('owner',AV.User.current())
        item.set('image',avFile)
        return new Promise((resolve, reject) => {
            item.save().then((serverFile)=>{
                console.log('保存成功')
                resolve(serverFile)
            },(error)=>{
                console.log('保存失败')
                reject(error)
            })
        })
    },


}

export {Auth,Uploader};
