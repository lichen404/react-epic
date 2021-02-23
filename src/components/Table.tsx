import {useStore} from '../store';
import {observer} from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import {Button, List, Spin} from 'antd';
import styled from 'styled-components';
import {useEffect} from 'react';
import {toJS} from 'mobx';

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;
const Href =styled.a`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Loading = styled.div`
  text-align: center;
`
const ListWrapper = styled(List)`
  height: 80vh;
  padding: 20px;
  border: 1px dashed rgb(255, 255, 255);
  overflow: auto;
  width: 100%;
  background:#fff;
  border-radius: 4px;
  
`
const Table = observer(() => {
    const {HistoryStore} = useStore();
    const loadMore = () => {
        HistoryStore.find();
    };
    useEffect(() => {
        return () => {
            HistoryStore.reset();
        };
    }, [HistoryStore]);
    return (
        <InfiniteScroll initialLoad={true} pageStart={1} loadMore={loadMore}
                        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore} useWindow={true}>
            <ListWrapper dataSource={toJS(HistoryStore.list)} renderItem={(item: any) => {
                return (<List.Item key={item.id}>

                    <Img src={item.attributes.image.attributes.url} alt=""/>


                    <h5>{item.attributes.filename}</h5>


                    <Href href={item.attributes.image.attributes.url} target="_blank"
                       rel="noreferrer">{item.attributes.image.attributes.url}</Href>
                    <div >
                        <Button type="primary" onClick={() => HistoryStore.remove(item.id)}>删除图片</Button>
                    </div>
                </List.Item>);
            }}>
                {HistoryStore.isLoading && HistoryStore.hasMore && (
                    <Loading>
                        <Spin tip="加载中"/>
                    </Loading>
                )}
            </ListWrapper>
        </InfiniteScroll>


    );
});

export default Table;
