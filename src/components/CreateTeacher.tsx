import React, { Dispatch, SetStateAction, useState } from 'react'

import { LockOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Space, Image, Select } from 'antd'
import styled from 'styled-components'

const ButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: end;
  width: 100%;
  margin: 0;
`

const ImageContainer = styled(Image)`
  border-radius: 50%
`

type CreateTeacherProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const CreateTeacher: React.FC<CreateTeacherProps> = (props) => {
  const { setVisible, visible } = props

  const handleSubmit = () => {
    setVisible(false)
  }

  return (
    <Modal title='Crear Maestro' visible={visible} footer={false} onCancel={() => setVisible(false)} width={600}>
      <Form
        layout='vertical'
        onFinish={handleSubmit}
      >
        <Space size={50} align="center">
          <ImageContainer src="https://p.kindpng.com/picc/s/244-2446316_computer-icons-camera-photography-area-text-png-add.png" width={250} height={250} preview={false}></ImageContainer>
          <Space direction="vertical" size={2}>
            <Form.Item label='Nombre de usuario'>
              <Input/>
            </Form.Item>
            <Form.Item label='Nombre'>
              <Input/>
            </Form.Item>
            <Form.Item label='Apellido'>
              <Input/>
            </Form.Item>
            <Form.Item label='Email'>
              <Input />
            </Form.Item>
            <Form.Item label='Contraseña'>
              <Input.Password
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
            <Form.Item label='Cédula'>
              <Input/>
            </Form.Item>
            <Form.Item label='Teléfono'>
              <Input/>
            </Form.Item>
          </Space>
        </Space>
        
        <ButtonContainer>
          <Button type='primary' htmlType='submit'>
            Aceptar
          </Button>
          <Button type='default' htmlType='submit'>
            Cancelar
          </Button>
        </ButtonContainer>
      </Form>
    </Modal>
  )
}

export default CreateTeacher
