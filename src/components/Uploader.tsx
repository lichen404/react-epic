import {useRef} from "react";
import {useStore} from "../store";
import {observer} from "mobx-react";
import {Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";
const {Dragger} = Upload
const Uploader = observer(() => {
    const {ImageStore} = useStore();
    const ref = useRef(null)
    const handleChange = () => {
        // @ts-ignore
        const files:File[] = ref.current && ref.current.files
        if (files && files.length > 0) {
            ImageStore.setFile(files[0]);
            ImageStore.setFilename(files[0].name)
            ImageStore.upload().then(() => {
                console.log('上传成功')
            }).catch(() => {
                console.log('上传失败')
            })
        }
    }

    return (
        <div>
        <Dragger/>

        </div>
    )
})
export default Uploader;