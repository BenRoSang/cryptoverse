import { BulbOutlined, FundOutlined, HomeOutlined,
        MenuOutlined,
        MoneyCollectOutlined } from "@ant-design/icons"
import { Avatar,
        Button,
        Menu,
        Typography } from "antd"
import { Link } from "react-router-dom"
import icon from '../../assets/cryptocurrency.png'
import React, { useEffect, useState } from "react"

function Navbar() {
    const navArrayKey = [`Home`, `Cryptocurrencies`, `News`];
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if(screenSize < 768) {
            setActiveMenu(false)
        }else{
            setActiveMenu(true)
        }

    }, [screenSize])


    return (
        <nav className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Crytoverse</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>

            </div>
            { activeMenu && (
                <Menu
                    theme="dark"
                    mode="vertical"
                    defaultSelectedKeys={['1']}
                    items={
                        [HomeOutlined, FundOutlined, BulbOutlined].map((icon,key) => {
                            return {
                                key,
                                icon: React.createElement(icon),
                                label: <Link to={`/${navArrayKey[key].toLowerCase()}`}>{navArrayKey[key]}</Link>
                            }
                        })
                    }
                />
            )}
        </nav>
    )
}

export default Navbar