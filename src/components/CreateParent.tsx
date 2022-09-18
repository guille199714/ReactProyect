import React, { Dispatch, SetStateAction, useState } from 'react'

import { LockOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Space, Select } from 'antd'
import styled from 'styled-components'

const ButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
  min-widht: 250px
`
const FormItems = styled(Form.Item)`
display: flex;
justify-content: center;
width: 100%;
margin: 0;
widht: 600px
`
type CreateParentProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const CreateParent: React.FC<CreateParentProps> = (props) => {
  const { setVisible, visible } = props

  const handleSubmit = () => {
    setVisible(false)
  }  
  const { Search } = Input
  
  return (
    <Modal title='Crear Padre' visible={visible} footer={false} onCancel={() => setVisible(false)} width={400}
    style = {{
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Form
        layout='horizontal'
        onFinish={handleSubmit}
      >
        <FormItems>
        <Space size={200} align="center">
          <Space direction="vertical" size={2}>
            <Form.Item style = {{ textAlign: "center" }} >
              <Input placeholder='Nombre' />
            </Form.Item>
            <Form.Item>
              <Input placeholder='Email'/>
            </Form.Item>
            <Form.Item>
              <Input.Password
                placeholder='Contraseña'
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
                <Search
                placeholder='Buscar existente'
                allowClear
                style={{ width: 260 }}
                />
            </Form.Item>
            <div style={{ borderTop: '1px solid gray', borderColor: '#f0f0f0', margin: '1% 3% 0 3%', height: '2vh'}}></div>
            <Form.Item style = {{ textAlign: "center" }}>
              <Input placeholder='Nombre'/>
            </Form.Item>
            <Form.Item>
              <Input placeholder='Email'/>
            </Form.Item>
            <Form.Item>
              <Input.Password
                placeholder='Contraseña'
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item label='Grupo'>
              <Select>
                <Select.Option>1°A</Select.Option>
                <Select.Option>2°B</Select.Option>
                <Select.Option>1°B</Select.Option>
                <Select.Option>3°A</Select.Option>
                <Select.Option>3°B</Select.Option>
                <Select.Option>4°B</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='grado' >
            <Select>
                <Select.Option>1°A</Select.Option>
                <Select.Option>2°B</Select.Option>
                <Select.Option>1°B</Select.Option>
                <Select.Option>3°A</Select.Option>
                <Select.Option>3°B</Select.Option>
                <Select.Option>4°B</Select.Option>
              </Select>
            </Form.Item>
                <Button style={{float: 'right'}} type='primary' htmlType='submit' size={"small"}>
                    confirmar
                </Button>
                &nbsp;&nbsp;&nbsp;
                <div style={{ borderTop: '1px solid gray', borderColor: '#f0f0f0', margin: '1% 3% 0 3%', height: '2vh'}}></div>
          </Space>
        </Space>
        </FormItems>
        <ButtonContainer>
          <Button type='primary' htmlType='submit'>
            Aceptar
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button type='default' htmlType='submit'>
            Cancelar
          </Button>
        </ButtonContainer>
      </Form>
    </Modal>
  )
}

export default CreateParent
