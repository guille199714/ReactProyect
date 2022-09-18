import React, { Dispatch, SetStateAction, useState } from 'react'
import { Col, Row, Input, Select } from 'antd';
import { Button, Form, Modal } from 'antd'
import styled from 'styled-components'
import ActivitiesList from './ActivitiesList';

const { Search } = Input
const { Option } = Select

const SubmitButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
`

type RecordType = {
  title: string;
  materia: String;
  secuencia: String;
  unidad: String;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  title: `Actividad${i + 1}`,
  materia: `Materia${i + 1}`,
  secuencia: `Secuencia ${2000 + i + 1}`,
  unidad: (Math.random()* (20 - 0) + 0).toString(),
}));

type AsignActivitiesProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const AsignActivities: React.FC<AsignActivitiesProps> = (props) => {
  const { setVisible, visible } = props;
  const [selectedItems, setSelectedItems] = useState<RecordType[]>([]);
  const [items, setItems] = useState<RecordType[]>(mockData);

  const searchByTitle = (value: string) =>
    setItems(mockData.filter((elem) => elem.title.toUpperCase().includes(value.toUpperCase())));
  
  const addActivitiesInSelectedItems = (value: RecordType) => {
    if (selectedItems.includes(value)) {
      return;
    }
    setSelectedItems([ ...selectedItems, value ])
  }

  return (
    <Modal title='Asignar Actividades' visible={visible} footer={false} onCancel={() => setVisible(false)} width={1000} >
        <Row>
          <Col span={16}>
            <div>
              <Search
                onSearch={(value: string) => searchByTitle(value)} placeholder="Buscar Actividad" allowClear style={{ width: 320 }} enterButton />
              <div style={{ float: 'right' }}>
                <Select
                  placeholder='Filtrar'
                  style={{ width: 150 }}
                  onChange = {(value: string) => searchByTitle(value)}
                >
                  <Option value='0'>Materia</Option>
                  <Option value='1'>Secuencia</Option>
                  <Option value='2'>Unidad</Option>
                </Select>
              </div>
            </div>
            <div style={{ paddingTop: '4vh', paddingBottom: '1vh' }}>
              <ActivitiesList
                removeRecord={() => undefined}
                setRecord={(value: RecordType) => addActivitiesInSelectedItems(value)}
                data={items}
              />
            </div>
          </Col>
          <div style={{ borderRight: '1px solid gray', borderColor: '#f0f0f0', margin: '1% 3% 0 3%', height: '70vh'}}></div>
          <Col span={6}>
            <div>
              <p style={{ textAlign: "center" }}>
                Actividades
                <br></br>
                Seleccionadas:
              </p>
            </div>
            <Form> 
            <div style={{ paddingBottom: '1vh' }}>
              <ActivitiesList data={selectedItems} removeRecord={(value) => setSelectedItems([ ...selectedItems.filter(item => item.title !== value.title) ])} setRecord={() => undefined} isSelectedActivity/>
            </div>

            <SubmitButtonContainer>
              <Button onClick = {() => {setVisible(false) ; setSelectedItems([]);}} >
                Cancelar
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type='primary' onClick = {() => {setVisible(false) ; setSelectedItems([]);}}>
                Aceptar
              </Button >
            </SubmitButtonContainer >
            </Form>
          </Col>
        </Row>
    </Modal>
  )
}

export default AsignActivities