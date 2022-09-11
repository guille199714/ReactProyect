import React, { Dispatch, SetStateAction, useState } from 'react'

import { CloseOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { CloseCircleFilled } from '@ant-design/icons'
import { Avatar, List, Button, Form, Input, Modal, Select, Row, Col, Typography, Image } from 'antd'
import styled from 'styled-components'
import VirtualList from 'rc-virtual-list';
import { RecordType } from '../utils/fetch-data'

const { TextArea } = Input;
const { Title } = Typography;

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

type ActivityDetailsProps = {
  data: RecordType[],
  isSecondaryActivity?: boolean,
  setRecord: (value: RecordType) => void,
  removeRecord: (value: RecordType) => void,
}

const ActivityDetails: React.FC<ActivityDetailsProps> = (props) => {
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
    <List bordered>
      <VirtualList
        data={props.data}
        height={400}
        itemHeight={47}
        itemKey="title"
      >
        {(item: RecordType) => (
          <List.Item
            onClick={() => props.setRecord(item)} key={item.title}
            style={{ textAlign: 'center', cursor: 'pointer' }}
          >
            <List.Item.Meta
              title={item.title}
            />
            { props.isSecondaryActivity &&
              (<Button type="primary"  onClick={() => props.removeRecord(item)} key={item.title} danger shape="circle" size={"small"} icon={<CloseOutlined />} />)
            }
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

export default ActivityDetails