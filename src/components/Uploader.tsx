import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {useStore} from '../store';
import {observer} from 'mobx-react';
import {Upload, message, Spin, Table, Input, Button, Form, FormInstance} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';

const {Dragger} = Upload;
const EditableContext = createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       title,
                                                       editable,
                                                       children,
                                                       dataIndex,
                                                       record,
                                                       handleSave,
                                                       ...restProps
                                                   }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0}}
                name={dataIndex}
                rules={[
                    {
                        required: false,

                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    name: string;
    width: number;
    height: number;
    thumb: string;
}

interface EditableTableState {
    dataSource: DataType[];
    count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableTable: React.FC = () => {
    const {ImageStore} = useStore();
    const [state, setState] = useState<EditableTableState>({
        dataSource: [
            {
                key: '0',
                width: 0,
                height: 0,
                name: ImageStore.filename,
                thumb: ImageStore.serverFile.attributes.image.attributes.url
            },

        ],
        count: 1
    });
    const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: '文件名',
            dataIndex: 'name',
            width: '15%',
            render: (name) => <span>{name}</span>
        },
        {
            title: '图片预览',
            dataIndex: 'thumb',
            render: (url) => <Image src={url}/>

        },
        {
            title: '最大宽度（可选）',
            dataIndex: 'width',
            editable: true,
            width: '25%',
            render: text => text ? <div>{text}</div> : 0

        },
        {
            title: '最大高度（可选）',
            dataIndex: 'height',
            editable: true,
            width: '25%',
            render: text => text ? <div>{text}</div> : 0

        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: () => <Button type={'primary'}
                                  onClick={() => copy(`${state.dataSource[0].thumb}?imageView2/0/w/${state.dataSource[0].width}/h/${state.dataSource[0].height}`) && message.success('成功复制到剪贴板！')}
            >复制链接</ Button>


        }
    ];

    const handleSave = (row: DataType) => {
        const newData = [...state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setState({
            ...state,
            dataSource: newData,
        });
    };
    const {dataSource} = state;
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columnTypes = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columnTypes as ColumnTypes}
                pagination={false}
            />
        </div>
    );


};

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`;

const Image = styled.img`
  max-width: 100px;
`;

const DraggerWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;
const Uploader = observer(() => {
    const {ImageStore, UserStore} = useStore();
    const props = {
        showUploadList: false,
        beforeUpload: (file: any) => {
            ImageStore.setFile(file);
            ImageStore.setFilename(file.name);
            if (UserStore.currentUser === null) {
                message.warning('请先登录再上传!').then();
                return false;
            }
            if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
                message.error('只能上传 png/svg/jpg/gif 格式的图片').then();
                return false;
            }
            if (file.size > 1024 * 1024) {
                message.error('图片最大1M').then();
                return false;
            }
            ImageStore.upload()
                .then((serverFile) => {
                    console.log('上传成功');
                    console.log(serverFile);

                }).catch(() => {
                console.log('上传失败');
            });
            return false;
        }
    };

    return (
        <div>
            <Spin tip="上传中" spinning={ImageStore.isUploading}>
                <DraggerWrapper>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">点击或拖拽上传图片</p>
                        <p className="ant-upload-hint">
                            仅支持 .png/.gif/.jpg/.svg 格式的图片，图片最大 1M
                        </p>
                    </Dragger>
                </DraggerWrapper>
                {
                    ImageStore.serverFile ? <Result>
                        <EditableTable/>
                    </Result> : null
                }
            </Spin>
        </div>
    );
});
export default Uploader;

