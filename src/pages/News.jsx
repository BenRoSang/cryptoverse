import { Select, Typography, Row, Col, Avatar, Card } from "antd"
import moment from "moment"
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"
import { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "../components/Loader";

const { Text, Title} = Typography;
const { Option } = Select;

const demoImageUrl = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

function News({simplified}) {

    const [newsCategory, setNewsCategory ] = useState('Cryptocurrency');

    const { data: cryptoNews, error, isLoading } = useGetCryptoNewsQuery({newsCategory: newsCategory, count: simplified ? 6 : 12});
    const { data: cryptosList } = useGetCryptosQuery(100);

    if(isLoading) return <Loader />
    
    return (
        <Row gutter={[24, 24]}>
            {
                !simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            onChange={(value) => setNewsCategory(value)}
                            value={newsCategory}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {
                                cryptosList?.data?.coins.map((coin, i) => (
                                    <Option value={coin.name} key={i}>{coin.name}</Option>
                                ) )
                            }
                        </Select>
                    </Col>
                )
            }
            {
                cryptoNews?.value.length > 0 && cryptoNews.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">

                                    <Title className="news-title" level={4}>{news.name}</Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news" />
                                </div>
                                <p>
                                    { news?.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news" />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                        <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

export default News