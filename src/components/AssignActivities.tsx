import React, { Dispatch, SetStateAction, useState } from 'react'

import { Col, Row, Input } from 'antd'
import { Button, Form, Modal } from 'antd'
import { TreeSelect } from 'antd'
import styled from 'styled-components'

import ActivitiesList from './ActivitiesList'

const { Search } = Input

const SubmitButtonContainer = styled(Form.Item)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0;
`

type RecordType = {
  title: string
  area: string
  materia: string
  secuencia: string
  unidad: string
}

const areaArrayData = ['Ciencia y cultura', 'Matemática', 'Vida práctica', 'Lengua']

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  title: `Actividad${i + 1}`,
  area: areaArrayData[Math.floor(Math.random() * areaArrayData.length)].toString(),
  materia: `Historia`,
  secuencia: `Secuencia${Math.floor(Math.random() * (2022 - 2021 + 1) + 2021)}`,
  // unidad: (Math.random()* (2 - 0) + 0).toString(),
  unidad: `Unidad${Math.floor(Math.random() * (2 - 1 + 1) + 1)}`,
}))

const sequenceData = [
  {
    title: 'Todas',
    value: 'Todas',
  },
  {
    title: 'Secuencia2022',
    value: 'Secuencia2022',
    children: [
      {
        title: 'Unidad1',
        value: 'Unidad1',
      },
      {
        title: 'Unidad2',
        value: 'Unidad2',
      },
    ],
  },
  {
    title: 'Secuencia2021',
    value: 'Secuencia2021',
  },
]

const areaData = [
  {
    title: 'Todas',
    value: 'Todas',
  },
  {
    title: 'Ciencia y cultura',
    value: 'Ciencia y cultura',
    children: [
      {
        title: 'Historia',
        value: 'Historia',
      },
      {
        title: 'Geografía',
        value: 'Geografía',
      },
      {
        title: 'Ciencia',
        value: 'Ciencia',
      },
      {
        title: 'Botánica',
        value: 'Botánica',
      },
    ],
  },
  {
    title: 'Matemática',
    value: 'Matemática',
    children: [
      {
        title: 'Numeración 1 - 10',
        value: 'Numeración 1 - 10',
      },
      {
        title: 'Numeración 11 - 100',
        value: 'Numeración 11 - 100',
      },
      {
        title: 'Sistema decimal',
        value: 'Sistema decimal',
      },
      {
        title: '4 operaciones',
        value: '4 operaciones',
      },
      {
        title: 'Memorización',
        value: 'Memorización',
      },
    ],
  },
  {
    title: 'Vida Practica',
    value: 'Vida Practica',
    children: [
      {
        title: 'Preliminares',
        value: 'Preliminares',
      },
      {
        title: 'Cuidado Personal',
        value: 'Cuidado Personal',
      },
      {
        title: 'Cuidado del ambiente',
        value: 'Cuidado del ambiente',
      },
      {
        title: 'Cortesía',
        value: 'Cortesía',
      },
    ],
  },
  {
    title: 'Lengua',
    value: 'Lengua',
    children: [
      {
        title: 'Lectura',
        value: 'Lectura',
      },
      {
        title: 'Escritura',
        value: 'Escritura',
      },
      {
        title: 'Gramática',
        value: 'Gramática',
      },
    ],
  },
]

type AssignActivitiesProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const AssignActivities: React.FC<AssignActivitiesProps> = (props) => {
  const { visible, setVisible } = props
  const [selectedItems, setSelectedItems] = useState<RecordType[]>([])
  const [items, setItems] = useState<RecordType[]>(mockData)
  // value para el tree select
  const [sequenceValue, setSequenceValue] = useState<string>()
  const [areaValue, setAreaValue] = useState<string>()
  const [filteredItems, setFilteredItems] = useState<RecordType[]>(mockData)

  const filterBySequence = (newValue: string) => {
    if (newValue === 'Todas') {
      setItems(mockData)
      setFilteredItems(mockData)
      setSequenceValue(newValue)
      return
    }
    setItems(mockData.filter((elem) => elem.unidad === newValue || elem.secuencia === newValue))
    mockData.filter((elem) => elem.unidad === newValue || elem.secuencia === newValue),
      setSequenceValue(newValue)
    setAreaValue('Todas')
  }

  const filterByArea = (newValue: string) => {
    if (newValue === 'Todas') {
      setItems(mockData)
      setFilteredItems(mockData)
      setAreaValue(newValue)
      return
    }

    setItems(mockData.filter((elem) => elem.materia === newValue || elem.area === newValue))
    setFilteredItems(mockData.filter((elem) => elem.materia === newValue || elem.area === newValue))
    console.log(newValue)
    setAreaValue(newValue)
    setSequenceValue('Todas')
  }

  const searchByTitle = (value: string, filteredItems: RecordType[]) =>
    setItems(filteredItems.filter((elem) => elem.title.toUpperCase().includes(value.toUpperCase())))

  const addActivitiesInSelectedItems = (value: RecordType) => {
    if (selectedItems.includes(value)) {
      return
    }
    setSelectedItems([...selectedItems, value])
  }

  return (
    <Modal
      title='Asignar Actividades'
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false)
        setSelectedItems([])
      }}
      width={1050}
      maskClosable={false}
    >
      <Row>
        <Col span={16}>
          <div>
            <Search
              onSearch={(value: string) => searchByTitle(value, filteredItems)}
              placeholder='Buscar Actividad'
              allowClear
              style={{ width: 250 }}
              enterButton
            />
            <div style={{ float: 'right' }}>
              <TreeSelect
                placeholder='Area'
                style={{ width: 180 }}
                value={areaValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={areaData}
                treeDefaultExpandAll
                onChange={(value: string) => filterByArea(value)}
              />
              &nbsp;&nbsp;&nbsp;
              <TreeSelect
                placeholder='Secuencia'
                style={{ width: 180 }}
                value={sequenceValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={sequenceData}
                treeDefaultExpandAll
                onChange={(value: string) => filterBySequence(value)}
              />
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
        <div
          style={{
            borderRight: '1px solid gray',
            borderColor: '#f0f0f0',
            margin: '1% 3% 0 3%',
            height: '70vh',
          }}
        ></div>
        <Col span={6}>
          <div>
            <p style={{ textAlign: 'center' }}>
              Actividades
              <br></br>
              Seleccionadas:
            </p>
          </div>
          <Form>
            <div style={{ paddingBottom: '1vh' }}>
              <ActivitiesList
                data={selectedItems}
                removeRecord={(value) =>
                  setSelectedItems([...selectedItems.filter((item) => item.title !== value.title)])
                }
                setRecord={() => undefined}
                isSelectedActivity
              />
            </div>

            <SubmitButtonContainer>
              <Button
                onClick={() => {
                  setVisible(false)
                  setSelectedItems([])
                }}
              >
                Cancelar
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                type='primary'
                onClick={() => {
                  setVisible(false)
                  setSelectedItems([])
                }}
              >
                Aceptar
              </Button>
            </SubmitButtonContainer>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}

export default AssignActivities
