import React, { useState } from 'react'

import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Form, Input, Space } from 'antd'
import axios from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledSpace = styled(Space)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

type loginData = {
  username: string
  password: string
}

const useLogin = async (data: loginData) => {
  const { data: response } = await axios.post(
    'http://pitagorasdev.herokuapp.com/api/principal/login',
    data,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  )
  return response.data
}

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { mutate, isLoading, error } = useMutation(useLogin, {
    onSuccess: () => {
      navigate('/home')
    },
  })

  const handleSubmit = () => {
    mutate({ username, password })
  }

  return (
    <StyledSpace direction='vertical' size={40} align='center' style={{ backgroundColor: '#fff' }}>
      <Space size={20}>
        <Avatar style={{ backgroundColor: '#495C83' }} shape='square' size={100}>
          DIRECTOR
        </Avatar>
        <Avatar style={{ backgroundColor: '#7A86B6' }} shape='square' size={100}>
          MAESTRO
        </Avatar>
        <Avatar style={{ backgroundColor: '#A8A4CE' }} shape='square' size={100}>
          PADRE
        </Avatar>
        <Avatar style={{ backgroundColor: '#C8B6E2' }} shape='square' size={100}>
          ALUMNO
        </Avatar>
      </Space>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            style={{ width: '300px' }}
            prefix={<UserOutlined />}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            style={{ width: '300px' }}
            prefix={<LockOutlined />}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox style={{ width: '200px' }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </StyledSpace>
  )
}

export default Login
