import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

const { Title } = Typography

function LineChart({coinHistory, currentPrice, coinName}) {

    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString('en-GB', {
            month: '2-digit',day: '2-digit',year: 'numeric'})
            )
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true
            }
        },
    };


    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                <Col className='price-container'>
                    <Title className='price-change' level={5}>{coinHistory?.data?.change}%</Title>
                    <Title className='current-price' level={5}>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart