import { Space, Typography } from "antd"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer>
      <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>
        Crytoverse <br/> All rights reserved
      </Typography.Title>
      <Space>
        <Link to={'/'}>Home</Link>
        <Link to={'/exchanges'}>Exchanges</Link>
        <Link to={'/news'}>News</Link>
      </Space>
    </footer>
  )
}

export default Footer