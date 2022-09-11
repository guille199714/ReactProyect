import React, { Dispatch, SetStateAction, useState } from 'react'
import { Col, Row , Space, Input, Select} from 'antd';
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Form, Modal, List } from 'antd'
import styled from 'styled-components'
import TransferActivities from './TransferActivities';

const { Search } = Input
const { Option } = Select

const SubmitButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: end;
  width: 100%;
  margin: 0;
`
type AsignActivitiesProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const AsignActivities: React.FC<AsignActivitiesProps> = (props) => {
  const { setVisible, visible } = props
  const [componentDisabled, setComponentDisabled] = useState(false)

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled)
  }

  const handleSubmit = () => {
    setVisible(false)
  }

  const Item = styled(Form.Item)`
  margin-bottom: 5%;
`
  const ItemList = styled(List)`
  `
  const ItemContainer = styled(List.Item)`
  display: flex;
  flex-direction: row;
  text-align: center;
`

const ListItems = [
    "Material 1",
    "Material 2",
    "Material 3",
  ]
const [items, setItems] = useState(ListItems)
const handleRemove = (item : string) => {
    setItems(items.filter(i => i !== item))
  }

  return (
    <Modal title='Asignar Actividades' visible={visible} footer={false} onCancel={() => setVisible(false)} width={700} >
        <Form>
        <Row>
            <Col span={16}>
                <Space>
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    <Search placeholder="Buscar Actividad" allowClear style={{ width: 180 }} enterButton />
                    <Select
                        placeholder='Filtrar'
                            style={{ width: 100 }}
                    >
                        <Option value='0'>Todos los ciclos</Option>
                        <Option value='1'>Primer ciclo</Option>
                        <Option value='2'>Segundo ciclo</Option>
                        <Option value='3'>Tercer ciclo</Option>
                    </Select>
                </Space>
            </Col>
        

            <Col span={8}>
                <p style={{textAlign: "center"}}>
                    Actividades
                    <br></br>
                    Seleccionadas:
                </p>
            </Col>
        </Row>
        <Row>
        <Col span={8}>
            </Col>
            <Col span={16}>
            <ItemList size="small" bordered>
                {items.map(item =>(
                  <ItemContainer key={item}>
                    {item}
                  <CloseCircleFilled 
                    style={{ color: '#f5222d', fontSize: '20px' }} 
                    hidden={visible}
                    onClick = {() => handleRemove(item)}
                    />
                </ItemContainer>
                ))}
              </ItemList>
                <br></br>
                <br></br>
            </Col>
            
        </Row>
                <SubmitButtonContainer >
                    <Button type='primary'  htmlType='submit'>
                        Cancelar
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type='primary' htmlType='submit'>
                        Aceptar
                    </Button>
                </SubmitButtonContainer>
        </Form>
    </Modal>
  )
}

export default AsignActivities