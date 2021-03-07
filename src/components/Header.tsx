import React, {useEffect} from 'react';
import {NavLink, useHistory} from "react-router-dom"
import styled from 'styled-components'
import {Button} from 'antd'
import {useStore} from "../store";
import {observer} from "mobx-react";

const HeaderWrapper = styled.header`
  background-color: #02101f;
  padding: 10px 100px;
  display: flex;
  align-items: center;
  color: #fff;
`
const LinkWrapper = styled(NavLink)`
  color: #fff;
  margin-left: 30px;

  &.active {
    border-bottom: 1px solid #fff;
  }
`
const StyledALink = styled.a`
  color:#fff;
  margin-left: 30px;
  font-size:15px;
  &.active {
    border-bottom:1px solid #fff;
  }
`

const StyledButton = styled(Button)`
  margin-left: 10px;
`
const ButtonWrapper = styled.div`
  margin-left: auto;
`
const Header = observer(() => {
    const {UserStore, AuthStore} = useStore();
    const history = useHistory()
    const handleLogout = () => {
        AuthStore.logout()
    }
    const handleLogin = () => {
        history.push('/login')
    }
    const handleRegister = () => {
        history.push('/register')
    }
    useEffect(()=>{
        UserStore.getUser()
    },[UserStore])
    return (
        <HeaderWrapper>
            <nav>
                <LinkWrapper to="/" activeClassName="active" exact>首页</LinkWrapper>
                <LinkWrapper to="/history" activeClassName="active">上传历史</LinkWrapper>
                <StyledALink href="https://github.com/lichen404/react-epic" target="_blank" rel="noreferrer">Github</StyledALink>
            </nav>
            <ButtonWrapper>
                {
                    UserStore.currentUser ?
                        <>
                            {UserStore.currentUser.attributes.username}
                            <StyledButton type="primary" onClick={handleLogout}>注销</StyledButton>
                        </> :
                        <>
                            <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                            <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
                        </>
                }

            </ButtonWrapper>
        </HeaderWrapper>
    )
})
export default Header;
