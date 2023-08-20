// import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import { Layout, Space, Typography } from 'antd'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import CryptoDetails from './pages/CryptoDetails'
// import Exchanges from './pages/Exchanges'
import Cryptocurrencies from './pages/Cryptocurrencies'
import News from './pages/News'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />} >
          <Route index path='home' element={<Home />} />
          {/* <Route exact path='exchanges' element={<Exchanges />} /> */}
          <Route exact path='cryptocurrencies' element={<Cryptocurrencies />} />
          <Route path='cryptocurrencies/:coinId' element={<CryptoDetails />}/>
          <Route exact path='news' element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
