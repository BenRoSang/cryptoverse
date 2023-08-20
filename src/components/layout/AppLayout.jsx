import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Layout } from 'antd'

const AppLayout = () => {
  return (
    <div className='app'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <Outlet />
        </Layout>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default AppLayout