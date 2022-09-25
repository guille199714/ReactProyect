import React, { Dispatch, SetStateAction, useState } from 'react'

import { Col, Row, Input } from 'antd'
import { Button, Form, Modal } from 'antd'
import { TreeSelect } from 'antd'
import styled from 'styled-components'

import SequencesList from './SequencesList'

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
  unidad: string
}

interface Subcategory {
  todas: string
  cienciaycultura: string
  matematica: string
  vidapractica: string
  lengua: string
}

interface Sequence {
  todas: string
  secuencia2022: string
  secuencia2021: string
}

const areaArrayData = [
  { key: 'Ciencia y cultura', value: 'cienciaycultura' },
  { key: 'Matemática', value: 'matematica' },
  { key: 'Vida práctica', value: 'vidapractica' },
  { key: 'Lengua', value: 'lengua' }
]

const sequenceArrayData = [
  { sequenceKey: 'Secuencia2022', sequenceValue: 'secuencia2022' },
  { sequenceKey: 'Secuencia2021', sequenceValue: 'secuencia2021' },
]

const subCategoryData = {
  todas: [],
  cienciaycultura: ['Historia', 'Geografía', 'Ciencia', 'Botánica'],
  matematica: [
    'Numeración 1-10',
    'Numeración 11-100',
    'Sistema decimal',
    '4 operaciones',
    'Memorización',
  ],
  vidapractica: ['Preliminares', 'Cuidado personal', 'Cuidado del ambiente', 'Cortesía'],
  lengua: ['Lectura', 'Escritura', 'Gramática']
}

const sequenceMockData = {
  todas: [],
  secuencia2022: ['unidad-1-2022', 'unidad-2-2022'],
  secuencia2021: ['unidad-1-2021', 'unidad-2-2021', 'unidad-3-2021', 'unidad-4-2021']
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => {
  const area = areaArrayData[Math.floor(Math.random() * areaArrayData.length)];
  const { key, value } = area;
  const materias = subCategoryData[value as keyof Subcategory]

  const secuencia = sequenceArrayData[Math.floor(Math.random() * sequenceArrayData.length)];
  const { sequenceValue } = secuencia;
  const unidades = sequenceMockData[sequenceValue as keyof Sequence]

  return {
    title: `Secuencias${i + 1}`,
    area: key,
    materia: materias[Math.floor(Math.random() * materias.length)],
    unidad: unidades[Math.floor(Math.random() * unidades.length)]
  }
})

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
        value: 'Numeración 1-10',
      },
      {
        title: 'Numeración 11 - 100',
        value: 'Numeración 11-100',
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
    value: 'Vida práctica',
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

type AssignSequencesProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const AssignSequences: React.FC<AssignSequencesProps> = (props: AssignSequencesProps) => {
  const { visible, setVisible } = props
  const [selectedItems, setSelectedItems] = useState<RecordType[]>([])
  const [items, setItems] = useState<RecordType[]>(mockData)
  const [search, setSearch] = useState<string>('')
  // value para el tree select
  const [areaValue, setAreaValue] = useState<string>()
  const [filteredItems, setFilteredItems] = useState<RecordType[]>(mockData)

  const convertToUpperCase = (value: string) => value.toUpperCase().trim();

  const filterByArea = (newValue: string) => {
    if (newValue === 'Todas') {
      setItems(mockData)
      setFilteredItems(mockData)
      setAreaValue(newValue)
      return;
    }

    const data = mockData.filter((elem) =>
      convertToUpperCase(elem.materia) === convertToUpperCase(newValue) || convertToUpperCase(elem.area) === convertToUpperCase(newValue))

    setItems(data)
    setFilteredItems(data)
    setAreaValue(newValue)
  }

  const searchByTitle = (value: string, filteredItems: RecordType[]) => {
    setSearch(value)
    if (!value) {
      return true
    }

    setItems(filteredItems.filter((elem) => elem.title.toUpperCase().includes(value.toUpperCase())))
  }

  const addSequencesInSelectedItems = (value: RecordType) => {
    if (selectedItems.includes(value)) {
      return
    }
    setSelectedItems([...selectedItems, value])
  }

  const clearAllFilter = () => {
    setItems(mockData)
    setFilteredItems(mockData)
    setAreaValue(undefined)
    setSearch('')
  }

  return (
    <Modal
      title='Asignar Secuencias'
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false)
        setSelectedItems([])
      }}
      width={1050}
      maskClosable={false}
      afterClose={() => clearAllFilter()}
    >
      <Row>
        <Col span={16}>
          <div>
            <Search
              value={search}
              onChange={(value) => searchByTitle(value.target.value, filteredItems)}
              placeholder='Buscar Secuencias'
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
            </div>
          </div>
          <div style={{ paddingTop: '4vh', paddingBottom: '1vh' }}>
            <SequencesList
              removeRecord={() => undefined}
              setRecord={(value: RecordType) => addSequencesInSelectedItems(value)}
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
              Secuencias
              <br></br>
              Seleccionadas:
            </p>
          </div>
          <Form>
            <div style={{ paddingBottom: '1vh' }}>
              <SequencesList
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

export default AssignSequences
