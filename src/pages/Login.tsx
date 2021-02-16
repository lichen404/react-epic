import {Form, Input, Button} from 'antd';
import styled from "styled-components";
import {useStore} from "../store";
import {useHistory} from 'react-router-dom';


const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .2);
  border-radius: 4px;
  padding: 20px;
`
const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 18}
};
const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`
type UserInfo = {
    username: string;
    password: string;
}

const Login = () => {
    const {AuthStore} = useStore();
    const history = useHistory()
    const onFinish = (values: UserInfo) => {
        AuthStore.setUsername(values.username)
        AuthStore.setPassword(values.password)
        AuthStore.login().then(() => {
            console.log('登录成功')
            history.push('/')
        }).catch(() => {
            console.log('登录失败')
        })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const validateUserName = (_: any, value: string) => {
        if (/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
        if (value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符')
        return Promise.resolve()
    }


    return (
        <Wrapper>
            <Title>登录</Title>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '输入用户名！'}, {
                        validator: validateUserName
                    }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '输入用户密码！'
                        }, {
                            min: 6,
                            message: "密码最少六个字符"
                        }, {
                            max: 10,
                            message: "密码最大十个字符"
                        }]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default Login;