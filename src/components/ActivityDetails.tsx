import React, { Dispatch, SetStateAction, useState } from 'react'

import { EditOutlined, SearchOutlined } from '@ant-design/icons'
import { CloseCircleFilled } from '@ant-design/icons'
import { hover } from '@testing-library/user-event/dist/hover'
import { Button, Form, Input, Modal, Select, Row, Col, Typography, Image, List } from 'antd'
import styled from 'styled-components'

const ListItems = [
  "Material 1",
  "Material 2",
  "Material 3",
]

const AllMaterials = [
  "Material 1",
  "Material 2",
  "Material 3",
  "aver a ver",
  "saul",
  "goodman",
]

const ButtonsContainer = styled(Form.Item)`
  display: flex;
  justify-content: end;
  width: 95%;
  margin: 0;
`

const RowContainer = styled(Row)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10%;
  margin-bottom: 10%;
  align-items: center;
`

const ItemContainer = styled(List.Item)`
  display: flex;
  flex-direction: row;
  text-align: center;
`
const DataContainer = styled(List.Item)`
  display: flex;
  flex-direction: row;
  text-align: center;
  &:hover {
    background-color: lightgrey;
  }
`

const Item = styled(Form.Item)`
  margin-bottom: 5%;
`

const ImageContainer = styled(Image)`
  border-radius: 50%
`

const DataList = styled(List)`
  overflow: auto;
  max-height: 120px;
  width: 100%;
  position: absolute;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #69c0ff;
`

const ItemList = styled(List)`
  
`

const { TextArea } = Input;
const { Title } = Typography;

type ActivityDetailsProps = {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean
  setDisabled: Dispatch<SetStateAction<boolean>>
  disabled: boolean
}

const ActivityDetails: React.FC<ActivityDetailsProps> = (props) => {
  const { setVisible, visible, setDisabled, disabled } = props
  const [items, setItems] = useState(ListItems)
  const [filter, setFilter] = useState<string[]>([])
  const [material, setMaterial] = useState("")

  const handleRemove = (item : string) => {
    setItems(items.filter(i => i !== item))
  }

  const handleAdd = (item : string) => {
    if (items.indexOf(item) === -1) {
      items.push(item)
    }
    setMaterial("")
    setFilter([])
  }

  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setDisabled(disabled)
  }

  const handleExit = () => {
    setVisible(false)
  }

  const handleEdit = () => {
    setDisabled(!disabled)
  }

  const handleSubmit = () => {
    setDisabled(!disabled)
  }

  const handleFilter = (searchWord: string) => {
    setMaterial(searchWord)
    const newFilter = AllMaterials.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase())
    });

    if (searchWord === "") {
      setFilter([])
    } else {
      setFilter(newFilter)
    }
  }


  return (
    <Modal title={<ButtonsContainer style = {{width: '95%'}}><EditOutlined onClick={handleEdit} hidden={!disabled}/></ButtonsContainer>} 
        visible={visible} footer={false} onCancel={() => setVisible(false)} width={700}>
      <Form
        layout='vertical'
        onFinish={handleExit}
        onValuesChange={onFormLayoutChange}
        disabled={disabled}
      >
        <Row gutter={30}>
          <Col flex={2}>
            <RowContainer>
              <ImageContainer src="https://i.ytimg.com/vi/gDjMZvYWUdo/maxresdefault.jpg" width={250} height={250} preview={false}></ImageContainer>
            </RowContainer>
            <RowContainer hidden={!disabled}>
            <Title level={2}>
              Actividad 1
            </Title>
            </RowContainer>
            <Input size="large" defaultValue="Actividad 1" hidden={disabled} style={{textAlign: 'center'}}/>
          </Col>
          <Col flex={8}>
            <Item>
              <Select placeholder="¡rea">
                <Select.Option value="area1">¡rea 1</Select.Option>
                <Select.Option value="area2">¡rea 2</Select.Option>
              </Select>
            </Item>
            <Item>
              <Select placeholder="Materia">
                <Select.Option value="area1">Materia 1</Select.Option>
                <Select.Option value="area2">Materia 2</Select.Option>
              </Select>
            </Item>
            <Item>
              <Select placeholder="Ciclo">
                <Select.Option value="area1">Ciclo 1</Select.Option>
                <Select.Option value="area2">Ciclo 2</Select.Option>
              </Select>
            </Item>
            <Item>
              <Select placeholder="Grado">
                <Select.Option value="area1">Grado 1</Select.Option>
                <Select.Option value="area2">Grado 2</Select.Option>
              </Select>
            </Item>
            <Item label="Materiales:">
            <div hidden={disabled}>
                <Input
                  placeholder="Agregar un material..."
                  id="searchMaterials"
                  value={material}
                  onChange={(e) => handleFilter(e.target.value)}
                  suffix={<SearchOutlined />}
                />
                {filter.length != 0 && (
                <DataList size="small" bordered style={{zIndex: 2}}>
                  {filter.map(d =>(
                    <DataContainer key={d} onClick={() => handleAdd(d)}>
                      {d}
                    </DataContainer>
                  ))}
                </DataList>
                )}
                
              </div>
              <ItemList size="small" bordered>
                {items.map(item =>(
                  <ItemContainer key={item}>
                    {item}
                  <CloseCircleFilled 
                    style={{ color: '#f5222d', fontSize: '20px' }} 
                    hidden={disabled}
                    onClick = {() => handleRemove(item)}
                    />
                </ItemContainer>
                ))}
              </ItemList>
            </Item>
            <Item label="DescripciÛn:">
              <TextArea rows={4} />
            </Item>
          </Col>
        </Row>
        <ButtonsContainer style = {{width: '100%'}}>
          <Button type='primary' onClick={handleSubmit} hidden={disabled}>
            Aceptar
          </Button>
          <Button type='default' onClick={handleExit} hidden={disabled} style={{ marginLeft: '7px' }}>
            Cancelar
          </Button>
        </ButtonsContainer>
      </Form>
    </Modal>
  )
}

export default ActivityDetails