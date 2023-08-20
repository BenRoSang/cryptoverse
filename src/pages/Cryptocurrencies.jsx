import millify from "millify"
import { Link } from "react-router-dom"
import { Card, Row, Col, Input, Typography } from "antd"
import { useGetCryptosQuery } from "../services/cryptoApi"
import { useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";
import Loader from "../components/Loader";
import Exchanges from "./Exchanges";


function Cryptocurrencies({simplified}) {

  const count = simplified ? 10 : 100;
  const { data: cryptosList, error, isLoading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos ] = useState(cryptosList?.data?.coins)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCryptos(filteredData)

  }, [cryptosList, searchTerm])


  if(isLoading) return <Loader />

  return (
    <>
      { !simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
          {
            cryptos?.length > 0 && cryptos.map((crypto, i) => (
              <Col xs={24} sm={12} lg={6} className="crypto-card" key={i}>
                <Link to={`/cryptocurrencies/${crypto.uuid}`}>
                    <Card
                      title={`${crypto.rank}. ${crypto.name}`}
                      extra={ <img className="crypto-image" src={crypto.iconUrl} />}
                      hoverable
                    >
                      <p>Price: {millify(crypto.price)}</p>
                      <p>Price: {millify(crypto.marketCap)}</p>
                      <p>Price: {millify(crypto.change)}%</p>
                    </Card>

                </Link>
              </Col>
            ))
          }
      </Row>

    </>
  )
}

export default Cryptocurrencies