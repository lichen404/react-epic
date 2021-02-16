import {observer} from "mobx-react";
import {useStore} from "../store";
import Uploader from "../components/Uploader";

const Home = observer(() => {
    const {UserStore} = useStore();

    return (
        <>
            {UserStore.currentUser ?
                <h1>Hello {UserStore.currentUser.attributes.username}</h1>
                : <span>用户尚未登录</span>
            }
            <Uploader/>
        </>
    )
})
export default Home;