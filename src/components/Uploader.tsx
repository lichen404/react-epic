import React, {ChangeEvent} from 'react';
import { useStore } from '../store';
import { observer, useLocalObservable } from 'mobx-react';
import { Upload, message,Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Dragger } = Upload;


const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`;
const H2 = styled.h2`
  margin: 20px 0;
  text-align: center;
`;
const Image = styled.img`
  max-width: 300px;
`;


const Uploader = observer(() => {
    const { ImageStore, UserStore } = useStore();
    const store = useLocalObservable(() => ({
        width: '',
        setWidth(width:string) {
            store.width = width;
        },
        get widthStr() {
            return store.width?`/w/${store.width}`:'';
        },
        height: '',
        setHeight(height:string) {
            store.height = height;
        },
        get heightStr() {
            return store.height?`/h/${store.height}`:'';
        },
        get fullStr() {
            //?imageView2/0/w/800/h/400)
            return ImageStore.serverFile.attributes.image.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
        }

    }));

    const bindWidthChange = (event:ChangeEvent<HTMLInputElement>) => {
        console.log('bindWidthChange...')
        store.setWidth(event.target.value);
    };

    const bindHeightChange = (event:ChangeEvent<HTMLInputElement>) => {
        store.setHeight(event.target.value);
    };

    const props = {
        showUploadList: false,
        beforeUpload: (file:any) => {
            ImageStore.setFile(file);
            ImageStore.setFilename(file.name);
            if(UserStore.currentUser === null) {
                message.warning('请先登录再上传!').then();
                return false;
            }
            if(!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)){
                message.error('只能上传 png/svg/jpg/gif 格式的图片').then();
                return false;
            }
            if(file.size > 1024 * 1024){
                message.error('图片最大1M').then();
                return false;
            }
            ImageStore.upload()
                .then((serverFile) => {
                    console.log('上传成功')
                    console.log(serverFile)

                }).catch(() => {
                console.log('上传失败')
            });
            return false;
        }
    };

    return (
        <div>
            <Spin tip="上传中" spinning={ImageStore.isUploading}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽上传图片</p>
                <p className="ant-upload-hint">
                   仅支持 .png/.gif/.jpg/.svg 格式的图片，图片最大 1M
                </p>
            </Dragger>

            {
                ImageStore.serverFile ? <Result>
                    <H2>上传结果</H2>
                    <dl>
                        <dt>线上地址</dt>
                        <dd><a target="_blank" href={ImageStore.serverFile.attributes.image.attributes.url} rel="noreferrer">{ ImageStore.serverFile.attributes.image.attributes.url}</a></dd>
                        <dt>文件名</dt>
                        <dd>{ImageStore.filename}</dd>
                        <dt>图片预览</dt>
                        <dd>
                            <Image src={ImageStore.serverFile.attributes.image.attributes.url}/>
                        </dd>
                        <dt>更多尺寸</dt>
                        <dd>
                            <input value={store.width} onChange={bindWidthChange} placeholder="最大宽度（可选）"/>
                            <input value={store.height} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
                        </dd>
                        <dd>
                            <a  target="_blank" href={store.fullStr} rel="noreferrer">{store.fullStr}</a>
                        </dd>
                    </dl>
                </Result> : null
            }
            </Spin>
        </div>
    );
});
export default Uploader;

