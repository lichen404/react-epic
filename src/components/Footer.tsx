import styled from "styled-components";

const FooterWrapper = styled.footer`
  padding: 10px 100px;
  text-align:center;
  font-size: 14px;
  color: #aaa;
  
`
const Footer = ()=>{
    return (
        <FooterWrapper>
            <span>WTFPL Licensed | Copyright © 2021 Li Chen</span>
        </FooterWrapper>
    )
}
export default Footer;
