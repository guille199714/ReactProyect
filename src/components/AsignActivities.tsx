import React, { Dispatch, SetStateAction, useState } from 'react'
import { Col, Row, Input, Select } from 'antd';
import { Button, Form, Modal } from 'antd'
import styled from 'styled-components'
import ActivityDetails from './ActivityDetails';
import { mockData, RecordType } from '../utils/fetch-data';

const { Search } = Input
const { Option } = Select

const SubmitButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
`
type AsignActivitiesProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const AsignActivities: React.FC<AsignActivitiesProps> = (props) => {
  const { setVisible, visible } = props;
  const [selectedItems, setSelectedItems] = useState<RecordType[]>([]);

  return (
    <Modal title='Asignar Actividades' visible={visible} footer={false} onCancel={() => setVisible(false)} width={1000} >
        <Row>
          <Col span={16}>
            <div>
              <Search placeholder="Buscar Actividad" allowClear style={{ width: 320 }} enterButton />
              <div style={{ float: 'right' }}>
                <Select
                  placeholder='Filtrar'
                  style={{ width: 150 }}
                >
                  <Option value='0'>Todos los ciclos</Option>
                  <Option value='1'>Primer ciclo</Option>
                  <Option value='2'>Segundo ciclo</Option>
                  <Option value='3'>Tercer ciclo</Option>
                </Select>
              </div>
            </div>
            <div style={{ paddingTop: '4vh', paddingBottom: '1vh' }}>
              <ActivityDetails removeRecord={() => undefined} setRecord={(value) => setSelectedItems([ ...selectedItems, value ])} data={mockData}/>
            </div>
          </Col>
          <div style={{borderRight: '1px solid gray', margin: '3%', height: '50vh'}}></div>
          <Col span={6}>
            <div>
              <p style={{ textAlign: "center" }}>
                Actividades
                <br></br>
                Seleccionadas:
              </p>
            </div>

            <div style={{ paddingTop: '4vh', paddingBottom: '1vh' }}>
              <ActivityDetails data={selectedItems} removeRecord={(value) => setSelectedItems([ ...selectedItems.filter(item => item.title !== value.title) ])} setRecord={() => undefined} isSecondaryActivity/>
            </div>

            <SubmitButtonContainer>
              <Button onClick = {() => setVisible(false)}>
                Cancelar
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type='primary'>
                Aceptar
              </Button>
            </SubmitButtonContainer>
          </Col>
        </Row>
    </Modal>
  )
}

export default AsignActivities