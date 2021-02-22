import {observer} from "mobx-react";

import Uploader from "../components/Uploader";
import styled from 'styled-components';

const H1 = styled.h1`
  color: white;
  font-size: 3em;
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  margin-bottom: 50px;
`
const Home = observer(() => {
    return (
        <>
            <H1>欢迎上传你的图片</H1>
            <Uploader/>
        </>
    )
})
export default Home;
