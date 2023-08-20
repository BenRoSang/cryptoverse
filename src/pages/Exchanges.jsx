import { Avatar, Col, Collapse, Row, Table, Typography } from "antd"
import HTMLReactParser from "html-react-parser"
import millify from "millify"
import { useGetExchangesQuery } from "../services/cryptoApi"
import Loader from "../components/Loader"

const { Title, Text } = Typography;


function Exchanges({coinId}) {
  const { data: exchanges, isLoading } = useGetExchangesQuery(coinId)
  const exchangesList = exchanges?.data?.exchanges;
  if(isLoading) return <Loader />


  const data = []
  exchangesList?.map((exchange, i) => {

    data.push({
      key: i,
      exchange: <>
                <Text><strong>{exchange.rank}</strong></Text>
                <Avatar className="exchange-image" src={exchange.iconUrl} />
                <Text><strong>{exchange.name}</strong></Text>
              </>,
      trade: millify(exchange['24hVolume']),
      markets: millify(exchange.numberOfMarkets),
      change: millify(exchange.price)
  })
})

  const columns = [
    {
      title: 'Exchanges',
      dataIndex: 'exchange',
      key: 'exchange',
    },
    {
      title: '24h Trade Volume',
      dataIndex: 'trade',
      key: 'trade',
    },
    {
      title: 'Markets',
      dataIndex: 'markets',
      key: 'markets',
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} />;
    </>
  )
}

export default Exchanges