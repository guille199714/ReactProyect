import React, { useState } from 'react'

import { TeamOutlined, NotificationOutlined, HomeOutlined } from '@ant-design/icons'
import { Layout as AntdLayout, Menu, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const { Header, Content, Sider } = AntdLayout

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`

const Title = styled(Typography.Title)`
  margin: 0 !important;
  line-height: revert !important;
  padding: 0 10px;
  color: white !important;
`

const items2: MenuProps['items'] = [
  {
    key: `sub1`,
    icon: React.createElement(HomeOutlined),
    label: `Inicio`,
  },
  {
    key: `sub2`,
    icon: React.createElement(TeamOutlined),
    label: `Planificación`,
  },
  {
    key: `sub3`,
    icon: React.createElement(NotificationOutlined),
    label: `subnav 3`,
  },
]

type LayoutProps = {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)

  const handleNavClick = (key: string) => {
    switch (key) {
      case 'sub1':
        navigate('/home')
        break
      case 'sub2':
        navigate('/planning')
        break
      case 'sub3':
        navigate('/another-page')
        break
      default:
        console.log(key)
    }
  }

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <StyledHeader className='header'>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <img src={'./logo192.png'} style={{ height: '60%', width: 'auto' }} />
          <Title className='pageTitle'>Pitágoras</Title>
        </div>
      </StyledHeader>
      <AntdLayout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu
            theme='dark'
            defaultSelectedKeys={['1']}
            mode='inline'
            items={items2}
            onClick={(item) => handleNavClick(item.key)}
          />
        </Sider>
        <AntdLayout style={{ padding: '0 24px 24px' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>{children}</Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout
